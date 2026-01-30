/**
 * SpinLove UI Widget - SLOT MACHINE EDITION
 * 
 * Features:
 * - Real spinning slot reels with CSS animation
 * - Sequential stopping (Category 1 → 2 → 3 → 4)
 * - Suspenseful reveal with delays
 * - Sound effects (optional)
 * - Full i18n support (EN/DE/ES/FR/IT)
 */

export function getWidgetHtml(): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SpinLove Slot Machine</title>
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
      max-width: 900px;
      margin: 0 auto;
    }
    
    /* ========================================
       LANGUAGE TOGGLE
       ======================================== */
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
      z-index: 100;
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
    
    /* ========================================
       HEADER
       ======================================== */
    .header {
      text-align: center;
      margin-bottom: 24px;
      margin-top: 32px;
    }
    
    .header h1 {
      font-size: 32px;
      font-weight: 800;
      background: linear-gradient(135deg, #FF006E, #9D4EDD, #DC0073);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 8px;
      text-shadow: 0 0 40px rgba(255, 0, 110, 0.3);
    }
    
    .header p {
      color: #9ca3af;
      font-size: 14px;
    }
    
    /* ========================================
       SLOT MACHINE FRAME
       ======================================== */
    .slot-machine {
      background: linear-gradient(145deg, #1a1a2e, #16213e);
      border: 4px solid #FF006E;
      border-radius: 24px;
      padding: 24px;
      box-shadow: 
        0 0 60px rgba(255, 0, 110, 0.3),
        inset 0 0 30px rgba(0, 0, 0, 0.5);
      position: relative;
      overflow: hidden;
    }
    
    .slot-machine::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255, 0, 110, 0.1) 0%, transparent 50%);
      animation: glow-rotate 10s linear infinite;
      pointer-events: none;
    }
    
    @keyframes glow-rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    /* ========================================
       SLOT REELS CONTAINER
       ======================================== */
    .reels-container {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 24px;
    }
    
    @media (max-width: 700px) {
      .reels-container {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 400px) {
      .reels-container {
        grid-template-columns: 1fr;
      }
    }
    
    /* ========================================
       SINGLE SLOT REEL
       ======================================== */
    .slot-reel {
      background: rgba(0, 0, 0, 0.4);
      border-radius: 16px;
      overflow: hidden;
      position: relative;
      min-height: 280px;
      border: 2px solid rgba(255, 255, 255, 0.1);
    }
    
    .slot-reel.spinning {
      border-color: rgba(255, 255, 255, 0.3);
    }
    
    .slot-reel.stopped {
      border-color: var(--reel-color, #FF006E);
      box-shadow: 0 0 20px var(--reel-color-alpha, rgba(255, 0, 110, 0.4));
    }
    
    /* Category Header */
    .reel-header {
      background: rgba(255, 255, 255, 0.05);
      padding: 12px;
      text-align: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .reel-header .emoji {
      font-size: 28px;
      display: block;
      margin-bottom: 4px;
    }
    
    .reel-header .category-name {
      font-size: 11px;
      font-weight: 600;
      color: var(--reel-color, #9ca3af);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    /* Reel Window (shows spinning items) */
    .reel-window {
      height: 180px;
      overflow: hidden;
      position: relative;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.8) 0%,
        transparent 20%,
        transparent 80%,
        rgba(0, 0, 0, 0.8) 100%
      );
    }
    
    /* Spinning Strip */
    .reel-strip {
      position: absolute;
      width: 100%;
      transition: transform 0.1s linear;
    }
    
    .reel-strip.spinning {
      animation: spin-reel 0.15s linear infinite;
    }
    
    .reel-strip.stopping {
      animation: none;
      transition: transform 1s cubic-bezier(0.17, 0.67, 0.12, 1);
    }
    
    @keyframes spin-reel {
      0% { transform: translateY(0); }
      100% { transform: translateY(-180px); }
    }
    
    /* Individual Item in Strip */
    .reel-item {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      text-align: center;
      font-size: 13px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.7);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    /* Result Display (after stopping) */
    .reel-result {
      display: none;
      padding: 16px;
      text-align: center;
      animation: result-appear 0.5s ease-out;
    }
    
    .slot-reel.stopped .reel-window {
      display: none;
    }
    
    .slot-reel.stopped .reel-result {
      display: block;
    }
    
    @keyframes result-appear {
      0% { 
        opacity: 0; 
        transform: scale(0.8) translateY(20px); 
      }
      50% { 
        transform: scale(1.05); 
      }
      100% { 
        opacity: 1; 
        transform: scale(1) translateY(0); 
      }
    }
    
    .result-title {
      font-size: 16px;
      font-weight: 700;
      color: white;
      margin-bottom: 8px;
      line-height: 1.3;
    }
    
    .result-description {
      font-size: 12px;
      color: #d1d5db;
      line-height: 1.4;
      margin-bottom: 10px;
    }
    
    .result-emotion {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 10px;
      font-weight: 600;
      background: var(--reel-color-alpha, rgba(255, 0, 110, 0.2));
      color: var(--reel-color, #FF006E);
      border: 1px solid var(--reel-color, #FF006E);
    }
    
    /* World Indicator */
    .world-badge {
      position: absolute;
      top: 8px;
      right: 8px;
      font-size: 20px;
      animation: bounce 1s infinite;
      z-index: 10;
    }
    
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }
    
    /* ========================================
       SPIN BUTTON
       ======================================== */
    .spin-button-container {
      text-align: center;
      margin-top: 20px;
    }
    
    .spin-button {
      background: linear-gradient(135deg, #FF006E, #DC0073);
      color: white;
      border: none;
      padding: 16px 48px;
      font-size: 18px;
      font-weight: 700;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 20px rgba(255, 0, 110, 0.4);
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    
    .spin-button:hover:not(:disabled) {
      transform: scale(1.05);
      box-shadow: 0 6px 30px rgba(255, 0, 110, 0.6);
    }
    
    .spin-button:active:not(:disabled) {
      transform: scale(0.98);
    }
    
    .spin-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .spin-button.spinning {
      animation: pulse-button 0.5s ease-in-out infinite;
    }
    
    @keyframes pulse-button {
      0%, 100% { box-shadow: 0 4px 20px rgba(255, 0, 110, 0.4); }
      50% { box-shadow: 0 4px 40px rgba(255, 0, 110, 0.8); }
    }
    
    /* ========================================
       WORLD CUISINE SECTION
       ======================================== */
    .world-section {
      background: linear-gradient(135deg, rgba(255, 149, 0, 0.15), rgba(255, 149, 0, 0.05));
      border: 2px solid rgba(255, 149, 0, 0.5);
      border-radius: 16px;
      padding: 24px;
      margin-top: 24px;
      text-align: center;
      animation: world-appear 0.8s ease-out;
      display: none;
    }
    
    .world-section.visible {
      display: block;
    }
    
    @keyframes world-appear {
      0% { 
        opacity: 0; 
        transform: translateY(30px) scale(0.9); 
      }
      100% { 
        opacity: 1; 
        transform: translateY(0) scale(1); 
      }
    }
    
    .world-section h2 {
      font-size: 18px;
      color: #FF9500;
      margin-bottom: 8px;
    }
    
    .world-section .world-emoji {
      font-size: 48px;
      margin-bottom: 12px;
      animation: spin-globe 3s linear infinite;
    }
    
    @keyframes spin-globe {
      0% { transform: rotateY(0deg); }
      100% { transform: rotateY(360deg); }
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
    
    .world-section .world-mood {
      font-style: italic;
      color: #FF9500;
    }
    

    
    /* ========================================
       STATUS TEXT
       ======================================== */
    .status-text {
      text-align: center;
      margin-top: 16px;
      font-size: 14px;
      color: #9ca3af;
      min-height: 24px;
    }
    
    .status-text.highlight {
      color: #FF006E;
      font-weight: 600;
      animation: pulse-text 0.5s ease-in-out;
    }
    
    @keyframes pulse-text {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    /* ========================================
       INITIAL STATE
       ======================================== */
    .initial-state {
      text-align: center;
      padding: 60px 20px;
    }
    
    .initial-state .big-emoji {
      font-size: 80px;
      margin-bottom: 20px;
      animation: float 3s ease-in-out infinite;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    
    .initial-state h2 {
      font-size: 24px;
      margin-bottom: 12px;
      background: linear-gradient(135deg, #FF006E, #9D4EDD);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .initial-state p {
      color: #9ca3af;
      margin-bottom: 24px;
    }
  </style>
</head>
<body>
  <div class="container" id="app">
    <!-- Initial loading state -->
    <div class="loading" id="loading" style="display: none;">
      <p>Loading...</p>
    </div>
  </div>

  <script>
    // ========================================
    // CONFIGURATION
    // ========================================
    
    const SPIN_DURATION = 2000;      // Total spin time before first stop
    const STOP_INTERVAL = 1200;      // Delay between each reel stopping
    const REEL_COLORS = {
      food: { color: '#FF9500', alpha: 'rgba(255, 149, 0, 0.3)' },
      movie: { color: '#AF52DE', alpha: 'rgba(175, 82, 222, 0.3)' },
      together: { color: '#FF2D55', alpha: 'rgba(255, 45, 85, 0.3)' },
      intimacy: { color: '#FF006E', alpha: 'rgba(255, 0, 110, 0.3)' }
    };
    
    // ========================================
    // I18N
    // ========================================
    
    const defaultI18n = {
      resultsTitle: '💕 SpinLove',
      resultsSubtitle: 'Your Date Night Slot Machine',
      worldTitle: '🌍 Around the World',
      newSpinButton: 'SPIN',
      spinningButton: 'SPINNING...',
      shareButton: '📤 Share',
      letsGoButton: "Let's Go! 🚀",
      worldClickHint: '👆 Click for destination!',
      sharePrompt: 'Create a nice summary of our date program that I can share.',
      languageLabel: 'Language',
      languageEN: 'English',
      languageDE: 'Deutsch',
      languageES: 'Español',
      languageFR: 'Français',
      languageIT: 'Italiano',
      loading: 'Loading...',
      noResults: 'Press SPIN to start!',
      statusReady: 'Ready to spin!',
      statusSpinning: '🎰 Spinning all reels...',
      statusStopping: '✨ Stopping reel',
      statusComplete: '💕 Your perfect evening awaits!'
    };
    
    const supportedLanguages = ['en', 'de', 'es', 'fr', 'it'];
    
    // Status messages per language
    const statusMessages = {
      en: {
        ready: 'Ready to spin!',
        spinning: '🎰 Spinning all reels...',
        stopping: '✨ Stopping',
        complete: '💕 Your perfect evening awaits!'
      },
      de: {
        ready: 'Bereit zum Drehen!',
        spinning: '🎰 Alle Walzen drehen sich...',
        stopping: '✨ Stoppe',
        complete: '💕 Euer perfekter Abend wartet!'
      },
      es: {
        ready: '¡Listo para girar!',
        spinning: '🎰 Girando todos los carretes...',
        stopping: '✨ Parando',
        complete: '💕 ¡Tu velada perfecta te espera!'
      },
      fr: {
        ready: 'Prêt à tourner !',
        spinning: '🎰 Tous les rouleaux tournent...',
        stopping: '✨ Arrêt de',
        complete: '💕 Votre soirée parfaite vous attend !'
      },
      it: {
        ready: 'Pronto a girare!',
        spinning: '🎰 Tutti i rulli girano...',
        stopping: '✨ Fermo',
        complete: '💕 La vostra serata perfetta vi aspetta!'
      }
    };
    
    // ========================================
    // STATE
    // ========================================
    
    let currentLang = 'en';
    let i18n = defaultI18n;
    let currentResults = null;
    let isSpinning = false;
    
    // ========================================
    // HELPER FUNCTIONS
    // ========================================
    
    function detectBrowserLanguage() {
      const browserLang = navigator.language || navigator.userLanguage || 'en';
      const primaryLang = browserLang.split('-')[0].toLowerCase();
      return supportedLanguages.includes(primaryLang) ? primaryLang : 'en';
    }
    
    function getStatusMessage(key) {
      return statusMessages[currentLang]?.[key] || statusMessages.en[key];
    }
    
    // Generate dummy items for spinning animation
    function generateSpinItems(category) {
      const dummyItems = {
        food: ['🍝 Pasta Night', '🍣 Sushi Date', '🧀 Fondue', '🥂 Champagne', '🍕 Pizza', '🌮 Tacos'],
        movie: ['🎬 Rom-Com', '🎭 Drama', '🎪 Comedy', '📺 Series', '🎥 Classic', '🍿 Thriller'],
        together: ['💆 Massage', '🎮 Gaming', '📖 Reading', '🎨 Painting', '🧩 Puzzles', '💃 Dancing'],
        intimacy: ['💕 Romance', '🕯️ Candles', '🌹 Roses', '💋 Kisses', '🔥 Passion', '✨ Magic']
      };
      return dummyItems[category.id] || dummyItems.food;
    }
    
    // ========================================
    // RENDER FUNCTIONS
    // ========================================
    
    function renderInitialState() {
      return \`
        <div class="lang-toggle">
          <label>\${i18n.languageLabel || 'Language'}:</label>
          <select id="lang-select" onchange="changeLanguage(this.value)">
            <option value="en" \${currentLang === 'en' ? 'selected' : ''}>English</option>
            <option value="de" \${currentLang === 'de' ? 'selected' : ''}>Deutsch</option>
            <option value="es" \${currentLang === 'es' ? 'selected' : ''}>Español</option>
            <option value="fr" \${currentLang === 'fr' ? 'selected' : ''}>Français</option>
            <option value="it" \${currentLang === 'it' ? 'selected' : ''}>Italiano</option>
          </select>
        </div>
        
        <div class="header">
          <h1>💕 SpinLove</h1>
          <p>\${i18n.resultsSubtitle || 'Your Date Night Slot Machine'}</p>
        </div>
        
        <div class="slot-machine">
          <div class="initial-state">
            <div class="big-emoji">🎰</div>
            <h2>Ready for Date Night?</h2>
            <p>Press SPIN to discover your perfect evening!</p>
            <button class="spin-button" onclick="startSpin()">
              🎰 SPIN
            </button>
          </div>
        </div>
      \`;
    }
    
    function renderSlotMachine(results) {
      const categories = results.map(r => r.category);
      
      let reelsHtml = '';
      results.forEach((result, index) => {
        const { category, item } = result;
        const colors = REEL_COLORS[category.id] || REEL_COLORS.food;
        const spinItems = generateSpinItems(category);
        
        reelsHtml += \`
          <div class="slot-reel" 
               id="reel-\${index}" 
               data-index="\${index}"
               style="--reel-color: \${colors.color}; --reel-color-alpha: \${colors.alpha};">
            
            \${item.hasSpecial ? '<div class="world-badge">🌍</div>' : ''}
            
            <div class="reel-header">
              <span class="emoji">\${category.emoji}</span>
              <span class="category-name">\${category.name}</span>
            </div>
            
            <div class="reel-window">
              <div class="reel-strip" id="strip-\${index}">
                \${spinItems.map(item => \`<div class="reel-item">\${item}</div>\`).join('')}
                \${spinItems.map(item => \`<div class="reel-item">\${item}</div>\`).join('')}
                \${spinItems.map(item => \`<div class="reel-item">\${item}</div>\`).join('')}
              </div>
            </div>
            
            <div class="reel-result">
              <div class="result-title">\${item.title}</div>
              <div class="result-description">\${item.description}</div>
              <div class="result-emotion">💞 \${item.emotion}</div>
            </div>
          </div>
        \`;
      });
      
      return \`
        <div class="lang-toggle">
          <label>\${i18n.languageLabel || 'Language'}:</label>
          <select id="lang-select" onchange="changeLanguage(this.value)">
            <option value="en" \${currentLang === 'en' ? 'selected' : ''}>English</option>
            <option value="de" \${currentLang === 'de' ? 'selected' : ''}>Deutsch</option>
            <option value="es" \${currentLang === 'es' ? 'selected' : ''}>Español</option>
            <option value="fr" \${currentLang === 'fr' ? 'selected' : ''}>Français</option>
            <option value="it" \${currentLang === 'it' ? 'selected' : ''}>Italiano</option>
          </select>
        </div>
        
        <div class="header">
          <h1>\${i18n.resultsTitle || '💕 SpinLove'}</h1>
          <p>\${i18n.resultsSubtitle || 'Your Date Night Slot Machine'}</p>
        </div>
        
        <div class="slot-machine">
          <div class="reels-container">
            \${reelsHtml}
          </div>
          
          <div class="status-text" id="status-text">
            \${getStatusMessage('ready')}
          </div>
        </div>
        
        <div class="world-section" id="world-section">
          <div class="world-emoji">🌍</div>
          <h2>\${i18n.worldTitle || 'Around the World'}</h2>
          <div class="world-title" id="world-title"></div>
          <div class="world-description" id="world-description"></div>
          <div class="world-mood" id="world-mood"></div>
        </div>
      \`;
    }
    
    // ========================================
    // ANIMATION FUNCTIONS
    // ========================================
    
    function startSpinAnimation() {
      const strips = document.querySelectorAll('.reel-strip');
      strips.forEach(strip => {
        strip.classList.add('spinning');
      });
      
      updateStatus('spinning');
    }
    
    function stopReel(index, categoryName) {
      return new Promise(resolve => {
        const reel = document.getElementById(\`reel-\${index}\`);
        const strip = document.getElementById(\`strip-\${index}\`);
        
        if (strip) {
          strip.classList.remove('spinning');
          strip.classList.add('stopping');
          // Random final position
          strip.style.transform = \`translateY(-\${60 + Math.random() * 120}px)\`;
        }
        
        updateStatus('stopping', categoryName);
        
        setTimeout(() => {
          if (reel) {
            reel.classList.add('stopped');
          }
          resolve();
        }, 800);
      });
    }
    
    function updateStatus(state, categoryName = '') {
      const statusEl = document.getElementById('status-text');
      if (!statusEl) return;
      
      statusEl.classList.remove('highlight');
      
      let message = '';
      switch (state) {
        case 'spinning':
          message = getStatusMessage('spinning');
          break;
        case 'stopping':
          message = \`\${getStatusMessage('stopping')} \${categoryName}...\`;
          statusEl.classList.add('highlight');
          break;
        case 'complete':
          message = getStatusMessage('complete');
          statusEl.classList.add('highlight');
          break;
        default:
          message = getStatusMessage('ready');
      }
      
      statusEl.textContent = message;
    }
    
    function showWorldSection(worldCuisine) {
      const section = document.getElementById('world-section');
      const titleEl = document.getElementById('world-title');
      const descEl = document.getElementById('world-description');
      const moodEl = document.getElementById('world-mood');
      
      if (section && worldCuisine) {
        titleEl.textContent = worldCuisine.title;
        descEl.textContent = worldCuisine.description;
        moodEl.textContent = worldCuisine.mood ? \`"\${worldCuisine.mood}"\` : '';
        
        setTimeout(() => {
          section.classList.add('visible');
        }, 500);
      }
    }
    
    // ========================================
    // MAIN SPIN SEQUENCE
    // ========================================
    
    async function runSpinSequence(results) {
      isSpinning = true;
      
      // Start all reels spinning
      startSpinAnimation();
      
      // Wait for initial spin duration
      await new Promise(r => setTimeout(r, SPIN_DURATION));
      
      // Stop reels one by one
      for (let i = 0; i < results.length; i++) {
        await stopReel(i, results[i].category.name);
        await new Promise(r => setTimeout(r, STOP_INTERVAL));
      }
      
      // Show completion status
      updateStatus('complete');
      
      // Show world section if applicable
      if (currentResults?.worldCuisine) {
        showWorldSection(currentResults.worldCuisine);
      }
      
      isSpinning = false;
    }
    
    // ========================================
    // API INTERACTION
    // ========================================
    
    async function startSpin() {
      if (isSpinning) return;
      
      if (window.openai?.callTool) {
        await window.openai.callTool('spin_date_night', { 
          language: currentLang
        });
      }
    }
    
    async function changeLanguage(lang) {
      currentLang = lang;
      if (window.openai?.callTool) {
        await window.openai.callTool('spin_date_night', { 
          language: lang
        });
      }
    }
    
    // ========================================
    // RENDER & INITIALIZATION
    // ========================================
    
    function render() {
      const app = document.getElementById('app');
      const toolOutput = window.openai?.toolOutput;
      
      if (toolOutput) {
        currentLang = toolOutput.language || detectBrowserLanguage();
        i18n = toolOutput.i18n || defaultI18n;
        currentResults = toolOutput;
      }
      
      if (!toolOutput || !toolOutput.results) {
        app.innerHTML = renderInitialState();
        return;
      }
      
      app.innerHTML = renderSlotMachine(toolOutput.results);
      
      // Start the spin animation sequence
      setTimeout(() => {
        runSpinSequence(toolOutput.results);
      }, 100);
    }
    
    // Initialize
    currentLang = detectBrowserLanguage();
    render();
    
    // Listen for updates from ChatGPT
    window.addEventListener('openai:set_globals', (event) => {
      if (event.detail.globals.toolOutput) {
        render();
      }
    });
  </script>
</body>
</html>
`;
}
