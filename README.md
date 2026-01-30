# 💕 SpinLove ChatGPT App (Multilingual EN/DE/ES/FR/IT)

A romantic date night slot machine for couples - now as a native ChatGPT App with full support for English, German, Spanish, French, and Italian!

Eine romantische Date-Night Slot Machine für Paare - jetzt als native ChatGPT App mit Unterstützung für 5 Sprachen!

---

## 🌍 Language Support / Sprachunterstützung

- **English (Default)**: All content available in English
- **Deutsch**: Alle Inhalte auf Deutsch verfügbar
- **Español**: Todo el contenido disponible en español
- **Français**: Tout le contenu disponible en français
- **Italiano**: Tutti i contenuti disponibili in italiano

### 🔄 Automatic Language Detection

The app **automatically detects** the user's preferred language:

1. **Browser Language**: The widget reads `navigator.language` and sets the UI accordingly
2. **Accept-Language Header**: The server parses the HTTP header for the best matching language
3. **Manual Override**: Users can always switch languages via the dropdown

**Example**: A user in Spain with browser set to Spanish will automatically see the app in Spanish!

---

## 🎯 Features

- **🎰 Spin Date Night**: Generates a complete 4-category date program
- **🍽️ Food & Dining**: 10 culinary date ideas
- **🎬 Film & Entertainment**: 10 movie night variations  
- **💞 Quality Time**: 10 intimate activities
- **🔥 Romance & Intimacy**: 10 sensual experiences
- **🌍 Around the World**: 15 international cuisines
- **🎲 Smart Random**: Prevents repetitions
- **🔄 Language Toggle**: Switch between 5 languages anytime

---

## 🚀 Quick Start

### 1. Installation

```bash
# Clone or download
cd spinlove-chatgpt-app

# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Local Testing

```bash
# In a second terminal - start MCP Inspector
npm run test
```

The MCP Inspector opens at `http://localhost:5173` showing all available tools.

### 3. Connect to ChatGPT (Development)

```bash
# Start ngrok for HTTPS tunnel
ngrok http 3000
```

Then in ChatGPT:
- Settings → Apps & Connectors → Advanced settings → **Enable Developer Mode**
- Settings → Connectors → Create
- Enter MCP Server URL: `https://<your-ngrok-subdomain>.ngrok.app/mcp`

---

## 🛠️ Available MCP Tools

### `spin_date_night`
Spins all 4 categories and generates a complete date program.

**Input:**
- `sessionId` (optional): Session ID for Smart Random
- `language` (optional): "en" (default), "de", "es", "fr", "it"

**Output:**
- 4 category results in selected language
- Optional: Around the World cuisine
- UI translations for widget

### `spin_category`
Spins only a single category.

**Input:**
- `category`: "food" | "movie" | "together" | "intimacy"
- `language` (optional): "en" (default), "de", "es", "fr", "it"

### `get_world_cuisine`
Selects a random international cuisine.

**Input:**
- `language` (optional): "en" (default), "de", "es", "fr", "it"

### `list_categories`
Shows all categories and items.

**Input:**
- `category` (optional): Filter for one category
- `language` (optional): "en" (default), "de", "es", "fr", "it"

---

## 💬 Usage Examples

**English:**
> "Spin the SpinLove slot machine for our date night!"
> "Give me a date idea for the Food category"

**Deutsch:**
> "Drehe die SpinLove Slot Machine mit language=de"
> "Gib mir eine Date-Idee für die Essen-Kategorie"

**Español:**
> "¡Gira la máquina SpinLove con language=es!"
> "Dame una idea de cita para la categoría de Comida"

**Français:**
> "Fais tourner la machine SpinLove avec language=fr !"
> "Donne-moi une idée de rendez-vous pour la catégorie Cuisine"

**Italiano:**
> "Gira la slot machine SpinLove con language=it!"
> "Dammi un'idea per un appuntamento nella categoria Cucina"

---

## 📦 Deployment

### Option A: Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Option B: Fly.io

```bash
fly launch
fly deploy
```

### Option C: Docker

```bash
docker build -t spinlove-chatgpt-app .
docker run -p 3000:3000 spinlove-chatgpt-app
```

---

## 📁 Project Structure

```
spinlove-chatgpt-app/
├── src/
│   ├── server.ts          # MCP Server (multilingual)
│   ├── widget.ts          # ChatGPT UI Widget with language toggle
│   ├── i18n.ts            # UI translations (EN/DE/ES/FR/IT)
│   └── data/
│       └── categories.ts  # All categories & items (5 languages)
├── package.json
├── tsconfig.json
├── Dockerfile
├── fly.toml
└── vercel.json
```

---

## 🎨 UI Widget Features

- **Language Toggle**: Dropdown to switch between 5 languages
- **Glasmorphism Design**: Modern translucent styling
- **Neon Color Accents**: Category-specific colors
- **Responsive Grid**: 2x2 on desktop, 1x1 on mobile
- **Around the World Section**: Special highlight for international cuisines
- **Interactive Buttons**: New Spin, Share

---

## 🔐 For Production

### App Directory Submission Checklist

- [ ] HTTPS with TLS 1.2+
- [ ] `/mcp` endpoint responsive with streaming
- [ ] Tool annotations correctly set
- [ ] Privacy Policy published
- [ ] No restricted data collected
- [ ] Content suitable for 18+ (due to intimacy category)
- [ ] All 5 languages tested

---

## 📄 License

MIT License - Have fun using it! 💕

---

Developed with ❤️ for unforgettable evenings together.

Entwickelt mit ❤️ für unvergessliche Abende zu zweit.

Desarrollado con ❤️ para veladas inolvidables juntos.

Développé avec ❤️ pour des soirées inoubliables à deux.

Sviluppato con ❤️ per serate indimenticabili insieme.
