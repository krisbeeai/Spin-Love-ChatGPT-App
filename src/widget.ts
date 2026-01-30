/**
 * SpinLove UI Widget for ChatGPT - Multilingual (EN/DE/ES/FR/IT)
 * 
 * Displays date night results with language toggle
 */

export function getWidgetHtml(): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SpinLove</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: transparent;
      color: white;
      padding: 16px;
    }
    
    .container {
      max-width: 800px;
      margin: 0 auto;
    }
    
    /* Language Toggle */
    .lang-toggle {
      position: absolute;
      top: 12px;
      right: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.1);
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
    }
    
    .lang-toggle label {
      color: #9ca3af;
    }
    
    .lang-toggle select {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
      padding: 4px 8px;
      border-radius: 8px;
      font-size: 12px;
      cursor: pointer;
    }
    
    .lang-toggle select:focus {
      outline: none;
      border-color: #FF006E;
    }
    
    /* Header */
    .header {
      text-align: center;
      margin-bottom: 24px;
      margin-top: 32px;
    }
    
    .header h1 {
      font-size: 28px;
      font-weight: 700;
      background: linear-gradient(135deg, #FF006E, #9D4EDD, #DC0073);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 8px;
    }
    
    .header p {
      color: #9ca3af;
      font-size: 14px;
    }
    
    /* Results Grid */
    .results-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      margin-bottom: 24px;
    }
    
    @media (max-width: 600px) {
      .results-grid {
        grid-template-columns: 1fr;
      }
    }
    
    /* Result Card */
    .result-card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      padding: 20px;
      position: relative;
      overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .result-card:hover {
      transform: translateY(-4px);
    }
    
    .card-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }
    
    .card-emoji {
      font-size: 32px;
    }
    
    .card-category {
      font-size: 14px;
      font-weight: 600;
    }
    
    .card-title {
      font-size: 18px;
      font-weight: 700;
      color: white;
      margin-bottom: 8px;
      line-height: 1.3;
    }
    
    .card-description {
      font-size: 14px;
      color: #d1d5db;
      line-height: 1.5;
      margin-bottom: 12px;
    }
    
    .card-emotion {
      display: inline-block;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }
    
    .world-indicator {
      position: absolute;
      top: 16px;
      right: 16px;
      font-size: 24px;
      animation: bounce 1s infinite;
    }
    
    .special-hint {
      font-size: 12px;
      color: #9ca3af;
      margin-top: 8px;
      font-style: italic;
    }
    
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }
    
    /* World Cuisine Section */
    .world-section {
      background: linear-gradient(135deg, rgba(255, 149, 0, 0.1), rgba(255, 149, 0, 0.05));
      border: 2px solid rgba(255, 149, 0, 0.4);
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 24px;
      text-align: center;
    }
    
    .world-section h2 {
      font-size: 20px;
      color: #FF9500;
      margin-bottom: 8px;
    }
    
    .world-section .world-emoji {
      font-size: 48px;
      margin-bottom: 12px;
    }
    
    .world-section .world-title {
      font-size: 22px;
      font-weight: 700;
      color: white;
      margin-bottom: 8px;
    }
    
    .world-section .world-description {
      color: #d1d5db;
      margin-bottom: 12px;
    }
    
    .world-section .world-sound,
    .world-section .world-mood {
      font-size: 14px;
      color: #9ca3af;
      margin-bottom: 8px;
    }
    
    .world-section .world-mood {
      font-style: italic;
      color: #FF9500;
    }
    
    /* Actions */
    .actions {
      display: flex;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    
    .btn {
      padding: 12px 24px;
      border-radius: 30px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      border: none;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #FF006E, #DC0073);
      color: white;
    }
    
    .btn-primary:hover {
      transform: scale(1.05);
      box-shadow: 0 0 30px rgba(255, 0, 110, 0.5);
    }
    
    .btn-secondary {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    
    /* Loading State */
    .loading {
      text-align: center;
      padding: 40px;
    }
    
    .spinner {
      width: 48px;
      height: 48px;
      border: 4px solid rgba(255, 0, 110, 0.2);
      border-top-color: #FF006E;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 16px;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    /* Empty State */
    .empty-state {
      text-align: center;
      padding: 40px;
      color: #9ca3af;
    }
    
    .empty-state .emoji {
      font-size: 64px;
      margin-bottom: 16px;
    }
  </style>
</head>
<body>
  <div class="container" id="app">
    <div class="loading" id="loading">
      <div class="spinner"></div>
      <p id="loading-text">Loading...</p>
    </div>
  </div>

  <script>
    // Default translations (English)
    const defaultI18n = {
      resultsTitle: 'Your Perfect Evening!',
      resultsSubtitle: "Here's your personalized date program",
      worldTitle: 'Around the World',
      newSpinButton: '🔄 New Spin',
      shareButton: '📤 Share',
      letsGoButton: "Let's Go! 🚀",
      worldClickHint: '👆 Click here for your destination!',
      sharePrompt: 'Create a nice summary of our date program that I can share.',
      languageLabel: 'Language',
      languageEN: 'English',
      languageDE: 'Deutsch',
      languageES: 'Español',
      languageFR: 'Français',
      languageIT: 'Italiano',
      loading: 'Loading...',
      noResults: 'No results available. Please start a new spin!'
    };
    
    // Supported languages
    const supportedLanguages = ['en', 'de', 'es', 'fr', 'it'];
    
    // Auto-detect browser/system language
    function detectBrowserLanguage() {
      // Get browser language (e.g., 'de-DE', 'en-US', 'es', 'fr-FR', 'it-IT')
      const browserLang = navigator.language || navigator.userLanguage || 'en';
      
      // Extract primary language code (e.g., 'de' from 'de-DE')
      const primaryLang = browserLang.split('-')[0].toLowerCase();
      
      // Check if supported, otherwise fallback to English
      if (supportedLanguages.includes(primaryLang)) {
        return primaryLang;
      }
      
      // Fallback to English
      return 'en';
    }
    
    // Get data from ChatGPT
    const toolOutput = window.openai?.toolOutput;
    
    // Priority: 1. Server-specified language, 2. Browser language, 3. English
    let currentLang = toolOutput?.language || detectBrowserLanguage();
    let i18n = toolOutput?.i18n || defaultI18n;
    
    function render() {
      const app = document.getElementById('app');
      
      if (!toolOutput || !toolOutput.results) {
        app.innerHTML = \`
          <div class="empty-state">
            <div class="emoji">🎰</div>
            <h2>SpinLove</h2>
            <p>\${i18n.noResults || defaultI18n.noResults}</p>
          </div>
        \`;
        return;
      }
      
      const { results, worldCuisine, sessionId } = toolOutput;
      
      let html = \`
        <!-- Language Toggle -->
        <div class="lang-toggle">
          <label>\${i18n.languageLabel || 'Language'}:</label>
          <select id="lang-select" onchange="changeLanguage(this.value)">
            <option value="en" \${currentLang === 'en' ? 'selected' : ''}>\${i18n.languageEN || 'English'}</option>
            <option value="de" \${currentLang === 'de' ? 'selected' : ''}>\${i18n.languageDE || 'Deutsch'}</option>
            <option value="es" \${currentLang === 'es' ? 'selected' : ''}>\${i18n.languageES || 'Español'}</option>
            <option value="fr" \${currentLang === 'fr' ? 'selected' : ''}>\${i18n.languageFR || 'Français'}</option>
            <option value="it" \${currentLang === 'it' ? 'selected' : ''}>\${i18n.languageIT || 'Italiano'}</option>
          </select>
        </div>
        
        <div class="header">
          <h1>💕 \${i18n.resultsTitle}</h1>
          <p>\${i18n.resultsSubtitle}</p>
        </div>
      \`;
      
      // World Cuisine Section (if applicable)
      if (worldCuisine) {
        html += \`
          <div class="world-section">
            <div class="world-emoji">🌍</div>
            <h2>\${i18n.worldTitle}</h2>
            <div class="world-title">\${worldCuisine.title}</div>
            <div class="world-description">\${worldCuisine.description}</div>
            \${worldCuisine.sound ? \`<div class="world-sound">\${worldCuisine.sound}</div>\` : ''}
            \${worldCuisine.mood ? \`<div class="world-mood">💬 "\${worldCuisine.mood}"</div>\` : ''}
          </div>
        \`;
      }
      
      // Results Grid
      html += '<div class="results-grid">';
      
      results.forEach((result) => {
        const { category, item } = result;
        
        html += \`
          <div class="result-card" style="border: 2px solid \${category.color}60;">
            <div style="position: absolute; inset: 0; background: linear-gradient(135deg, \${category.color}20, transparent); pointer-events: none;"></div>
            \${item.hasSpecial ? '<div class="world-indicator">🌍</div>' : ''}
            <div class="card-header">
              <span class="card-emoji">\${category.emoji}</span>
              <span class="card-category" style="color: \${category.color};">\${category.name}</span>
            </div>
            <div class="card-title">\${item.title}</div>
            <div class="card-description">\${item.description}</div>
            <div class="card-emotion" style="background: \${category.color}30; color: \${category.color}; border: 1px solid \${category.color}60;">
              💞 \${item.emotion}
            </div>
            \${item.hasSpecial ? \`<div class="special-hint">\${i18n.worldClickHint}</div>\` : ''}
          </div>
        \`;
      });
      
      html += '</div>';
      
      // Actions
      html += \`
        <div class="actions">
          <button class="btn btn-primary" onclick="newSpin()">
            \${i18n.newSpinButton}
          </button>
          <button class="btn btn-secondary" onclick="shareDate()">
            \${i18n.shareButton}
          </button>
        </div>
      \`;
      
      app.innerHTML = html;
    }
    
    // Change language and trigger new spin
    async function changeLanguage(lang) {
      currentLang = lang;
      if (window.openai?.callTool) {
        await window.openai.callTool('spin_date_night', { 
          language: lang,
          sessionId: toolOutput?.sessionId 
        });
      }
    }
    
    // New spin with current language
    async function newSpin() {
      if (window.openai?.callTool) {
        await window.openai.callTool('spin_date_night', { 
          language: currentLang 
        });
      }
    }
    
    // Share date program
    async function shareDate() {
      if (window.openai?.sendFollowUpMessage) {
        await window.openai.sendFollowUpMessage({
          prompt: i18n.sharePrompt || defaultI18n.sharePrompt
        });
      }
    }
    
    // Initialize
    render();
    
    // Listen for updates
    window.addEventListener('openai:set_globals', (event) => {
      if (event.detail.globals.toolOutput) {
        const newOutput = event.detail.globals.toolOutput;
        currentLang = newOutput.language || 'en';
        i18n = newOutput.i18n || defaultI18n;
        render();
      }
    });
  </script>
</body>
</html>
`;
}
