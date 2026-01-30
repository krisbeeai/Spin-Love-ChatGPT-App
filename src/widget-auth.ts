// SpinLove Widget with Registration Gate & History
// Includes: Free Spins, Email Gate, Magic Link, Slot Animation, History View

import { getTranslations, Language } from "./i18n.js";

interface SpinResult {
  food: { title: string; emotion: string };
  movie: { title: string; emotion: string };
  together: { title: string; emotion: string };
  intimacy: { title: string; emotion: string };
  worldCuisine?: { title: string; description: string; mood: string | null; sound?: string | null } | null;
}

interface HistoryItem {
  id: string;
  results: SpinResult;
  created_at: string;
}

interface UserData {
  firstName: string;
  email: string;
  language: string;
}

export function getWidgetHtml(
  results: SpinResult | null,
  language: Language,
  userData?: UserData | null,
  history?: HistoryItem[],
  freeSpinsRemaining?: number,
  showRegistration?: boolean,
  registrationSuccess?: boolean,
  error?: string
): string {
  const t = getTranslations(language);
  
  // UI Text translations
  const ui: Record<string, Record<Language, string>> = {
    freeSpinsLeft: {
      en: "free spins left",
      de: "Gratis-Spins übrig",
      es: "giros gratis restantes",
      fr: "tours gratuits restants",
      it: "giri gratuiti rimasti"
    },
    unlockUnlimited: {
      en: "Unlock Unlimited Spins",
      de: "Unbegrenzte Spins freischalten",
      es: "Desbloquea giros ilimitados",
      fr: "Débloquer les tours illimités",
      it: "Sblocca giri illimitati"
    },
    firstName: {
      en: "First Name",
      de: "Vorname",
      es: "Nombre",
      fr: "Prénom",
      it: "Nome"
    },
    email: {
      en: "Email",
      de: "E-Mail",
      es: "Correo electrónico",
      fr: "Email",
      it: "Email"
    },
    consent: {
      en: "I agree that my first name and email address will be stored to access the app. I will also receive tips for unforgettable date nights and occasional information about offers from ALL ABOUT VIDEO GmbH. Unsubscribe anytime.",
      de: "Ich stimme zu, dass mein Vorname und meine E-Mail-Adresse gespeichert werden, um Zugang zur App zu erhalten. Ich erhalte außerdem Tipps für unvergessliche Date-Nights und gelegentlich Infos zu weiteren Angeboten von ALL ABOUT VIDEO GmbH. Abmeldung jederzeit möglich.",
      es: "Acepto que mi nombre y correo electrónico se almacenen para acceder a la aplicación. También recibiré consejos para citas inolvidables e información sobre ofertas de ALL ABOUT VIDEO GmbH. Cancelar en cualquier momento.",
      fr: "J'accepte que mon prénom et mon email soient stockés pour accéder à l'application. Je recevrai également des conseils pour des soirées inoubliables et des informations sur les offres d'ALL ABOUT VIDEO GmbH. Désabonnement possible à tout moment.",
      it: "Accetto che il mio nome e la mia email vengano memorizzati per accedere all'app. Riceverò anche consigli per serate indimenticabili e informazioni sulle offerte di ALL ABOUT VIDEO GmbH. Cancellazione possibile in qualsiasi momento."
    },
    privacyPolicy: {
      en: "Privacy Policy",
      de: "Datenschutzerklärung",
      es: "Política de privacidad",
      fr: "Politique de confidentialité",
      it: "Informativa sulla privacy"
    },
    requestMagicLink: {
      en: "Request Magic Link",
      de: "Magic Link anfordern",
      es: "Solicitar enlace mágico",
      fr: "Demander le lien magique",
      it: "Richiedi link magico"
    },
    checkInbox: {
      en: "Check your inbox! 📬",
      de: "Prüfe dein Postfach! 📬",
      es: "¡Revisa tu bandeja de entrada! 📬",
      fr: "Vérifie ta boîte mail ! 📬",
      it: "Controlla la tua casella di posta! 📬"
    },
    magicLinkSent: {
      en: "We've sent you a magic link. Click it to unlock unlimited spins!",
      de: "Wir haben dir einen Magic Link geschickt. Klicke darauf, um unbegrenzte Spins freizuschalten!",
      es: "Te hemos enviado un enlace mágico. ¡Haz clic para desbloquear giros ilimitados!",
      fr: "Nous t'avons envoyé un lien magique. Clique dessus pour débloquer les tours illimités !",
      it: "Ti abbiamo inviato un link magico. Cliccalo per sbloccare giri illimitati!"
    },
    history: {
      en: "Your Date Night History",
      de: "Deine Date-Night Historie",
      es: "Tu historial de citas",
      fr: "Ton historique de soirées",
      it: "La tua cronologia di appuntamenti"
    },
    noHistory: {
      en: "No spins yet. Start your first date night!",
      de: "Noch keine Spins. Starte deinen ersten Date-Night!",
      es: "Sin giros aún. ¡Comienza tu primera cita!",
      fr: "Pas encore de tours. Commence ta première soirée !",
      it: "Nessun giro ancora. Inizia il tuo primo appuntamento!"
    },
    today: {
      en: "Today",
      de: "Heute",
      es: "Hoy",
      fr: "Aujourd'hui",
      it: "Oggi"
    },
    yesterday: {
      en: "Yesterday",
      de: "Gestern",
      es: "Ayer",
      fr: "Hier",
      it: "Ieri"
    },
    welcomeBack: {
      en: "Welcome back",
      de: "Willkommen zurück",
      es: "Bienvenido de nuevo",
      fr: "Bon retour",
      it: "Bentornato"
    },
    currentSpin: {
      en: "Current Spin",
      de: "Aktueller Spin",
      es: "Giro actual",
      fr: "Tour actuel",
      it: "Giro attuale"
    }
  };

  const getText = (key: string) => ui[key]?.[language] || ui[key]?.en || key;

  // CSS Styles
  const styles = `
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding: 20px;
        color: white;
      }
      
      .widget-container {
        width: 100%;
        max-width: 420px;
      }
      
      /* ========== HEADER ========== */
      .header {
        text-align: center;
        margin-bottom: 20px;
      }
      
      .header-logo {
        font-size: 48px;
        margin-bottom: 10px;
      }
      
      .header-title {
        font-size: 24px;
        font-weight: 700;
        background: linear-gradient(135deg, #e91e63, #9c27b0);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .welcome-user {
        font-size: 14px;
        color: rgba(255,255,255,0.7);
        margin-top: 5px;
      }
      
      /* ========== FREE SPINS BADGE ========== */
      .free-spins-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: rgba(255,255,255,0.1);
        backdrop-filter: blur(10px);
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 14px;
        margin-bottom: 20px;
      }
      
      .free-spins-count {
        font-weight: 700;
        color: #ffd700;
      }
      
      /* ========== REGISTRATION FORM ========== */
      .registration-card {
        background: rgba(255,255,255,0.1);
        backdrop-filter: blur(20px);
        border-radius: 20px;
        padding: 30px;
        border: 1px solid rgba(255,255,255,0.2);
      }
      
      .registration-title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 20px;
        text-align: center;
      }
      
      .form-group {
        margin-bottom: 16px;
      }
      
      .form-label {
        display: block;
        font-size: 14px;
        color: rgba(255,255,255,0.8);
        margin-bottom: 6px;
      }
      
      .form-input {
        width: 100%;
        padding: 14px 16px;
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 12px;
        background: rgba(255,255,255,0.1);
        color: white;
        font-size: 16px;
        transition: all 0.3s ease;
      }
      
      .form-input:focus {
        outline: none;
        border-color: #e91e63;
        background: rgba(255,255,255,0.15);
      }
      
      .form-input::placeholder {
        color: rgba(255,255,255,0.4);
      }
      
      .checkbox-group {
        display: flex;
        gap: 12px;
        align-items: flex-start;
        margin: 20px 0;
      }
      
      .checkbox-input {
        width: 20px;
        height: 20px;
        margin-top: 2px;
        cursor: pointer;
        accent-color: #e91e63;
      }
      
      .checkbox-label {
        font-size: 12px;
        line-height: 1.5;
        color: rgba(255,255,255,0.7);
      }
      
      .checkbox-label a {
        color: #e91e63;
        text-decoration: none;
      }
      
      .checkbox-label a:hover {
        text-decoration: underline;
      }
      
      .submit-btn {
        width: 100%;
        padding: 16px;
        border: none;
        border-radius: 12px;
        background: linear-gradient(135deg, #e91e63 0%, #9c27b0 100%);
        color: white;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        opacity: 0.5;
        pointer-events: none;
      }
      
      .submit-btn.active {
        opacity: 1;
        pointer-events: auto;
      }
      
      .submit-btn.active:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(233, 30, 99, 0.4);
      }
      
      /* ========== SUCCESS MESSAGE ========== */
      .success-card {
        background: rgba(76, 175, 80, 0.2);
        backdrop-filter: blur(20px);
        border-radius: 20px;
        padding: 40px 30px;
        border: 1px solid rgba(76, 175, 80, 0.3);
        text-align: center;
      }
      
      .success-icon {
        font-size: 64px;
        margin-bottom: 20px;
      }
      
      .success-title {
        font-size: 22px;
        font-weight: 600;
        margin-bottom: 12px;
      }
      
      .success-text {
        font-size: 14px;
        color: rgba(255,255,255,0.8);
        line-height: 1.6;
      }
      
      /* ========== SLOT MACHINE ========== */
      .slot-machine {
        background: rgba(255,255,255,0.1);
        backdrop-filter: blur(20px);
        border-radius: 20px;
        padding: 20px;
        border: 1px solid rgba(255,255,255,0.2);
        margin-bottom: 20px;
      }
      
      .current-spin-label {
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: rgba(255,255,255,0.5);
        text-align: center;
        margin-bottom: 15px;
      }
      
      .result-category {
        background: rgba(255,255,255,0.05);
        border-radius: 12px;
        padding: 16px;
        margin-bottom: 12px;
        border-left: 4px solid;
        transition: all 0.3s ease;
      }
      
      .result-category:last-child {
        margin-bottom: 0;
      }
      
      .result-category.food { border-left-color: #FF9500; }
      .result-category.movie { border-left-color: #AF52DE; }
      .result-category.together { border-left-color: #FF2D55; }
      .result-category.intimacy { border-left-color: #FF006E; }
      .result-category.world { border-left-color: #00CED1; }
      
      .category-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 8px;
      }
      
      .category-icon {
        font-size: 20px;
      }
      
      .category-name {
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: rgba(255,255,255,0.6);
      }
      
      .category-result {
        font-size: 18px;
        font-weight: 600;
      }
      
      .category-emotion {
        font-size: 12px;
        color: rgba(255,255,255,0.5);
        margin-top: 4px;
      }
      
      .world-description {
        font-size: 13px;
        color: rgba(255,255,255,0.7);
        margin-top: 8px;
        line-height: 1.5;
      }
      
      /* ========== HISTORY ========== */
      .history-section {
        margin-top: 20px;
      }
      
      .history-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
      }
      
      .history-title {
        font-size: 16px;
        font-weight: 600;
        color: rgba(255,255,255,0.9);
      }
      
      .history-toggle {
        background: rgba(255,255,255,0.1);
        border: none;
        padding: 8px 12px;
        border-radius: 8px;
        color: rgba(255,255,255,0.7);
        font-size: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .history-toggle:hover {
        background: rgba(255,255,255,0.2);
      }
      
      .history-list {
        max-height: 400px;
        overflow-y: auto;
        padding-right: 5px;
      }
      
      .history-list::-webkit-scrollbar {
        width: 4px;
      }
      
      .history-list::-webkit-scrollbar-track {
        background: rgba(255,255,255,0.1);
        border-radius: 2px;
      }
      
      .history-list::-webkit-scrollbar-thumb {
        background: rgba(255,255,255,0.3);
        border-radius: 2px;
      }
      
      .history-item {
        background: rgba(255,255,255,0.05);
        border-radius: 12px;
        margin-bottom: 10px;
        overflow: hidden;
        transition: all 0.3s ease;
      }
      
      .history-item:hover {
        background: rgba(255,255,255,0.08);
      }
      
      .history-item-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 16px;
        cursor: pointer;
      }
      
      .history-date {
        font-size: 13px;
        color: rgba(255,255,255,0.6);
      }
      
      .history-preview {
        display: flex;
        gap: 6px;
      }
      
      .history-preview-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }
      
      .history-preview-dot.food { background: #FF9500; }
      .history-preview-dot.movie { background: #AF52DE; }
      .history-preview-dot.together { background: #FF2D55; }
      .history-preview-dot.intimacy { background: #FF006E; }
      
      .history-expand-icon {
        font-size: 12px;
        color: rgba(255,255,255,0.4);
        transition: transform 0.3s ease;
      }
      
      .history-item.expanded .history-expand-icon {
        transform: rotate(180deg);
      }
      
      .history-item-content {
        display: none;
        padding: 0 16px 16px;
        border-top: 1px solid rgba(255,255,255,0.1);
      }
      
      .history-item.expanded .history-item-content {
        display: block;
      }
      
      .history-result {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 0;
        border-bottom: 1px solid rgba(255,255,255,0.05);
      }
      
      .history-result:last-child {
        border-bottom: none;
      }
      
      .history-result-icon {
        font-size: 16px;
      }
      
      .history-result-text {
        font-size: 14px;
        color: rgba(255,255,255,0.8);
      }
      
      .empty-history {
        text-align: center;
        padding: 40px 20px;
        color: rgba(255,255,255,0.5);
      }
      
      .empty-history-icon {
        font-size: 48px;
        margin-bottom: 15px;
        opacity: 0.5;
      }
      
      .empty-history-text {
        font-size: 14px;
      }
      
      /* ========== ERROR ========== */
      .error-message {
        background: rgba(244, 67, 54, 0.2);
        border: 1px solid rgba(244, 67, 54, 0.3);
        border-radius: 12px;
        padding: 14px 16px;
        margin-bottom: 20px;
        font-size: 14px;
        color: #ff8a80;
      }
      
      /* ========== ANIMATIONS ========== */
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .fade-in {
        animation: fadeIn 0.4s ease forwards;
      }
      
      .fade-in-delay-1 { animation-delay: 0.1s; opacity: 0; }
      .fade-in-delay-2 { animation-delay: 0.2s; opacity: 0; }
      .fade-in-delay-3 { animation-delay: 0.3s; opacity: 0; }
      .fade-in-delay-4 { animation-delay: 0.4s; opacity: 0; }
    </style>
  `;

  // Helper function to format date
  const formatDate = (dateString: string, lang: Language): string => {
    const date = new Date(dateString);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === now.toDateString()) {
      return getText('today') + ', ' + date.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return getText('yesterday') + ', ' + date.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString(lang, { day: 'numeric', month: 'short', year: 'numeric' });
    }
  };

  // Build result card HTML
  const buildResultCard = (result: SpinResult, isCurrentSpin: boolean = false): string => {
    const categories = [
      { key: 'food', icon: '🍽️', name: t.categories.food, data: result.food },
      { key: 'movie', icon: '🎬', name: t.categories.movie, data: result.movie },
      { key: 'together', icon: '✨', name: t.categories.together, data: result.together },
      { key: 'intimacy', icon: '💕', name: t.categories.intimacy, data: result.intimacy }
    ];

    let html = '';
    
    if (isCurrentSpin) {
      html += `<div class="current-spin-label">${getText('currentSpin')}</div>`;
    }
    
    categories.forEach((cat, index) => {
      html += `
        <div class="result-category ${cat.key} fade-in fade-in-delay-${index + 1}">
          <div class="category-header">
            <span class="category-icon">${cat.icon}</span>
            <span class="category-name">${cat.name}</span>
          </div>
          <div class="category-result">${cat.data.title}</div>
          <div class="category-emotion">${cat.data.emotion}</div>
        </div>
      `;
    });

    if (result.worldCuisine) {
      html += `
        <div class="result-category world fade-in fade-in-delay-4">
          <div class="category-header">
            <span class="category-icon">🌍</span>
            <span class="category-name">${t.categories.world}</span>
          </div>
          <div class="category-result">${result.worldCuisine.title}</div>
          <div class="world-description">${result.worldCuisine.description}</div>
        </div>
      `;
    }

    return html;
  };

  // Build history HTML
  const buildHistoryHtml = (): string => {
    if (!history || history.length === 0) {
      return `
        <div class="empty-history">
          <div class="empty-history-icon">🎰</div>
          <div class="empty-history-text">${getText('noHistory')}</div>
        </div>
      `;
    }

    let html = '';
    history.forEach((item, index) => {
      html += `
        <div class="history-item" data-index="${index}">
          <div class="history-item-header" onclick="toggleHistoryItem(${index})">
            <span class="history-date">${formatDate(item.created_at, language)}</span>
            <div class="history-preview">
              <span class="history-preview-dot food"></span>
              <span class="history-preview-dot movie"></span>
              <span class="history-preview-dot together"></span>
              <span class="history-preview-dot intimacy"></span>
            </div>
            <span class="history-expand-icon">▼</span>
          </div>
          <div class="history-item-content">
            <div class="history-result">
              <span class="history-result-icon">🍽️</span>
              <span class="history-result-text">${item.results.food?.title || '-'}</span>
            </div>
            <div class="history-result">
              <span class="history-result-icon">🎬</span>
              <span class="history-result-text">${item.results.movie?.title || '-'}</span>
            </div>
            <div class="history-result">
              <span class="history-result-icon">✨</span>
              <span class="history-result-text">${item.results.together?.title || '-'}</span>
            </div>
            <div class="history-result">
              <span class="history-result-icon">💕</span>
              <span class="history-result-text">${item.results.intimacy?.title || '-'}</span>
            </div>
            ${item.results.worldCuisine ? `
              <div class="history-result">
                <span class="history-result-icon">🌍</span>
                <span class="history-result-text">${item.results.worldCuisine.title}</span>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    });

    return html;
  };

  // Registration form HTML
  const registrationFormHtml = `
    <div class="registration-card fade-in">
      <div class="registration-title">🎰 ${getText('unlockUnlimited')}</div>
      
      ${error ? `<div class="error-message">${error}</div>` : ''}
      
      <form id="registrationForm" onsubmit="handleRegistration(event)">
        <div class="form-group">
          <label class="form-label">${getText('firstName')}</label>
          <input type="text" class="form-input" id="firstName" placeholder="${getText('firstName')}" required>
        </div>
        
        <div class="form-group">
          <label class="form-label">${getText('email')}</label>
          <input type="email" class="form-input" id="email" placeholder="${getText('email')}" required>
        </div>
        
        <div class="checkbox-group">
          <input type="checkbox" class="checkbox-input" id="consent" onchange="updateSubmitButton()">
          <label class="checkbox-label" for="consent">
            ${getText('consent')}
            <br><br>
            <a href="/datenschutz" target="_blank">→ ${getText('privacyPolicy')}</a>
          </label>
        </div>
        
        <button type="submit" class="submit-btn" id="submitBtn">
          ${getText('requestMagicLink')}
        </button>
      </form>
    </div>
  `;

  // Success message HTML
  const successHtml = `
    <div class="success-card fade-in">
      <div class="success-icon">✉️</div>
      <div class="success-title">${getText('checkInbox')}</div>
      <div class="success-text">${getText('magicLinkSent')}</div>
    </div>
  `;

  // Main content logic
  let mainContent = '';

  if (registrationSuccess) {
    // Show success message after registration
    mainContent = successHtml;
  } else if (showRegistration) {
    // Show registration form
    mainContent = registrationFormHtml;
  } else if (results) {
    // Show results (logged in user)
    mainContent = `
      <div class="slot-machine fade-in">
        ${buildResultCard(results, true)}
      </div>
      
      ${userData && history ? `
        <div class="history-section fade-in">
          <div class="history-header">
            <span class="history-title">📜 ${getText('history')}</span>
          </div>
          <div class="history-list">
            ${buildHistoryHtml()}
          </div>
        </div>
      ` : ''}
    `;
  }

  // JavaScript for interactivity
  const scripts = `
    <script>
      function updateSubmitButton() {
        const consent = document.getElementById('consent');
        const submitBtn = document.getElementById('submitBtn');
        if (consent && submitBtn) {
          if (consent.checked) {
            submitBtn.classList.add('active');
          } else {
            submitBtn.classList.remove('active');
          }
        }
      }
      
      function toggleHistoryItem(index) {
        const items = document.querySelectorAll('.history-item');
        items.forEach((item, i) => {
          if (i === index) {
            item.classList.toggle('expanded');
          } else {
            item.classList.remove('expanded');
          }
        });
      }
      
      async function handleRegistration(event) {
        event.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const email = document.getElementById('email').value;
        const consent = document.getElementById('consent').checked;
        
        if (!consent) {
          alert('Bitte stimme den Bedingungen zu.');
          return;
        }
        
        // Get language and country
        const language = navigator.language?.split('-')[0] || 'en';
        
        try {
          const response = await window.openai?.callTool('register_user', {
            firstName,
            email,
            language,
            consent: true
          });
          
          // Widget will be re-rendered with success message
        } catch (error) {
          console.error('Registration error:', error);
        }
      }
    </script>
  `;

  // Full HTML
  return `
    <!DOCTYPE html>
    <html lang="${language}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>SpinLove</title>
      ${styles}
    </head>
    <body>
      <div class="widget-container">
        <div class="header">
          <div class="header-logo">🎰💕</div>
          <div class="header-title">SpinLove</div>
          ${userData ? `
            <div class="welcome-user">${getText('welcomeBack')}, ${userData.firstName}! 👋</div>
          ` : ''}
        </div>
        
        ${freeSpinsRemaining !== undefined && freeSpinsRemaining > 0 && !userData ? `
          <div style="text-align: center;">
            <div class="free-spins-badge">
              <span class="free-spins-count">${freeSpinsRemaining}</span>
              <span>${getText('freeSpinsLeft')}</span>
            </div>
          </div>
        ` : ''}
        
        ${mainContent}
      </div>
      ${scripts}
    </body>
    </html>
  `;
}
