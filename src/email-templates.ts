// Email Templates für Magic Links
// Werden von Supabase oder deinem Email-Tool verwendet

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export function getMagicLinkEmail(
  firstName: string,
  magicLink: string,
  language: string,
  isNewUser: boolean
): EmailTemplate {
  const templates: Record<string, EmailTemplate> = {
    de: {
      subject: isNewUser 
        ? '🎰 Willkommen bei SpinLove – Dein Zugangslink'
        : '🎰 Dein SpinLove Zugangslink',
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 500px; margin: 0 auto; padding: 40px 20px; }
    .logo { text-align: center; font-size: 48px; margin-bottom: 20px; }
    h1 { color: #1a1a2e; font-size: 24px; margin-bottom: 20px; }
    .button { display: inline-block; background: linear-gradient(135deg, #e91e63 0%, #9c27b0 100%); color: white !important; text-decoration: none; padding: 16px 40px; border-radius: 30px; font-weight: 600; font-size: 16px; margin: 30px 0; }
    .button:hover { opacity: 0.9; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666; }
    .note { background: #f5f5f5; padding: 15px; border-radius: 10px; font-size: 14px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">🎰💕</div>
    <h1>${isNewUser ? `Willkommen bei SpinLove, ${firstName}!` : `Hallo ${firstName}!`}</h1>
    <p>${isNewUser 
      ? 'Schön, dass du dabei bist! Klicke auf den Button um deinen Zugang zu aktivieren und unbegrenzte Date-Night Ideen zu entdecken.'
      : 'Klicke auf den Button um dich wieder einzuloggen und deine Date-Night Abenteuer fortzusetzen.'
    }</p>
    <p style="text-align: center;">
      <a href="${magicLink}" class="button">Zugang aktivieren</a>
    </p>
    <div class="note">
      <strong>🔒 Sicherheitshinweis:</strong><br>
      Dieser Link ist 24 Stunden gültig und kann nur einmal verwendet werden.
    </div>
    <div class="footer">
      <p>Viel Spaß beim Spinnen! 🎲</p>
      <p>Dein SpinLove Team</p>
      <p style="font-size: 12px; color: #999;">ALL ABOUT VIDEO GmbH • Bavariafilmplatz 7 • 82031 Grünwald</p>
    </div>
  </div>
</body>
</html>`,
      text: `${isNewUser ? `Willkommen bei SpinLove, ${firstName}!` : `Hallo ${firstName}!`}

${isNewUser 
  ? 'Schön, dass du dabei bist! Klicke auf den Link um deinen Zugang zu aktivieren.'
  : 'Klicke auf den Link um dich wieder einzuloggen.'
}

${magicLink}

Der Link ist 24 Stunden gültig.

Viel Spaß beim Spinnen!
Dein SpinLove Team`
    },

    en: {
      subject: isNewUser 
        ? '🎰 Welcome to SpinLove – Your Access Link'
        : '🎰 Your SpinLove Access Link',
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 500px; margin: 0 auto; padding: 40px 20px; }
    .logo { text-align: center; font-size: 48px; margin-bottom: 20px; }
    h1 { color: #1a1a2e; font-size: 24px; margin-bottom: 20px; }
    .button { display: inline-block; background: linear-gradient(135deg, #e91e63 0%, #9c27b0 100%); color: white !important; text-decoration: none; padding: 16px 40px; border-radius: 30px; font-weight: 600; font-size: 16px; margin: 30px 0; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666; }
    .note { background: #f5f5f5; padding: 15px; border-radius: 10px; font-size: 14px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">🎰💕</div>
    <h1>${isNewUser ? `Welcome to SpinLove, ${firstName}!` : `Hi ${firstName}!`}</h1>
    <p>${isNewUser 
      ? 'Great to have you! Click the button below to activate your access and discover unlimited date night ideas.'
      : 'Click the button below to log back in and continue your date night adventures.'
    }</p>
    <p style="text-align: center;">
      <a href="${magicLink}" class="button">Activate Access</a>
    </p>
    <div class="note">
      <strong>🔒 Security Note:</strong><br>
      This link is valid for 24 hours and can only be used once.
    </div>
    <div class="footer">
      <p>Happy spinning! 🎲</p>
      <p>Your SpinLove Team</p>
      <p style="font-size: 12px; color: #999;">ALL ABOUT VIDEO GmbH • Bavariafilmplatz 7 • 82031 Grünwald</p>
    </div>
  </div>
</body>
</html>`,
      text: `${isNewUser ? `Welcome to SpinLove, ${firstName}!` : `Hi ${firstName}!`}

${isNewUser 
  ? 'Great to have you! Click the link to activate your access.'
  : 'Click the link to log back in.'
}

${magicLink}

This link is valid for 24 hours.

Happy spinning!
Your SpinLove Team`
    },

    es: {
      subject: isNewUser 
        ? '🎰 Bienvenido a SpinLove – Tu enlace de acceso'
        : '🎰 Tu enlace de acceso a SpinLove',
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 500px; margin: 0 auto; padding: 40px 20px; }
    .logo { text-align: center; font-size: 48px; margin-bottom: 20px; }
    h1 { color: #1a1a2e; font-size: 24px; margin-bottom: 20px; }
    .button { display: inline-block; background: linear-gradient(135deg, #e91e63 0%, #9c27b0 100%); color: white !important; text-decoration: none; padding: 16px 40px; border-radius: 30px; font-weight: 600; font-size: 16px; margin: 30px 0; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666; }
    .note { background: #f5f5f5; padding: 15px; border-radius: 10px; font-size: 14px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">🎰💕</div>
    <h1>${isNewUser ? `¡Bienvenido a SpinLove, ${firstName}!` : `¡Hola ${firstName}!`}</h1>
    <p>${isNewUser 
      ? '¡Qué bueno tenerte! Haz clic en el botón para activar tu acceso y descubrir ideas ilimitadas para citas.'
      : 'Haz clic en el botón para volver a iniciar sesión y continuar tus aventuras de citas.'
    }</p>
    <p style="text-align: center;">
      <a href="${magicLink}" class="button">Activar acceso</a>
    </p>
    <div class="note">
      <strong>🔒 Nota de seguridad:</strong><br>
      Este enlace es válido por 24 horas y solo se puede usar una vez.
    </div>
    <div class="footer">
      <p>¡Feliz giro! 🎲</p>
      <p>Tu equipo SpinLove</p>
      <p style="font-size: 12px; color: #999;">ALL ABOUT VIDEO GmbH • Bavariafilmplatz 7 • 82031 Grünwald</p>
    </div>
  </div>
</body>
</html>`,
      text: `${isNewUser ? `¡Bienvenido a SpinLove, ${firstName}!` : `¡Hola ${firstName}!`}

${isNewUser 
  ? '¡Qué bueno tenerte! Haz clic en el enlace para activar tu acceso.'
  : 'Haz clic en el enlace para volver a iniciar sesión.'
}

${magicLink}

Este enlace es válido por 24 horas.

¡Feliz giro!
Tu equipo SpinLove`
    },

    fr: {
      subject: isNewUser 
        ? '🎰 Bienvenue sur SpinLove – Ton lien d\'accès'
        : '🎰 Ton lien d\'accès SpinLove',
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 500px; margin: 0 auto; padding: 40px 20px; }
    .logo { text-align: center; font-size: 48px; margin-bottom: 20px; }
    h1 { color: #1a1a2e; font-size: 24px; margin-bottom: 20px; }
    .button { display: inline-block; background: linear-gradient(135deg, #e91e63 0%, #9c27b0 100%); color: white !important; text-decoration: none; padding: 16px 40px; border-radius: 30px; font-weight: 600; font-size: 16px; margin: 30px 0; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666; }
    .note { background: #f5f5f5; padding: 15px; border-radius: 10px; font-size: 14px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">🎰💕</div>
    <h1>${isNewUser ? `Bienvenue sur SpinLove, ${firstName} !` : `Salut ${firstName} !`}</h1>
    <p>${isNewUser 
      ? 'Content de t\'avoir ! Clique sur le bouton pour activer ton accès et découvrir des idées de soirées illimitées.'
      : 'Clique sur le bouton pour te reconnecter et continuer tes aventures romantiques.'
    }</p>
    <p style="text-align: center;">
      <a href="${magicLink}" class="button">Activer l'accès</a>
    </p>
    <div class="note">
      <strong>🔒 Note de sécurité :</strong><br>
      Ce lien est valide 24 heures et ne peut être utilisé qu'une seule fois.
    </div>
    <div class="footer">
      <p>Amuse-toi bien ! 🎲</p>
      <p>Ton équipe SpinLove</p>
      <p style="font-size: 12px; color: #999;">ALL ABOUT VIDEO GmbH • Bavariafilmplatz 7 • 82031 Grünwald</p>
    </div>
  </div>
</body>
</html>`,
      text: `${isNewUser ? `Bienvenue sur SpinLove, ${firstName} !` : `Salut ${firstName} !`}

${isNewUser 
  ? 'Content de t\'avoir ! Clique sur le lien pour activer ton accès.'
  : 'Clique sur le lien pour te reconnecter.'
}

${magicLink}

Ce lien est valide 24 heures.

Amuse-toi bien !
Ton équipe SpinLove`
    },

    it: {
      subject: isNewUser 
        ? '🎰 Benvenuto su SpinLove – Il tuo link di accesso'
        : '🎰 Il tuo link di accesso a SpinLove',
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 500px; margin: 0 auto; padding: 40px 20px; }
    .logo { text-align: center; font-size: 48px; margin-bottom: 20px; }
    h1 { color: #1a1a2e; font-size: 24px; margin-bottom: 20px; }
    .button { display: inline-block; background: linear-gradient(135deg, #e91e63 0%, #9c27b0 100%); color: white !important; text-decoration: none; padding: 16px 40px; border-radius: 30px; font-weight: 600; font-size: 16px; margin: 30px 0; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666; }
    .note { background: #f5f5f5; padding: 15px; border-radius: 10px; font-size: 14px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">🎰💕</div>
    <h1>${isNewUser ? `Benvenuto su SpinLove, ${firstName}!` : `Ciao ${firstName}!`}</h1>
    <p>${isNewUser 
      ? 'Che bello averti! Clicca sul pulsante per attivare il tuo accesso e scoprire idee illimitate per serate romantiche.'
      : 'Clicca sul pulsante per accedere di nuovo e continuare le tue avventure romantiche.'
    }</p>
    <p style="text-align: center;">
      <a href="${magicLink}" class="button">Attiva accesso</a>
    </p>
    <div class="note">
      <strong>🔒 Nota di sicurezza:</strong><br>
      Questo link è valido per 24 ore e può essere utilizzato solo una volta.
    </div>
    <div class="footer">
      <p>Buon divertimento! 🎲</p>
      <p>Il tuo team SpinLove</p>
      <p style="font-size: 12px; color: #999;">ALL ABOUT VIDEO GmbH • Bavariafilmplatz 7 • 82031 Grünwald</p>
    </div>
  </div>
</body>
</html>`,
      text: `${isNewUser ? `Benvenuto su SpinLove, ${firstName}!` : `Ciao ${firstName}!`}

${isNewUser 
  ? 'Che bello averti! Clicca sul link per attivare il tuo accesso.'
  : 'Clicca sul link per accedere di nuovo.'
}

${magicLink}

Questo link è valido per 24 ore.

Buon divertimento!
Il tuo team SpinLove`
    }
  };

  return templates[language] || templates.en;
}
