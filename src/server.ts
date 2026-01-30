/**
 * SpinLove ChatGPT App - MCP Server (Basic Version)
 * A romantic date night slot machine for couples
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
import { randomUUID } from "crypto";
import express, { Request, Response } from "express";
import cors from "cors";
import { categories, Item, SubItem, getRandomItem, getSmartRandomItem, t, Language } from "./data/categories.js";
import { getTranslations } from "./i18n.js";

// ========================================
// MCP SERVER SETUP
// ========================================

const mcpServer = new McpServer({
  name: "spinlove",
  version: "1.0.0",
});

// In-Memory Session Storage for Smart Random
const sessionHistory: Map<string, Item[][]> = new Map();

// In-Memory Storage for detected language per session
const sessionLanguages: Map<string, Language> = new Map();

// Supported languages
const SUPPORTED_LANGUAGES: Language[] = ['en', 'de', 'es', 'fr', 'it'];

/**
 * Parse Accept-Language header and return best matching supported language
 */
function parseAcceptLanguage(header: string | undefined): Language {
  if (!header) return 'en';
  
  const languages = header.split(',')
    .map(lang => {
      const [code, qValue] = lang.trim().split(';q=');
      return {
        code: code.split('-')[0].toLowerCase(),
        quality: qValue ? parseFloat(qValue) : 1.0
      };
    })
    .sort((a, b) => b.quality - a.quality);
  
  for (const lang of languages) {
    if (SUPPORTED_LANGUAGES.includes(lang.code as Language)) {
      return lang.code as Language;
    }
  }
  
  return 'en';
}

/**
 * Get language for a session
 */
function getSessionLanguage(sessionId: string, explicitLang?: string): Language {
  if (explicitLang && SUPPORTED_LANGUAGES.includes(explicitLang as Language)) {
    return explicitLang as Language;
  }
  
  if (sessionLanguages.has(sessionId)) {
    return sessionLanguages.get(sessionId)!;
  }
  
  return 'en';
}

// ========================================
// TOOLS
// ========================================

/**
 * Tool: spin_date_night
 */
mcpServer.tool(
  "spin_date_night",
  "Spins the SpinLove slot machine and generates a complete date program for couples with 4 categories.",
  {
    sessionId: z.string().optional().describe("Session ID for Smart Random"),
    language: z.enum(["auto", "en", "de", "es", "fr", "it"]).optional().default("auto").describe("Language")
  },
  async (args) => {
    const sessionId = args.sessionId || randomUUID();
    const requestedLang = args.language === 'auto' ? undefined : args.language;
    const lang: Language = getSessionLanguage(sessionId, requestedLang);
    const i18n = getTranslations(lang);
    
    if (!sessionHistory.has(sessionId)) {
      sessionHistory.set(sessionId, []);
    }
    const history = sessionHistory.get(sessionId)!;
    
    const results: Item[] = categories.map((category, index) => {
      return getSmartRandomItem(category.items, history, index);
    });
    
    history.unshift(results);
    if (history.length > 5) {
      history.pop();
    }
    
    let worldCuisine: SubItem | null = null;
    const foodResult = results[0];
    if (foodResult.special && foodResult.special.length > 0) {
      worldCuisine = getRandomItem(foodResult.special);
    }
    
    const responseData = {
      sessionId,
      language: lang,
      results: results.map((item, index) => ({
        category: {
          id: categories[index].id,
          name: t(categories[index].name, lang),
          emoji: categories[index].emoji,
          color: categories[index].color
        },
        item: {
          id: item.id,
          title: t(item.title, lang),
          description: t(item.description, lang),
          emotion: t(item.emotion, lang),
          hasSpecial: !!(item.special && item.special.length > 0)
        }
      })),
      worldCuisine: worldCuisine ? {
        title: t(worldCuisine.title, lang),
        description: t(worldCuisine.description, lang),
        sound: worldCuisine.sound ? t(worldCuisine.sound, lang) : null,
        mood: worldCuisine.mood ? t(worldCuisine.mood, lang) : null
      } : null,
      timestamp: new Date().toISOString(),
      i18n: {
        resultsTitle: i18n.resultsTitle,
        resultsSubtitle: i18n.resultsSubtitle
      }
    };
    
    return {
      content: [{ 
        type: "text" as const, 
        text: JSON.stringify(responseData, null, 2) 
      }]
    };
  }
);

/**
 * Tool: spin_category
 */
mcpServer.tool(
  "spin_category",
  "Spins only a single category of the SpinLove slot machine.",
  {
    category: z.enum(["food", "movie", "together", "intimacy"]).describe("Category to spin"),
    sessionId: z.string().optional().describe("Session ID"),
    language: z.enum(["auto", "en", "de", "es", "fr", "it"]).optional().default("auto").describe("Language")
  },
  async (args) => {
    const sessionId = args.sessionId || randomUUID();
    const requestedLang = args.language === 'auto' ? undefined : args.language;
    const lang: Language = getSessionLanguage(sessionId, requestedLang);
    
    const categoryIndex = categories.findIndex(c => c.id === args.category);
    
    if (categoryIndex === -1) {
      throw new Error(`Category '${args.category}' not found`);
    }
    
    const category = categories[categoryIndex];
    const item = getRandomItem(category.items);
    
    let worldCuisine: SubItem | null = null;
    if (item.special && item.special.length > 0) {
      worldCuisine = getRandomItem(item.special);
    }
    
    const responseData = {
      language: lang,
      category: {
        id: category.id,
        name: t(category.name, lang),
        emoji: category.emoji,
        color: category.color
      },
      item: {
        id: item.id,
        title: t(item.title, lang),
        description: t(item.description, lang),
        emotion: t(item.emotion, lang)
      },
      worldCuisine: worldCuisine ? {
        title: t(worldCuisine.title, lang),
        description: t(worldCuisine.description, lang),
        sound: worldCuisine.sound ? t(worldCuisine.sound, lang) : null,
        mood: worldCuisine.mood ? t(worldCuisine.mood, lang) : null
      } : null
    };
    
    return {
      content: [{ 
        type: "text" as const, 
        text: JSON.stringify(responseData, null, 2) 
      }]
    };
  }
);

/**
 * Tool: list_categories
 */
mcpServer.tool(
  "list_categories",
  "Shows all available SpinLove categories and their items.",
  {
    category: z.enum(["all", "food", "movie", "together", "intimacy"]).optional().describe("Filter for one category"),
    sessionId: z.string().optional().describe("Session ID"),
    language: z.enum(["auto", "en", "de", "es", "fr", "it"]).optional().default("auto").describe("Language")
  },
  async (args) => {
    const sessionId = args.sessionId || randomUUID();
    const requestedLang = args.language === 'auto' ? undefined : args.language;
    const lang: Language = getSessionLanguage(sessionId, requestedLang);
    const filter = args.category || "all";
    
    const filteredCategories = filter === "all" 
      ? categories 
      : categories.filter(c => c.id === filter);
    
    const responseData = {
      language: lang,
      categories: filteredCategories.map(cat => ({
        id: cat.id,
        name: t(cat.name, lang),
        emoji: cat.emoji,
        color: cat.color,
        itemCount: cat.items.length,
        items: cat.items.map(item => ({
          id: item.id,
          title: t(item.title, lang),
          description: t(item.description, lang),
          emotion: t(item.emotion, lang),
          hasSpecial: !!(item.special && item.special.length > 0)
        }))
      }))
    };
    
    return {
      content: [{ 
        type: "text" as const, 
        text: JSON.stringify(responseData, null, 2) 
      }]
    };
  }
);

// ========================================
// EXPRESS SERVER WITH MCP TRANSPORT
// ========================================

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static('public'));

// Session Management for Streamable HTTP
const sessions = new Map<string, StreamableHTTPServerTransport>();

app.all("/mcp", async (req: Request, res: Response) => {
  let sessionId = req.headers["x-session-id"] as string || req.query.sessionId as string;
  
  if (!sessionId) {
    sessionId = randomUUID();
  }
  
  // Detect and store language
  const acceptLanguage = req.headers["accept-language"] as string;
  if (!sessionLanguages.has(sessionId)) {
    const detectedLang = parseAcceptLanguage(acceptLanguage);
    sessionLanguages.set(sessionId, detectedLang);
    console.log(`🌍 Language detected for session ${sessionId}: ${detectedLang}`);
  }
  
  let transport = sessions.get(sessionId);
  
  if (!transport) {
    transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => sessionId,
    });
    
    await mcpServer.connect(transport);
    sessions.set(sessionId, transport);
    
    console.log(`🔗 New session created: ${sessionId}`);
  }
  
  try {
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error("MCP Request Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Health Check
app.get("/health", (req: Request, res: Response) => {
  const detectedLang = parseAcceptLanguage(req.headers["accept-language"] as string);
  res.json({ 
    status: "ok", 
    app: "SpinLove ChatGPT App",
    version: "1.0.0",
    languages: SUPPORTED_LANGUAGES,
    detectedLanguage: detectedLang,
    activeSessions: sessions.size
  });
});

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║   💕 SpinLove ChatGPT App - MCP Server               ║
║   🌍 Multilingual: EN / DE / ES / FR / IT            ║
║   Server running on: http://localhost:${PORT}            ║
╚═══════════════════════════════════════════════════════╝
  `);
});
