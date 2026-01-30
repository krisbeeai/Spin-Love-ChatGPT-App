# 🚀 SpinLove Quickstart Guide

## 📱 Option 1: Demo im Browser (Sofort testen)

**Keine Installation nötig!**

1. Öffne `demo.html` im Browser (Doppelklick oder Drag & Drop)
2. Klicke auf **"🎰 Neuer Spin"**
3. Fertig! Teste alle Features:
   - 🌍 "Mit Around the World" – zeigt internationale Küchen
   - 🌐 "Sprache wechseln" – rotiert durch alle 5 Sprachen
   - Dropdown oben rechts – direkte Sprachauswahl

**Auto-Detect:** Die App erkennt automatisch deine Browser-Sprache!

---

## 💻 Option 2: In Cursor/VS Code entwickeln

### Schritt 1: Projekt öffnen
```bash
# In Cursor/VS Code
File → Open Folder → spinlove-chatgpt-app-i18n
```

### Schritt 2: Dependencies installieren
```bash
npm install
```

### Schritt 3: Server starten
```bash
npm run dev
```

### Schritt 4: Testen
- **Health Check:** http://localhost:3000/health
- **MCP Inspector:** `npm run test` (öffnet http://localhost:5173)

---

## 🤖 Option 3: Mit ChatGPT verbinden

### Voraussetzungen
- ChatGPT Plus Account
- ngrok installiert (`npm install -g ngrok` oder https://ngrok.com)

### Schritt 1: Server starten
```bash
npm run dev
```

### Schritt 2: HTTPS-Tunnel erstellen
```bash
ngrok http 3000
```

Du erhältst eine URL wie: `https://abc123.ngrok.app`

### Schritt 3: In ChatGPT konfigurieren
1. Öffne ChatGPT → **Settings** (Einstellungen)
2. **Apps & Connectors** → **Advanced settings**
3. ✅ **Enable Developer Mode** aktivieren
4. **Connectors** → **Create**
5. MCP Server URL eingeben: `https://abc123.ngrok.app/mcp`
6. Speichern

### Schritt 4: Testen in ChatGPT
Schreibe:
> "Drehe die SpinLove Slot Machine für unseren Date-Abend!"

Oder auf Englisch:
> "Spin the SpinLove slot machine for our date night!"

---

## 🌍 Unterstützte Sprachen

| Code | Sprache | Beispiel-Prompt |
|------|---------|-----------------|
| `en` | English | "Spin the date night machine!" |
| `de` | Deutsch | "Drehe die Date-Night Maschine!" |
| `es` | Español | "¡Gira la máquina SpinLove!" |
| `fr` | Français | "Fais tourner la machine SpinLove !" |
| `it` | Italiano | "Gira la slot machine SpinLove!" |

**Auto-Detect:** Ohne `language` Parameter wird automatisch die Browser-Sprache verwendet!

---

## 🛠️ Verfügbare Tools

### 1. `spin_date_night`
Generiert ein komplettes 4-Kategorien Date-Programm.

```json
{
  "sessionId": "optional-session-id",
  "language": "auto"  // oder: en, de, es, fr, it
}
```

### 2. `spin_category`
Dreht nur eine einzelne Kategorie.

```json
{
  "category": "food",  // oder: movie, together, intimacy
  "language": "auto"
}
```

### 3. `get_world_cuisine`
Wählt eine zufällige internationale Küche.

```json
{
  "language": "auto"
}
```

### 4. `list_categories`
Zeigt alle Kategorien und Items.

```json
{
  "category": "all",  // oder: food, movie, together, intimacy
  "language": "auto"
}
```

---

## 📁 Projektstruktur

```
spinlove-chatgpt-app-i18n/
├── demo.html          ← 🎯 Browser-Demo (keine Installation)
├── src/
│   ├── server.ts      ← MCP Server mit Auto-Detect
│   ├── widget.ts      ← ChatGPT UI Widget
│   ├── i18n.ts        ← UI-Übersetzungen (5 Sprachen)
│   └── data/
│       └── categories.ts  ← Alle Date-Ideen (5 Sprachen)
├── package.json
├── README.md
├── QUICKSTART.md      ← Diese Datei
└── ...
```

---

## ❓ Troubleshooting

### "npm run dev" funktioniert nicht
```bash
# Node.js Version prüfen (mindestens v18)
node --version

# Dependencies neu installieren
rm -rf node_modules
npm install
```

### ngrok URL funktioniert nicht in ChatGPT
- Stelle sicher, dass der Server läuft (`npm run dev`)
- Prüfe die URL mit: `curl https://abc123.ngrok.app/health`
- ChatGPT braucht HTTPS – ngrok liefert das automatisch

### Sprache wird nicht erkannt
- Prüfe deine Browser-Sprache: `navigator.language`
- Der Server loggt die erkannte Sprache: `🌍 Language detected...`

---

## 🎉 Viel Spaß!

Bei Fragen oder Problemen: Erstelle ein Issue auf GitHub oder kontaktiere den Entwickler.

💕 Entwickelt für unvergessliche Abende zu zweit.
