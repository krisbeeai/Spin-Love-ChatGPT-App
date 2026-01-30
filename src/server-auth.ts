import express, { Request, Response } from "express";
import cors from "cors";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
import { randomUUID } from "crypto";
import 'dotenv/config';

// Internal imports
import { categories, getCategoryItems, getWorldCuisine, t, Language } from "./data/categories.js";
import { getTranslations } from "./i18n.js";
import { getWidgetHtml } from "./widget-auth.js";
import {
  createUser,
  getUserByEmail,
  getUserById,
  generateMagicLinkToken,
  verifyMagicLinkToken,
  getFreeSpinsUsed,
  incrementFreeSpins,
  saveSpinResult,
  getSpinHistory,
  User
} from "./supabase.js";
import { getMagicLinkEmail } from "./email-templates.js";

// Constants
const FREE_SPINS_LIMIT = 3;
const COOKIE_MAX_AGE_DAYS = 30;
const APP_URL = process.env.APP_URL || 'http://localhost:8000';

// Smart Random Algorithm - prevents repetition
const recentSelections: Map<string, string[]> = new Map();
const MAX_RECENT = 5;

function getSmartRandom<T extends { title: string }>(items: T[], categoryKey: string): T {
  const recent = recentSelections.get(categoryKey) || [];
  const available = items.filter(item => !recent.includes(item.title));
  const pool = available.length > 0 ? available : items;
  const selected = pool[Math.floor(Math.random() * pool.length)];
  
  const updatedRecent = [selected.title, ...recent].slice(0, MAX_RECENT);
  recentSelections.set(categoryKey, updatedRecent);
  
  return selected;
}

// Initialize Express
const app = express();
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// Serve static files (privacy policy, etc.)
app.use(express.static('public'));

// Initialize MCP Server
const mcpServer = new McpServer({
  name: "spinlove-date-night",
  version: "2.0.0"
});

// ============================================
// MCP TOOLS
// ============================================

// Tool: Spin Date Night (main tool)
mcpServer.tool(
  "spin_date_night",
  "Spin the date night slot machine! Returns romantic activity suggestions across 4 categories.",
  {
    includeWorld: z.boolean().optional().describe("Include 'Around the World' cuisine bonus"),
    language: z.string().optional().describe("Language code (en, de, es, fr, it)"),
    sessionId: z.string().optional().describe("Session ID for tracking free spins"),
    userId: z.string().optional().describe("User ID for logged-in users")
  },
  async (args) => {
    const lang = (args.language || 'en') as Language;
    
    // Check if user is logged in
    let user: User | null = null;
    let freeSpinsRemaining = FREE_SPINS_LIMIT;
    
    if (args.userId) {
      user = await getUserById(args.userId);
      if (user && user.status !== 'active') {
        return {
          content: [{ 
            type: "text" as const, 
            text: JSON.stringify({ error: "Account deactivated" }) 
          }]
        };
      }
    } else if (args.sessionId) {
      // Check free spins for non-logged-in users
      const spinsUsed = await getFreeSpinsUsed(args.sessionId);
      freeSpinsRemaining = FREE_SPINS_LIMIT - spinsUsed;
      
      if (freeSpinsRemaining <= 0) {
        return {
          content: [{
            type: "resource" as const,
            resource: {
              uri: "ui://widget/spinlove.html",
              mimeType: "text/html",
              text: getWidgetHtml(null, lang, null, undefined, 0, true)
            }
          }]
        };
      }
      
      // Increment free spins counter
      await incrementFreeSpins(args.sessionId);
      freeSpinsRemaining--;
    }
    
    // Generate spin results
    const foodItems = getCategoryItems('food', lang);
    const movieItems = getCategoryItems('movie', lang);
    const togetherItems = getCategoryItems('together', lang);
    const intimacyItems = getCategoryItems('intimacy', lang);
    
    const results = {
      food: getSmartRandom(foodItems, `food-${lang}`),
      movie: getSmartRandom(movieItems, `movie-${lang}`),
      together: getSmartRandom(togetherItems, `together-${lang}`),
      intimacy: getSmartRandom(intimacyItems, `intimacy-${lang}`),
      worldCuisine: null as ReturnType<typeof getWorldCuisine> | null
    };
    
    // Add world cuisine if requested or if "Around the World" was selected
    if (args.includeWorld || results.food.title.toLowerCase().includes('world') || results.food.title.toLowerCase().includes('welt')) {
      results.worldCuisine = getWorldCuisine(lang);
    }
    
    // Save to history if user is logged in
    let history: any[] = [];
    if (user) {
      await saveSpinResult(user.id, results, lang);
      history = await getSpinHistory(user.id, 10);
    }
    
    // Return widget with results
    return {
      content: [{
        type: "resource" as const,
        resource: {
          uri: "ui://widget/spinlove.html",
          mimeType: "text/html",
          text: getWidgetHtml(
            results as any,
            lang,
            user ? { firstName: user.first_name, email: user.email, language: user.language } : null,
            history,
            user ? undefined : freeSpinsRemaining
          )
        }
      }]
    };
  }
);

// Tool: Register User
mcpServer.tool(
  "register_user",
  "Register a new user with email for unlimited spins. Sends a magic link for verification.",
  {
    firstName: z.string().min(1).describe("User's first name"),
    email: z.string().email().describe("User's email address"),
    language: z.string().optional().describe("Language code (en, de, es, fr, it)"),
    country: z.string().optional().describe("Country code (DE, US, etc.)"),
    consent: z.boolean().describe("User has accepted privacy policy and marketing consent")
  },
  async (args) => {
    const lang = (args.language || 'en') as Language;
    
    // Check consent
    if (!args.consent) {
      return {
        content: [{
          type: "resource" as const,
          resource: {
            uri: "ui://widget/spinlove.html",
            mimeType: "text/html",
            text: getWidgetHtml(null, lang, null, undefined, 0, true, false, "Consent required")
          }
        }]
      };
    }
    
    // Check if user already exists
    let user = await getUserByEmail(args.email);
    const isNewUser = !user;
    
    if (!user) {
      // Create new user
      user = await createUser({
        email: args.email,
        first_name: args.firstName,
        language: args.language || 'en',
        country: args.country || 'DE'
      });
      
      if (!user) {
        return {
          content: [{
            type: "resource" as const,
            resource: {
              uri: "ui://widget/spinlove.html",
              mimeType: "text/html",
              text: getWidgetHtml(null, lang, null, undefined, 0, true, false, "Registration failed")
            }
          }]
        };
      }
    } else if (user.status === 'revoked') {
      return {
        content: [{
          type: "resource" as const,
          resource: {
            uri: "ui://widget/spinlove.html",
            mimeType: "text/html",
            text: getWidgetHtml(null, lang, null, undefined, 0, true, false, "Account deactivated")
          }
        }]
      };
    }
    
    // Generate magic link token
    const token = await generateMagicLinkToken(user.id);
    if (!token) {
      return {
        content: [{
          type: "resource" as const,
          resource: {
            uri: "ui://widget/spinlove.html",
            mimeType: "text/html",
            text: getWidgetHtml(null, lang, null, undefined, 0, true, false, "Could not generate magic link")
          }
        }]
      };
    }
    
    const magicLink = `${APP_URL}/verify?token=${token}`;
    
    // Get email template
    const emailTemplate = getMagicLinkEmail(user.first_name, magicLink, user.language, isNewUser);
    
    // Log for now (integrate with email service later)
    console.log('=== MAGIC LINK EMAIL ===');
    console.log('To:', user.email);
    console.log('Subject:', emailTemplate.subject);
    console.log('Link:', magicLink);
    console.log('========================');
    
    // Return success widget
    return {
      content: [{
        type: "resource" as const,
        resource: {
          uri: "ui://widget/spinlove.html",
          mimeType: "text/html",
          text: getWidgetHtml(null, lang, null, undefined, undefined, false, true)
        }
      }]
    };
  }
);

// Tool: Get Spin History
mcpServer.tool(
  "get_spin_history",
  "Get the user's date night spin history",
  {
    userId: z.string().describe("User ID"),
    limit: z.number().optional().describe("Number of results to return (default: 10)")
  },
  async (args) => {
    const user = await getUserById(args.userId);
    if (!user || user.status !== 'active') {
      return {
        content: [{ type: "text" as const, text: JSON.stringify({ error: "User not found or inactive" }) }]
      };
    }
    
    const history = await getSpinHistory(user.id, args.limit || 10);
    const lang = (user.language || 'en') as Language;
    
    return {
      content: [{
        type: "resource" as const,
        resource: {
          uri: "ui://widget/spinlove-history.html",
          mimeType: "text/html",
          text: getWidgetHtml(
            null,
            lang,
            { firstName: user.first_name, email: user.email, language: user.language },
            history
          )
        }
      }]
    };
  }
);

// Tool: List Categories
mcpServer.tool(
  "list_categories",
  "List all available date night categories",
  {
    language: z.string().optional().describe("Language code (en, de, es, fr, it)")
  },
  async (args) => {
    const lang = (args.language || 'en') as Language;
    const categoryList = categories.map(cat => ({
      id: cat.id,
      name: t(cat.name, lang),
      emoji: cat.emoji,
      itemCount: cat.items.length
    }));
    
    return {
      content: [{ type: "text" as const, text: JSON.stringify(categoryList, null, 2) }]
    };
  }
);

// ============================================
// HTTP ENDPOINTS
// ============================================

// Magic Link Verification
app.get('/verify', async (req: Request, res: Response) => {
  const token = req.query.token as string;
  
  if (!token) {
    res.status(400).send('Missing token');
    return;
  }
  
  const user = await verifyMagicLinkToken(token);
  
  if (!user) {
    res.status(400).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Link expired</title>
        <style>
          body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #1a1a2e; color: white; }
          .card { text-align: center; padding: 40px; background: rgba(255,255,255,0.1); border-radius: 20px; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>😕 Link expired</h1>
          <p>This magic link has expired or was already used.</p>
          <p>Please request a new one in the app.</p>
        </div>
      </body>
      </html>
    `);
    return;
  }
  
  // Set cookie for 30 days
  const cookieMaxAge = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
  res.cookie('spinlove_user', user.id, {
    maxAge: cookieMaxAge,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
  
  // Redirect to success page
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Welcome to SpinLove!</title>
      <style>
        body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: white; margin: 0; }
        .card { text-align: center; padding: 50px; background: rgba(255,255,255,0.1); backdrop-filter: blur(20px); border-radius: 20px; max-width: 400px; }
        h1 { font-size: 48px; margin-bottom: 20px; }
        h2 { font-size: 24px; margin-bottom: 15px; }
        p { color: rgba(255,255,255,0.8); line-height: 1.6; }
        .highlight { color: #e91e63; font-weight: 600; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🎰💕</h1>
        <h2>Welcome, ${user.first_name}!</h2>
        <p>Your access is now <span class="highlight">activated</span>!</p>
        <p>You can close this window and continue in ChatGPT.</p>
        <p style="margin-top: 30px; font-size: 14px; opacity: 0.7;">Enjoy unlimited date night spins! 🎲</p>
      </div>
    </body>
    </html>
  `);
});

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', version: '2.0.0' });
});

// ============================================
// MCP TRANSPORT
// ============================================

app.all('/mcp', async (req: Request, res: Response) => {
  const sessionId = req.headers['mcp-session-id'] as string || randomUUID();
  
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => sessionId,
    onsessioninitialized: (id: string) => {
      console.log(`MCP Session initialized: ${id}`);
    }
  });

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('mcp-session-id', sessionId);

  await transport.handleRequest(req, res, req.body);
  
  res.on('close', () => {
    transport.close();
  });

  await mcpServer.connect(transport);
});

// ============================================
// START SERVER
// ============================================

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`
  🎰💕 SpinLove Server v2.0.0
  ━━━━━━━━━━━━━━━━━━━━━━━━━
  
  Server running on port ${PORT}
  MCP endpoint: http://localhost:${PORT}/mcp
  
  Features:
  ✅ ${FREE_SPINS_LIMIT} free spins for new users
  ✅ Email registration with Magic Link
  ✅ Spin history for registered users
  ✅ Multi-language support (EN, DE, ES, FR, IT)
  ✅ GDPR compliant
  
  Ready to spin! 🎲
  `);
});
