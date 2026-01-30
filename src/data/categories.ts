/**
 * SpinLove Categories - Multilingual (EN/DE/ES/FR/IT)
 */

// ========================================
// TYPE DEFINITIONS
// ========================================

export type Language = 'en' | 'de' | 'es' | 'fr' | 'it';

export type LocalizedText = {
  en: string;
  de: string;
  es: string;
  fr: string;
  it: string;
};

export type SubItem = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  sound?: LocalizedText;
  mood?: LocalizedText;
};

export type Item = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  emotion: LocalizedText;
  special?: SubItem[];
};

export type Category = {
  id: string;
  name: LocalizedText;
  emoji: string;
  color: string;
  items: Item[];
};

// ========================================
// HELPER FUNCTIONS
// ========================================

export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function getSmartRandomItem(
  items: Item[],
  history: Item[][],
  categoryIndex: number,
  lookbackCount: number = 5
): Item {
  const recentEntries = history.slice(0, lookbackCount);
  const recentItemIds = recentEntries
    .map(entry => entry[categoryIndex]?.id)
    .filter(Boolean);
  
  const availableItems = items.filter(item => !recentItemIds.includes(item.id));
  
  if (availableItems.length === 0) {
    return getRandomItem(items);
  }
  
  return getRandomItem(availableItems);
}

// Helper to get localized text
export function t(text: LocalizedText, lang: Language): string {
  return text[lang] || text.en;
}

// ========================================
// CATEGORY 1: 🍽️ FOOD & DINING
// ========================================

const foodCategory: Category = {
  id: 'food',
  name: { 
    en: 'Food & Dining', 
    de: 'Essen & Genuss',
    es: 'Comida y Gastronomía',
    fr: 'Cuisine et Gastronomie',
    it: 'Cucina e Gastronomia'
  },
  emoji: '🍽️',
  color: '#FF9500',
  items: [
    {
      id: 'food-1',
      title: { 
        en: 'Candle-Light Dinner at Home', 
        de: 'Candle-Light Dinner zu Hause',
        es: 'Cena a la luz de las velas en casa',
        fr: 'Dîner aux chandelles à la maison',
        it: 'Cena a lume di candela a casa'
      },
      description: { 
        en: 'Transform your living room into a restaurant just for two.', 
        de: 'Verwandelt euer Wohnzimmer in ein Restaurant nur für zwei.',
        es: 'Transforma tu salón en un restaurante solo para dos.',
        fr: 'Transformez votre salon en un restaurant rien que pour deux.',
        it: 'Trasforma il tuo soggiorno in un ristorante solo per due.'
      },
      emotion: { 
        en: 'Romance, Tenderness, Slowing Down', 
        de: 'Romantik, Zärtlichkeit, Entschleunigung',
        es: 'Romance, Ternura, Desaceleración',
        fr: 'Romance, Tendresse, Ralentissement',
        it: 'Romanticismo, Tenerezza, Rallentamento'
      },
    },
    {
      id: 'food-2',
      title: { 
        en: 'Homemade 3-Course Menu', 
        de: 'Selbstgekochtes 3-Gänge-Menü',
        es: 'Menú casero de 3 platos',
        fr: 'Menu maison en 3 services',
        it: 'Menu fatto in casa di 3 portate'
      },
      description: { 
        en: 'Split up – one makes the appetizer, the other the dessert.', 
        de: 'Teilt euch auf – einer macht die Vorspeise, der andere das Dessert.',
        es: 'Dividíos – uno prepara el entrante, el otro el postre.',
        fr: 'Partagez-vous les tâches – l\'un fait l\'entrée, l\'autre le dessert.',
        it: 'Dividetevi i compiti – uno fa l\'antipasto, l\'altro il dolce.'
      },
      emotion: { 
        en: 'Teamwork, Fun, Creativity', 
        de: 'Teamwork, Spaß, Kreativität',
        es: 'Trabajo en equipo, Diversión, Creatividad',
        fr: 'Travail d\'équipe, Plaisir, Créativité',
        it: 'Lavoro di squadra, Divertimento, Creatività'
      },
    },
    {
      id: 'food-3',
      title: { 
        en: 'Fondue or Raclette Night', 
        de: 'Fondue oder Raclette Abend',
        es: 'Noche de Fondue o Raclette',
        fr: 'Soirée Fondue ou Raclette',
        it: 'Serata Fondue o Raclette'
      },
      description: { 
        en: 'Warmth, cheese, and closeness – perfect for cold evenings.', 
        de: 'Wärme, Käse und Nähe – perfekt für kalte Abende.',
        es: 'Calidez, queso y cercanía – perfecto para noches frías.',
        fr: 'Chaleur, fromage et proximité – parfait pour les soirées froides.',
        it: 'Calore, formaggio e vicinanza – perfetto per le serate fredde.'
      },
      emotion: { 
        en: 'Coziness, Indulgence, Closeness', 
        de: 'Gemütlichkeit, Genuss, Nähe',
        es: 'Comodidad, Placer, Cercanía',
        fr: 'Confort, Gourmandise, Proximité',
        it: 'Accoglienza, Piacere, Vicinanza'
      },
    },
    {
      id: 'food-4',
      title: { 
        en: 'Pasta & Wine – Italian Night', 
        de: 'Pasta & Wein – Italian Night',
        es: 'Pasta y Vino – Noche Italiana',
        fr: 'Pâtes & Vin – Soirée Italienne',
        it: 'Pasta e Vino – Serata Italiana'
      },
      description: { 
        en: 'Cook spaghetti, open a bottle of red wine – and only speak with an Italian accent.', 
        de: 'Kocht Spaghetti, öffnet eine Flasche Rotwein – und sprecht nur mit italienischem Akzent.',
        es: 'Cocina espaguetis, abre una botella de vino tinto – y hablad solo con acento italiano.',
        fr: 'Cuisinez des spaghetti, ouvrez une bouteille de vin rouge – et parlez uniquement avec un accent italien.',
        it: 'Cucinate spaghetti, aprite una bottiglia di vino rosso – e parlate solo con accento italiano.'
      },
      emotion: { 
        en: 'Passion, Humor, Sensuality', 
        de: 'Leidenschaft, Humor, Sinnlichkeit',
        es: 'Pasión, Humor, Sensualidad',
        fr: 'Passion, Humour, Sensualité',
        it: 'Passione, Umorismo, Sensualità'
      },
    },
    {
      id: 'food-5',
      title: { 
        en: 'Breakfast for Dinner', 
        de: 'Breakfast for Dinner',
        es: 'Desayuno para Cenar',
        fr: 'Petit-déjeuner pour Dîner',
        it: 'Colazione per Cena'
      },
      description: { 
        en: 'Pancakes, coffee, pajamas – rules are abolished today.', 
        de: 'Pancakes, Kaffee, Pyjama – Regeln sind heute abgeschafft.',
        es: 'Tortitas, café, pijama – hoy las reglas están abolidas.',
        fr: 'Pancakes, café, pyjama – les règles sont abolies aujourd\'hui.',
        it: 'Pancake, caffè, pigiama – oggi le regole sono abolite.'
      },
      emotion: { 
        en: 'Spontaneity, Playfulness, Lightness', 
        de: 'Spontanität, Verspieltheit, Leichtigkeit',
        es: 'Espontaneidad, Diversión, Ligereza',
        fr: 'Spontanéité, Espièglerie, Légèreté',
        it: 'Spontaneità, Giocosità, Leggerezza'
      },
    },
    {
      id: 'food-6',
      title: { 
        en: 'Tapas & Small Bites', 
        de: 'Tapas & Small Bites',
        es: 'Tapas y Pinchos',
        fr: 'Tapas et Petites Bouchées',
        it: 'Tapas e Stuzzichini'
      },
      description: { 
        en: 'Many small bites – shared pleasure, double happiness.', 
        de: 'Viele kleine Häppchen – geteilter Genuss, doppeltes Glück.',
        es: 'Muchos bocaditos – placer compartido, doble felicidad.',
        fr: 'Plein de petites bouchées – plaisir partagé, bonheur doublé.',
        it: 'Tanti piccoli assaggi – piacere condiviso, doppia felicità.'
      },
      emotion: { 
        en: 'Variety, Closeness, Play', 
        de: 'Vielfalt, Nähe, Spiel',
        es: 'Variedad, Cercanía, Juego',
        fr: 'Variété, Proximité, Jeu',
        it: 'Varietà, Vicinanza, Gioco'
      },
    },
    {
      id: 'food-7',
      title: { 
        en: 'Bread & Butter Evening', 
        de: 'Bread & Butter Evening',
        es: 'Noche de Pan y Mantequilla',
        fr: 'Soirée Pain et Beurre',
        it: 'Serata Pane e Burro'
      },
      description: { 
        en: 'The simplest meal – but with the greatest love.', 
        de: 'Das simpelste Essen – aber mit der größten Liebe.',
        es: 'La comida más sencilla – pero con el mayor amor.',
        fr: 'Le repas le plus simple – mais avec le plus grand amour.',
        it: 'Il pasto più semplice – ma con il più grande amore.'
      },
      emotion: { 
        en: 'Minimalism, Mindfulness, Warmth', 
        de: 'Minimalismus, Achtsamkeit, Wärme',
        es: 'Minimalismo, Atención plena, Calidez',
        fr: 'Minimalisme, Pleine conscience, Chaleur',
        it: 'Minimalismo, Consapevolezza, Calore'
      },
    },
    {
      id: 'food-8',
      title: { 
        en: 'Wine & Cheese Pairing', 
        de: 'Wine & Cheese Pairing',
        es: 'Maridaje de Vino y Queso',
        fr: 'Accord Vin et Fromage',
        it: 'Abbinamento Vino e Formaggio'
      },
      description: { 
        en: 'Taste your way through small worlds of flavor and feeling.', 
        de: 'Kostet euch durch kleine Welten von Geschmack und Gefühl.',
        es: 'Degusta pequeños mundos de sabor y sentimiento.',
        fr: 'Dégustez de petits mondes de saveurs et d\'émotions.',
        it: 'Assaggiate piccoli mondi di sapore e sentimento.'
      },
      emotion: { 
        en: 'Elegance, Calm, Indulgence', 
        de: 'Eleganz, Ruhe, Genuss',
        es: 'Elegancia, Calma, Placer',
        fr: 'Élégance, Calme, Gourmandise',
        it: 'Eleganza, Calma, Piacere'
      },
    },
    {
      id: 'food-9',
      title: { 
        en: 'Bake & Flirt Night', 
        de: 'Bake & Flirt Night',
        es: 'Noche de Hornear y Coquetear',
        fr: 'Soirée Pâtisserie et Flirt',
        it: 'Serata Dolci e Flirt'
      },
      description: { 
        en: 'Bake something sweet together – and add a pinch of flirting.', 
        de: 'Backt gemeinsam etwas Süßes – und fügt eine Prise Flirt hinzu.',
        es: 'Horneemos algo dulce juntos – y añadimos una pizca de coqueteo.',
        fr: 'Préparez ensemble quelque chose de sucré – avec une pincée de flirt.',
        it: 'Cucinate insieme qualcosa di dolce – e aggiungete un pizzico di flirt.'
      },
      emotion: { 
        en: 'Humor, Playfulness, Closeness', 
        de: 'Humor, Verspieltheit, Nähe',
        es: 'Humor, Diversión, Cercanía',
        fr: 'Humour, Espièglerie, Proximité',
        it: 'Umorismo, Giocosità, Vicinanza'
      },
    },
    {
      id: 'food-10',
      title: { 
        en: 'Around the World Date Wheel', 
        de: 'Around the World Date Wheel',
        es: 'Ruleta de Citas Alrededor del Mundo',
        fr: 'Roue des Rendez-vous Tour du Monde',
        it: 'Ruota degli Appuntamenti Giro del Mondo'
      },
      description: { 
        en: 'Spin the globe and discover the world through food – one country decides your dinner.', 
        de: 'Dreht den Globus und entdeckt kulinarisch die Welt – ein Land entscheidet euer Dinner.',
        es: 'Gira el globo y descubre el mundo a través de la comida – un país decide tu cena.',
        fr: 'Faites tourner le globe et découvrez le monde à travers la cuisine – un pays décide de votre dîner.',
        it: 'Gira il globo e scopri il mondo attraverso il cibo – un paese decide la tua cena.'
      },
      emotion: { 
        en: 'Adventure, Surprise, Curiosity', 
        de: 'Abenteuer, Überraschung, Neugier',
        es: 'Aventura, Sorpresa, Curiosidad',
        fr: 'Aventure, Surprise, Curiosité',
        it: 'Avventura, Sorpresa, Curiosità'
      },
      special: [
        {
          id: 'world-1',
          title: { 
            en: '🇮🇹 Italian – La Dolce Vita', 
            de: '🇮🇹 Italienisch – La Dolce Vita',
            es: '🇮🇹 Italiano – La Dolce Vita',
            fr: '🇮🇹 Italien – La Dolce Vita',
            it: '🇮🇹 Italiano – La Dolce Vita'
          },
          description: { 
            en: 'Pizza, pasta, amore. Maybe tiramisu as a sweet finale?', 
            de: 'Pizza, Pasta, Amore. Vielleicht ein Tiramisu als süßes Finale?',
            es: 'Pizza, pasta, amore. ¿Quizás un tiramisú como dulce final?',
            fr: 'Pizza, pâtes, amore. Peut-être un tiramisu pour finir en douceur ?',
            it: 'Pizza, pasta, amore. Magari un tiramisù come dolce finale?'
          },
          sound: { 
            en: '🎵 Italian street music', 
            de: '🎵 Italienische Straßenmusik',
            es: '🎵 Música callejera italiana',
            fr: '🎵 Musique de rue italienne',
            it: '🎵 Musica di strada italiana'
          },
          mood: { 
            en: 'Make it like Rome – with lots of flavor and even more love.', 
            de: "Macht's euch wie in Rom – mit viel Geschmack und noch mehr Liebe.",
            es: 'Hazlo como en Roma – con mucho sabor y aún más amor.',
            fr: 'Faites comme à Rome – avec beaucoup de saveur et encore plus d\'amour.',
            it: 'Fatelo come a Roma – con tanto sapore e ancora più amore.'
          },
        },
        {
          id: 'world-2',
          title: { 
            en: '🍣 Japanese – Sushi & Zen', 
            de: '🍣 Japanisch – Sushi & Zen',
            es: '🍣 Japonés – Sushi & Zen',
            fr: '🍣 Japonais – Sushi & Zen',
            it: '🍣 Giapponese – Sushi & Zen'
          },
          description: { 
            en: 'Make your own sushi rolls or order ramen – plus chopstick challenge.', 
            de: 'Macht selbst Sushi-Rollen oder bestellt Ramen – dazu Stäbchen-Challenge.',
            es: 'Haz tus propios rollos de sushi o pide ramen – más desafío de palillos.',
            fr: 'Préparez vos propres rouleaux de sushi ou commandez des ramen – avec défi baguettes.',
            it: 'Preparate i vostri roll di sushi o ordinate ramen – con sfida delle bacchette.'
          },
          sound: { 
            en: '🎵 Gentle flutes, flowing water', 
            de: '🎵 Sanfte Flöten, Wasserrauschen',
            es: '🎵 Flautas suaves, agua corriente',
            fr: '🎵 Flûtes douces, eau courante',
            it: '🎵 Flauti delicati, acqua che scorre'
          },
          mood: { 
            en: 'Balance, precision, indulgence – harmony in every bite.', 
            de: 'Balance, Präzision, Genuss – in jedem Bissen Harmonie.',
            es: 'Equilibrio, precisión, placer – armonía en cada bocado.',
            fr: 'Équilibre, précision, gourmandise – harmonie à chaque bouchée.',
            it: 'Equilibrio, precisione, piacere – armonia in ogni morso.'
          },
        },
        {
          id: 'world-3',
          title: { 
            en: '🌮 Mexican – Fiesta Night', 
            de: '🌮 Mexikanisch – Fiesta Night',
            es: '🌮 Mexicano – Noche de Fiesta',
            fr: '🌮 Mexicain – Soirée Fiesta',
            it: '🌮 Messicano – Serata Fiesta'
          },
          description: { 
            en: 'Tacos, guacamole, tequila – and maybe a little dance afterwards?', 
            de: 'Tacos, Guacamole, Tequila – und vielleicht ein kleiner Tanz danach?',
            es: 'Tacos, guacamole, tequila – ¿y quizás un baile después?',
            fr: 'Tacos, guacamole, tequila – et peut-être une petite danse après ?',
            it: 'Tacos, guacamole, tequila – e magari un ballo dopo?'
          },
          sound: { 
            en: '🎵 Maracas, Latin beats', 
            de: '🎵 Maracas, lateinamerikanische Beats',
            es: '🎵 Maracas, ritmos latinos',
            fr: '🎵 Maracas, rythmes latinos',
            it: '🎵 Maracas, ritmi latini'
          },
          mood: { 
            en: 'An evening full of colors, fire, and flavor.', 
            de: 'Ein Abend voller Farben, Feuer und Geschmack.',
            es: 'Una velada llena de colores, fuego y sabor.',
            fr: 'Une soirée pleine de couleurs, de feu et de saveur.',
            it: 'Una serata piena di colori, fuoco e sapore.'
          },
        },
        {
          id: 'world-4',
          title: { 
            en: '🍛 Indian – Spicy Soul', 
            de: '🍛 Indisch – Spicy Soul',
            es: '🍛 Indio – Alma Picante',
            fr: '🍛 Indien – Âme Épicée',
            it: '🍛 Indiano – Anima Speziata'
          },
          description: { 
            en: 'Cook a curry, light incense sticks, and let the aromas enchant you.', 
            de: 'Kocht ein Curry, zündet Räucherstäbchen an und lasst euch vom Duft verzaubern.',
            es: 'Cocina un curry, enciende incienso y déjate encantar por los aromas.',
            fr: 'Cuisinez un curry, allumez de l\'encens et laissez-vous envoûter par les arômes.',
            it: 'Cucinate un curry, accendete l\'incenso e lasciatevi incantare dagli aromi.'
          },
          sound: { 
            en: '🎵 Indian sitar, drums', 
            de: '🎵 Indische Sitar, Trommeln',
            es: '🎵 Sitar indio, tambores',
            fr: '🎵 Sitar indien, tambours',
            it: '🎵 Sitar indiano, tamburi'
          },
          mood: { 
            en: 'Warmth, spice, passion – love in every note.', 
            de: 'Wärme, Würze, Leidenschaft – Liebe in jeder Note.',
            es: 'Calidez, especias, pasión – amor en cada nota.',
            fr: 'Chaleur, épices, passion – l\'amour dans chaque note.',
            it: 'Calore, spezie, passione – amore in ogni nota.'
          },
        },
        {
          id: 'world-5',
          title: { 
            en: '🥖 French – Paris at Home', 
            de: '🥖 Französisch – Paris at Home',
            es: '🥖 Francés – París en Casa',
            fr: '🥖 Français – Paris à la Maison',
            it: '🥖 Francese – Parigi a Casa'
          },
          description: { 
            en: "Baguette, cheese, red wine – and maybe a little kiss under 'La vie en rose'.", 
            de: "Baguette, Käse, Rotwein – und vielleicht ein kleiner Kuss unter 'La vie en rose'.",
            es: "Baguette, queso, vino tinto – y quizás un beso bajo 'La vie en rose'.",
            fr: "Baguette, fromage, vin rouge – et peut-être un petit baiser sous 'La vie en rose'.",
            it: "Baguette, formaggio, vino rosso – e magari un bacio sotto 'La vie en rose'."
          },
          sound: { 
            en: '🎵 French jazz, street ambience', 
            de: '🎵 Französischer Jazz, Straßenambiente',
            es: '🎵 Jazz francés, ambiente callejero',
            fr: '🎵 Jazz français, ambiance de rue',
            it: '🎵 Jazz francese, atmosfera di strada'
          },
          mood: { 
            en: 'An evening like a stroll along the Seine.', 
            de: 'Ein Abend wie ein Spaziergang an der Seine.',
            es: 'Una velada como un paseo por el Sena.',
            fr: 'Une soirée comme une promenade le long de la Seine.',
            it: 'Una serata come una passeggiata lungo la Senna.'
          },
        },
        {
          id: 'world-6',
          title: { 
            en: '🏺 Greek – Meze & Sea', 
            de: '🏺 Griechisch – Meze & Meer',
            es: '🏺 Griego – Meze y Mar',
            fr: '🏺 Grec – Meze & Mer',
            it: '🏺 Greco – Meze e Mare'
          },
          description: { 
            en: 'Tzatziki, olives, ouzo – dream yourselves to the Mediterranean together.', 
            de: 'Zaziki, Oliven, Ouzo – träumt euch gemeinsam ans Mittelmeer.',
            es: 'Tzatziki, aceitunas, ouzo – soñad juntos con el Mediterráneo.',
            fr: 'Tzatziki, olives, ouzo – rêvez ensemble de la Méditerranée.',
            it: 'Tzatziki, olive, ouzo – sognate insieme il Mediterraneo.'
          },
          sound: { 
            en: '🎵 Bouzouki, sea sounds', 
            de: '🎵 Bouzouki, Meeresrauschen',
            es: '🎵 Bouzouki, sonidos del mar',
            fr: '🎵 Bouzouki, sons de la mer',
            it: '🎵 Bouzouki, suoni del mare'
          },
          mood: { 
            en: 'Salt on the skin, sun in the heart.', 
            de: 'Salz auf der Haut, Sonne im Herzen.',
            es: 'Sal en la piel, sol en el corazón.',
            fr: 'Du sel sur la peau, du soleil dans le cœur.',
            it: 'Sale sulla pelle, sole nel cuore.'
          },
        },
        {
          id: 'world-7',
          title: { 
            en: '🍔 American – Diner Vibes', 
            de: '🍔 Amerikanisch – Diner Vibes',
            es: '🍔 Americano – Vibraciones de Diner',
            fr: '🍔 Américain – Ambiance Diner',
            it: '🍔 Americano – Atmosfera Diner'
          },
          description: { 
            en: 'Burger, fries, milkshake – served with your favorite songs from the 2000s.', 
            de: 'Burger, Pommes, Milkshake – serviert mit Lieblingssongs aus den 2000ern.',
            es: 'Hamburguesa, patatas fritas, batido – servido con tus canciones favoritas de los 2000.',
            fr: 'Burger, frites, milkshake – servi avec vos chansons préférées des années 2000.',
            it: 'Burger, patatine, milkshake – servito con le vostre canzoni preferite degli anni 2000.'
          },
          sound: { 
            en: "🎵 Rock'n'Roll or Indie pop", 
            de: "🎵 Rock'n'Roll oder Indiepop",
            es: "🎵 Rock'n'Roll o Indie pop",
            fr: "🎵 Rock'n'Roll ou Indie pop",
            it: "🎵 Rock'n'Roll o Indie pop"
          },
          mood: { 
            en: "Comfort food with fun factor – It's a date, baby!", 
            de: "Comfort Food mit Spaßfaktor – It's a date, baby!",
            es: "Comida reconfortante con factor diversión – ¡Es una cita, cariño!",
            fr: "Comfort food avec fun – C'est un rendez-vous, chéri !",
            it: "Comfort food con fattore divertimento – È un appuntamento, tesoro!"
          },
        },
        {
          id: 'world-8',
          title: { 
            en: '🍜 Asian – Wok & Roll', 
            de: '🍜 Asiatisch – Wok & Roll',
            es: '🍜 Asiático – Wok & Roll',
            fr: '🍜 Asiatique – Wok & Roll',
            it: '🍜 Asiatico – Wok & Roll'
          },
          description: { 
            en: 'Cook in the wok, drink green tea – whoever gives up with chopsticks first, loses!', 
            de: 'Kocht im Wok, trinkt grünen Tee – wer zuerst mit Stäbchen aufgibt, verliert!',
            es: '¡Cocina en el wok, bebe té verde – quien primero se rinda con los palillos, pierde!',
            fr: 'Cuisinez au wok, buvez du thé vert – celui qui abandonne les baguettes en premier perd !',
            it: 'Cucinate nel wok, bevete tè verde – chi si arrende prima con le bacchette, perde!'
          },
          sound: { 
            en: '🎵 Asian percussion', 
            de: '🎵 Asiatische Percussion',
            es: '🎵 Percusión asiática',
            fr: '🎵 Percussions asiatiques',
            it: '🎵 Percussioni asiatiche'
          },
          mood: { 
            en: 'Spicy, fast, together.', 
            de: 'Scharf, schnell, gemeinsam.',
            es: 'Picante, rápido, juntos.',
            fr: 'Épicé, rapide, ensemble.',
            it: 'Piccante, veloce, insieme.'
          },
        },
        {
          id: 'world-9',
          title: { 
            en: '🧆 Turkish – Evening at the Bazaar', 
            de: '🧆 Türkisch – Abend im Basar',
            es: '🧆 Turco – Noche en el Bazar',
            fr: '🧆 Turc – Soirée au Bazar',
            it: '🧆 Turco – Serata al Bazar'
          },
          description: { 
            en: 'Falafel, hummus, baklava – with oriental music and candlelight.', 
            de: 'Falafel, Hummus, Baklava – mit orientalischer Musik und Kerzenlicht.',
            es: 'Falafel, hummus, baklava – con música oriental y luz de velas.',
            fr: 'Falafel, houmous, baklava – avec musique orientale et chandelles.',
            it: 'Falafel, hummus, baklava – con musica orientale e luce di candela.'
          },
          sound: { 
            en: '🎵 Oud, soft drums', 
            de: '🎵 Oud, leise Trommeln',
            es: '🎵 Oud, tambores suaves',
            fr: '🎵 Oud, tambours doux',
            it: '🎵 Oud, tamburi delicati'
          },
          mood: { 
            en: 'Sweet, fragrant, and warm – like true affection.', 
            de: 'Süß, duftend und warm – wie echte Zuneigung.',
            es: 'Dulce, aromático y cálido – como el verdadero cariño.',
            fr: 'Doux, parfumé et chaleureux – comme une vraie affection.',
            it: 'Dolce, profumato e caldo – come il vero affetto.'
          },
        },
        {
          id: 'world-10',
          title: { 
            en: '🍷 Spanish – Tapas & Sangria', 
            de: '🍷 Spanisch – Tapas & Sangria',
            es: '🍷 Español – Tapas y Sangría',
            fr: '🍷 Espagnol – Tapas & Sangria',
            it: '🍷 Spagnolo – Tapas e Sangria'
          },
          description: { 
            en: 'Many small dishes, sharing nibbles, sun in the heart.', 
            de: 'Viele kleine Schälchen, gemeinsames Naschen, Sonne im Herzen.',
            es: 'Muchos platillos pequeños, picar compartiendo, sol en el corazón.',
            fr: 'Plein de petits plats, partage de bouchées, soleil dans le cœur.',
            it: 'Tanti piattini, stuzzichini da condividere, sole nel cuore.'
          },
          sound: { 
            en: '🎵 Flamenco guitar, summer ambience', 
            de: '🎵 Flamenco-Gitarre, Sommerambiente',
            es: '🎵 Guitarra flamenca, ambiente veraniego',
            fr: '🎵 Guitare flamenco, ambiance estivale',
            it: '🎵 Chitarra flamenco, atmosfera estiva'
          },
          mood: { 
            en: 'An evening full of flavor and lightness.', 
            de: 'Ein Abend voller Geschmack und Leichtigkeit.',
            es: 'Una velada llena de sabor y ligereza.',
            fr: 'Une soirée pleine de saveur et de légèreté.',
            it: 'Una serata piena di sapore e leggerezza.'
          },
        },
        {
          id: 'world-11',
          title: { 
            en: '🥥 Thai – Sweet & Spicy Love', 
            de: '🥥 Thai – Sweet & Spicy Love',
            es: '🥥 Tailandés – Amor Dulce y Picante',
            fr: '🥥 Thaï – Amour Doux & Épicé',
            it: '🥥 Tailandese – Amore Dolce e Piccante'
          },
          description: { 
            en: 'Coconut, curry, chili – a feast for the senses.', 
            de: 'Kokos, Curry, Chili – ein Fest für die Sinne.',
            es: 'Coco, curry, chile – una fiesta para los sentidos.',
            fr: 'Noix de coco, curry, piment – une fête pour les sens.',
            it: 'Cocco, curry, peperoncino – una festa per i sensi.'
          },
          sound: { 
            en: '🎵 Tropical sounds, light rain', 
            de: '🎵 Tropische Klänge, leichter Regen',
            es: '🎵 Sonidos tropicales, lluvia ligera',
            fr: '🎵 Sons tropicaux, pluie légère',
            it: '🎵 Suoni tropicali, pioggia leggera'
          },
          mood: { 
            en: 'When sweet and spicy meet, magic happens.', 
            de: 'Wenn süß und scharf sich treffen, entsteht Magie.',
            es: 'Cuando lo dulce y lo picante se encuentran, surge la magia.',
            fr: 'Quand le doux et l\'épicé se rencontrent, la magie opère.',
            it: 'Quando il dolce e il piccante si incontrano, nasce la magia.'
          },
        },
        {
          id: 'world-12',
          title: { 
            en: '🍢 Korean – K-Food Date', 
            de: '🍢 Koreanisch – K-Food Date',
            es: '🍢 Coreano – Cita K-Food',
            fr: '🍢 Coréen – Rendez-vous K-Food',
            it: '🍢 Coreano – Appuntamento K-Food'
          },
          description: { 
            en: 'Bibimbap or Korean BBQ – who eats the spiciest bite?', 
            de: 'Bibimbap oder koreanisches BBQ – wer isst den schärfsten Bissen?',
            es: '¿Bibimbap o BBQ coreano – quién come el bocado más picante?',
            fr: 'Bibimbap ou BBQ coréen – qui mange la bouchée la plus épicée ?',
            it: 'Bibimbap o BBQ coreano – chi mangia il boccone più piccante?'
          },
          sound: { 
            en: '🎵 K-Pop beats', 
            de: '🎵 K-Pop Beats',
            es: '🎵 Ritmos K-Pop',
            fr: '🎵 Rythmes K-Pop',
            it: '🎵 Ritmi K-Pop'
          },
          mood: { 
            en: 'Bold, modern, spicy – like love itself.', 
            de: 'Mutig, modern, würzig – wie die Liebe selbst.',
            es: 'Audaz, moderno, picante – como el amor mismo.',
            fr: 'Audacieux, moderne, épicé – comme l\'amour lui-même.',
            it: 'Audace, moderno, speziato – come l\'amore stesso.'
          },
        },
        {
          id: 'world-13',
          title: { 
            en: '🕌 Oriental – 1001 Nights', 
            de: '🕌 Orientalisch – 1001 Nacht',
            es: '🕌 Oriental – 1001 Noches',
            fr: '🕌 Oriental – 1001 Nuits',
            it: '🕌 Orientale – 1001 Notti'
          },
          description: { 
            en: 'Dates, couscous, mint tea – dream yourselves into distant worlds.', 
            de: 'Datteln, Couscous, Minztee – träumt euch in ferne Welten.',
            es: 'Dátiles, cuscús, té de menta – soñad con mundos lejanos.',
            fr: 'Dattes, couscous, thé à la menthe – rêvez de mondes lointains.',
            it: 'Datteri, cuscus, tè alla menta – sognate mondi lontani.'
          },
          sound: { 
            en: '🎵 String instruments, mystical atmosphere', 
            de: '🎵 Saiteninstrumente, mystische Atmosphäre',
            es: '🎵 Instrumentos de cuerda, atmósfera mística',
            fr: '🎵 Instruments à cordes, atmosphère mystique',
            it: '🎵 Strumenti a corda, atmosfera mistica'
          },
          mood: { 
            en: 'An evening like a dream of gold and spices.', 
            de: 'Ein Abend wie ein Traum aus Gold und Gewürzen.',
            es: 'Una velada como un sueño de oro y especias.',
            fr: 'Une soirée comme un rêve d\'or et d\'épices.',
            it: 'Una serata come un sogno d\'oro e spezie.'
          },
        },
        {
          id: 'world-14',
          title: { 
            en: '🕯️ Scandinavian – Hygge Dinner', 
            de: '🕯️ Skandinavisch – Hygge Dinner',
            es: '🕯️ Escandinavo – Cena Hygge',
            fr: '🕯️ Scandinave – Dîner Hygge',
            it: '🕯️ Scandinavo – Cena Hygge'
          },
          description: { 
            en: 'Fish, bread, candles, blankets – pure coziness.', 
            de: 'Fisch, Brot, Kerzen, Decken – pure Gemütlichkeit.',
            es: 'Pescado, pan, velas, mantas – pura comodidad.',
            fr: 'Poisson, pain, bougies, couvertures – pur confort.',
            it: 'Pesce, pane, candele, coperte – pura accoglienza.'
          },
          sound: { 
            en: '🎵 Fireplace, gentle piano', 
            de: '🎵 Kaminfeuer, sanftes Piano',
            es: '🎵 Chimenea, piano suave',
            fr: '🎵 Cheminée, piano doux',
            it: '🎵 Camino, piano delicato'
          },
          mood: { 
            en: 'Less glamour, more feeling – that is Hygge.', 
            de: 'Weniger Glanz, mehr Gefühl – das ist Hygge.',
            es: 'Menos glamour, más sentimiento – eso es Hygge.',
            fr: 'Moins de glamour, plus de sentiment – c\'est ça le Hygge.',
            it: 'Meno glamour, più sentimento – questo è Hygge.'
          },
        },
        {
          id: 'world-15',
          title: { 
            en: '🌍 African – Safari of Taste', 
            de: '🌍 Afrikanisch – Safari of Taste',
            es: '🌍 Africano – Safari del Sabor',
            fr: '🌍 Africain – Safari des Saveurs',
            it: '🌍 Africano – Safari del Gusto'
          },
          description: { 
            en: 'Try an African stew – and listen to music from Ghana or Morocco.', 
            de: 'Probiert ein afrikanisches Eintopfgericht – und hört Musik aus Ghana oder Marokko dazu.',
            es: 'Prueba un estofado africano – y escucha música de Ghana o Marruecos.',
            fr: 'Essayez un ragoût africain – et écoutez de la musique du Ghana ou du Maroc.',
            it: 'Provate uno stufato africano – e ascoltate musica dal Ghana o dal Marocco.'
          },
          sound: { 
            en: '🎵 Drums, rhythmic vocals', 
            de: '🎵 Trommeln, rhythmische Vocals',
            es: '🎵 Tambores, voces rítmicas',
            fr: '🎵 Tambours, voix rythmiques',
            it: '🎵 Tamburi, voci ritmiche'
          },
          mood: { 
            en: 'An evening full of life, sound, and energy.', 
            de: 'Ein Abend voller Leben, Klang und Energie.',
            es: 'Una velada llena de vida, sonido y energía.',
            fr: 'Une soirée pleine de vie, de sons et d\'énergie.',
            it: 'Una serata piena di vita, suono ed energia.'
          },
        },
      ],
    },
  ],
};

// ========================================
// CATEGORY 2: 🎬 FILM & ENTERTAINMENT
// ========================================

const movieCategory: Category = {
  id: 'movie',
  name: { 
    en: 'Film & Entertainment', 
    de: 'Film & Entertainment',
    es: 'Cine y Entretenimiento',
    fr: 'Cinéma et Divertissement',
    it: 'Cinema e Intrattenimento'
  },
  emoji: '🎬',
  color: '#9D4EDD',
  items: [
    {
      id: 'movie-1',
      title: { 
        en: 'Romantic Movie Night', 
        de: 'Romantic Movie Night',
        es: 'Noche de Película Romántica',
        fr: 'Soirée Film Romantique',
        it: 'Serata Film Romantico'
      },
      description: { 
        en: 'Candlelight, cozy blanket, love movie – all you need is each other.', 
        de: 'Kerzenlicht, Kuscheldecke, Liebesfilm – alles, was ihr braucht, ist euch.',
        es: 'Luz de velas, manta acogedora, película de amor – todo lo que necesitáis sois vosotros.',
        fr: 'Chandelles, couverture douillette, film d\'amour – tout ce qu\'il vous faut, c\'est vous deux.',
        it: 'Luce di candela, coperta accogliente, film d\'amore – tutto ciò di cui avete bisogno siete voi.'
      },
      emotion: { 
        en: 'Closeness, Warmth, Tenderness', 
        de: 'Nähe, Wärme, Zärtlichkeit',
        es: 'Cercanía, Calidez, Ternura',
        fr: 'Proximité, Chaleur, Tendresse',
        it: 'Vicinanza, Calore, Tenerezza'
      },
    },
    {
      id: 'movie-2',
      title: { 
        en: 'Comedy & Chill', 
        de: 'Comedy & Chill',
        es: 'Comedia y Relax',
        fr: 'Comédie et Détente',
        it: 'Commedia e Relax'
      },
      description: { 
        en: "Laugh until you cry – together it's twice as funny.", 
        de: "Lacht, bis euch die Tränen kommen – gemeinsam ist's doppelt lustig.",
        es: 'Reíd hasta llorar – juntos es el doble de divertido.',
        fr: 'Riez jusqu\'aux larmes – à deux c\'est deux fois plus drôle.',
        it: 'Ridete fino alle lacrime – insieme è il doppio del divertimento.'
      },
      emotion: { 
        en: 'Joy, Lightness, Connection', 
        de: 'Freude, Leichtigkeit, Verbundenheit',
        es: 'Alegría, Ligereza, Conexión',
        fr: 'Joie, Légèreté, Connexion',
        it: 'Gioia, Leggerezza, Connessione'
      },
    },
    {
      id: 'movie-3',
      title: { 
        en: 'Retro Movie Night', 
        de: 'Retro Movie Night',
        es: 'Noche de Película Retro',
        fr: 'Soirée Film Rétro',
        it: 'Serata Film Retrò'
      },
      description: { 
        en: 'Back to the past – with your favorite films from back then.', 
        de: 'Zurück in die Vergangenheit – mit euren Lieblingsfilmen von damals.',
        es: 'Volver al pasado – con vuestras películas favoritas de entonces.',
        fr: 'Retour dans le passé – avec vos films préférés d\'antan.',
        it: 'Ritorno al passato – con i vostri film preferiti di allora.'
      },
      emotion: { 
        en: 'Nostalgia, Fun, Connection', 
        de: 'Nostalgie, Spaß, Verbundenheit',
        es: 'Nostalgia, Diversión, Conexión',
        fr: 'Nostalgie, Plaisir, Connexion',
        it: 'Nostalgia, Divertimento, Connessione'
      },
    },
    {
      id: 'movie-4',
      title: { 
        en: 'Horror & Cuddle Night', 
        de: 'Horror & Cuddle Night',
        es: 'Noche de Terror y Abrazos',
        fr: 'Soirée Horreur et Câlins',
        it: 'Serata Horror e Coccole'
      },
      description: { 
        en: 'Heart pounding guaranteed – and maybe you end up even closer together.', 
        de: 'Herzklopfen garantiert – und vielleicht landet ihr noch enger beieinander.',
        es: 'Corazón acelerado garantizado – y quizás acabéis aún más juntos.',
        fr: 'Cœur battant garanti – et peut-être finirez-vous encore plus proches.',
        it: 'Battito cardiaco garantito – e forse finirete ancora più vicini.'
      },
      emotion: { 
        en: 'Tension, Adrenaline, Closeness', 
        de: 'Spannung, Adrenalin, Nähe',
        es: 'Tensión, Adrenalina, Cercanía',
        fr: 'Tension, Adrénaline, Proximité',
        it: 'Tensione, Adrenalina, Vicinanza'
      },
    },
    {
      id: 'movie-5',
      title: { 
        en: 'Mystery & Mind-Twist Night', 
        de: 'Mystery & Mind-Twist Night',
        es: 'Noche de Misterio y Giros Mentales',
        fr: 'Soirée Mystère et Suspense',
        it: 'Serata Mistero e Colpi di Scena'
      },
      description: { 
        en: 'Let your brain play along – puzzles, secrets, and mind cinema guaranteed.', 
        de: 'Lasst euer Gehirn mitspielen – Rätsel, Geheimnisse und Kopfkino garantiert.',
        es: 'Deja que tu cerebro juegue – enigmas, secretos y cine mental garantizado.',
        fr: 'Laissez votre cerveau jouer – énigmes, secrets et suspense garantis.',
        it: 'Lasciate che il vostro cervello giochi – enigmi, segreti e suspense garantiti.'
      },
      emotion: { 
        en: 'Curiosity, Tension, Team Spirit', 
        de: 'Neugier, Spannung, Teamgeist',
        es: 'Curiosidad, Tensión, Espíritu de equipo',
        fr: 'Curiosité, Tension, Esprit d\'équipe',
        it: 'Curiosità, Tensione, Spirito di squadra'
      },
    },
    {
      id: 'movie-6',
      title: { 
        en: 'Thriller Night', 
        de: 'Thriller Night',
        es: 'Noche de Thriller',
        fr: 'Soirée Thriller',
        it: 'Serata Thriller'
      },
      description: { 
        en: 'Adrenaline, suspense, and a touch of danger – cinema for strong nerves.', 
        de: 'Adrenalin, Spannung und ein Hauch Gefahr – Kino für starke Nerven.',
        es: 'Adrenalina, suspense y un toque de peligro – cine para nervios fuertes.',
        fr: 'Adrénaline, suspense et une touche de danger – cinéma pour nerfs solides.',
        it: 'Adrenalina, suspense e un tocco di pericolo – cinema per nervi saldi.'
      },
      emotion: { 
        en: 'Thrill, Suspense, Energy', 
        de: 'Nervenkitzel, Spannung, Energie',
        es: 'Emoción, Suspense, Energía',
        fr: 'Frisson, Suspense, Énergie',
        it: 'Brivido, Suspense, Energia'
      },
    },
    {
      id: 'movie-7',
      title: { 
        en: 'Action & Adventure Night', 
        de: 'Action & Adventure Night',
        es: 'Noche de Acción y Aventura',
        fr: 'Soirée Action et Aventure',
        it: 'Serata Azione e Avventura'
      },
      description: { 
        en: 'Explosions, heroes, excitement – and right in the middle: you two.', 
        de: 'Explosionen, Helden, Spannung – und mittendrin: ihr zwei.',
        es: 'Explosiones, héroes, emoción – y en medio de todo: vosotros dos.',
        fr: 'Explosions, héros, excitation – et au milieu de tout ça : vous deux.',
        it: 'Esplosioni, eroi, eccitazione – e nel mezzo: voi due.'
      },
      emotion: { 
        en: 'Adventure, Energy, Togetherness', 
        de: 'Abenteuer, Energie, Zusammenhalt',
        es: 'Aventura, Energía, Unión',
        fr: 'Aventure, Énergie, Complicité',
        it: 'Avventura, Energia, Unione'
      },
    },
    {
      id: 'movie-8',
      title: { 
        en: 'Docu & Talk', 
        de: 'Docu & Talk',
        es: 'Documental y Charla',
        fr: 'Docu et Discussion',
        it: 'Documentario e Chiacchierata'
      },
      description: { 
        en: 'Experience knowledge with heart – and then talk about what moves you.', 
        de: 'Erlebt Wissen mit Herz – und sprecht danach über das, was euch bewegt.',
        es: 'Experimenta el conocimiento con corazón – y luego hablad de lo que os conmueve.',
        fr: 'Vivez le savoir avec cœur – puis parlez de ce qui vous touche.',
        it: 'Vivete la conoscenza con il cuore – e poi parlate di ciò che vi emoziona.'
      },
      emotion: { 
        en: 'Inspiration, Depth, Perspective', 
        de: 'Inspiration, Tiefe, Perspektive',
        es: 'Inspiración, Profundidad, Perspectiva',
        fr: 'Inspiration, Profondeur, Perspective',
        it: 'Ispirazione, Profondità, Prospettiva'
      },
    },
    {
      id: 'movie-9',
      title: { 
        en: 'Fantasy & Wonder Night', 
        de: 'Fantasy & Wonder Night',
        es: 'Noche de Fantasía y Maravilla',
        fr: 'Soirée Fantaisie et Émerveillement',
        it: 'Serata Fantasy e Meraviglia'
      },
      description: { 
        en: 'Dive into magical worlds, distant galaxies, and boundless imagination.', 
        de: 'Taucht ein in magische Welten, ferne Galaxien und grenzenlose Fantasie.',
        es: 'Sumérgete en mundos mágicos, galaxias lejanas e imaginación sin límites.',
        fr: 'Plongez dans des mondes magiques, des galaxies lointaines et une imagination sans limites.',
        it: 'Immergetevi in mondi magici, galassie lontane e immaginazione senza limiti.'
      },
      emotion: { 
        en: 'Wonder, Fascination, Connection', 
        de: 'Staunen, Faszination, Verbindung',
        es: 'Asombro, Fascinación, Conexión',
        fr: 'Émerveillement, Fascination, Connexion',
        it: 'Meraviglia, Fascinazione, Connessione'
      },
    },
    {
      id: 'movie-10',
      title: { 
        en: 'Feelgood & Cozy Night', 
        de: 'Feelgood & Cozy Night',
        es: 'Noche Acogedora y Reconfortante',
        fr: 'Soirée Feelgood et Cocooning',
        it: 'Serata Feelgood e Accogliente'
      },
      description: { 
        en: 'Cozy blanket, snack box, favorite movie – the coziest evening of the week.', 
        de: 'Kuscheldecke, Snackbox, Lieblingsfilm – der gemütlichste Abend der Woche.',
        es: 'Manta acogedora, caja de snacks, película favorita – la velada más acogedora de la semana.',
        fr: 'Couverture douillette, boîte de snacks, film préféré – la soirée la plus confortable de la semaine.',
        it: 'Coperta accogliente, scatola di snack, film preferito – la serata più accogliente della settimana.'
      },
      emotion: { 
        en: 'Security, Warmth, Simplicity', 
        de: 'Geborgenheit, Wärme, Einfachheit',
        es: 'Seguridad, Calidez, Sencillez',
        fr: 'Sécurité, Chaleur, Simplicité',
        it: 'Sicurezza, Calore, Semplicità'
      },
    },
  ],
};

// ========================================
// CATEGORY 3: 💞 QUALITY TIME
// ========================================

const togetherCategory: Category = {
  id: 'together',
  name: { 
    en: 'Quality Time', 
    de: 'Zeit zu Zweit',
    es: 'Tiempo de Calidad',
    fr: 'Moments à Deux',
    it: 'Tempo di Qualità'
  },
  emoji: '💞',
  color: '#FF006E',
  items: [
    {
      id: 'together-1',
      title: { 
        en: 'Deep Talk & Questions Night', 
        de: 'Deep Talk & Questions Night',
        es: 'Noche de Conversación Profunda',
        fr: 'Soirée Discussion Profonde',
        it: 'Serata Conversazione Profonda'
      },
      description: { 
        en: "Let the conversation go deeper – with questions you've never asked each other.", 
        de: 'Lasst das Gespräch tiefer gehen – mit Fragen, die ihr euch noch nie gestellt habt.',
        es: 'Deja que la conversación sea más profunda – con preguntas que nunca os habéis hecho.',
        fr: 'Laissez la conversation aller plus loin – avec des questions que vous ne vous êtes jamais posées.',
        it: 'Lasciate che la conversazione vada più in profondità – con domande che non vi siete mai fatti.'
      },
      emotion: { 
        en: 'Depth, Honesty, Trust', 
        de: 'Tiefe, Ehrlichkeit, Vertrauen',
        es: 'Profundidad, Honestidad, Confianza',
        fr: 'Profondeur, Honnêteté, Confiance',
        it: 'Profondità, Onestà, Fiducia'
      },
    },
    {
      id: 'together-2',
      title: { 
        en: 'Creative Night – Paint & Sip', 
        de: 'Creative Night – Paint & Sip',
        es: 'Noche Creativa – Pintura y Vino',
        fr: 'Soirée Créative – Peinture et Vin',
        it: 'Serata Creativa – Pittura e Vino'
      },
      description: { 
        en: 'Paint together, drink a glass of wine, and laugh about your artworks.', 
        de: 'Malt gemeinsam, trinkt ein Glas Wein und lacht über eure Kunstwerke.',
        es: 'Pintad juntos, bebed una copa de vino y reíd de vuestras obras de arte.',
        fr: 'Peignez ensemble, buvez un verre de vin et riez de vos œuvres.',
        it: 'Dipingete insieme, bevete un bicchiere di vino e ridete delle vostre opere.'
      },
      emotion: { 
        en: 'Lightness, Humor, Creativity', 
        de: 'Leichtigkeit, Humor, Kreativität',
        es: 'Ligereza, Humor, Creatividad',
        fr: 'Légèreté, Humour, Créativité',
        it: 'Leggerezza, Umorismo, Creatività'
      },
    },
    {
      id: 'together-3',
      title: { 
        en: 'Touch & Trust – Sensual Play', 
        de: 'Touch & Trust – Sinnliches Spiel',
        es: 'Tacto y Confianza – Juego Sensual',
        fr: 'Toucher et Confiance – Jeu Sensuel',
        it: 'Tocco e Fiducia – Gioco Sensuale'
      },
      description: { 
        en: 'An evening to feel, not to think.', 
        de: 'Ein Abend zum Spüren, nicht zum Denken.',
        es: 'Una velada para sentir, no para pensar.',
        fr: 'Une soirée pour ressentir, pas pour réfléchir.',
        it: 'Una serata per sentire, non per pensare.'
      },
      emotion: { 
        en: 'Trust, Intimacy, Closeness', 
        de: 'Vertrauen, Intimität, Nähe',
        es: 'Confianza, Intimidad, Cercanía',
        fr: 'Confiance, Intimité, Proximité',
        it: 'Fiducia, Intimità, Vicinanza'
      },
    },
    {
      id: 'together-4',
      title: { 
        en: 'Stargazing & Soul Talk', 
        de: 'Stargazing & Soul Talk',
        es: 'Observación de Estrellas y Charla del Alma',
        fr: 'Contemplation des Étoiles et Discussion Profonde',
        it: 'Osservazione delle Stelle e Conversazione dell\'Anima'
      },
      description: { 
        en: 'Turn off the lights, look at the sky – or the ceiling – and dream big.', 
        de: 'Löscht das Licht, schaut in den Himmel – oder an die Decke – und träumt groß.',
        es: 'Apaga las luces, mira el cielo – o el techo – y sueña a lo grande.',
        fr: 'Éteignez les lumières, regardez le ciel – ou le plafond – et rêvez grand.',
        it: 'Spegnete le luci, guardate il cielo – o il soffitto – e sognate in grande.'
      },
      emotion: { 
        en: 'Peace, Vastness, Security', 
        de: 'Ruhe, Weite, Geborgenheit',
        es: 'Paz, Vastedad, Seguridad',
        fr: 'Paix, Immensité, Sécurité',
        it: 'Pace, Vastità, Sicurezza'
      },
    },
    {
      id: 'together-5',
      title: { 
        en: 'Game Night for Lovers', 
        de: 'Game Night for Lovers',
        es: 'Noche de Juegos para Enamorados',
        fr: 'Soirée Jeux pour Amoureux',
        it: 'Serata Giochi per Innamorati'
      },
      description: { 
        en: 'Who knows the other better?', 
        de: 'Wer kennt den anderen besser?',
        es: '¿Quién conoce mejor al otro?',
        fr: 'Qui connaît mieux l\'autre ?',
        it: 'Chi conosce meglio l\'altro?'
      },
      emotion: { 
        en: 'Fun, Playfulness, Closeness', 
        de: 'Spaß, Verspieltheit, Nähe',
        es: 'Diversión, Juego, Cercanía',
        fr: 'Plaisir, Espièglerie, Proximité',
        it: 'Divertimento, Giocosità, Vicinanza'
      },
    },
    {
      id: 'together-6',
      title: { 
        en: 'Memory & Moments Night', 
        de: 'Memory & Moments Night',
        es: 'Noche de Recuerdos y Momentos',
        fr: 'Soirée Souvenirs et Moments',
        it: 'Serata Ricordi e Momenti'
      },
      description: { 
        en: 'Travel together through your most beautiful memories.', 
        de: 'Reist gemeinsam durch eure schönsten Erinnerungen.',
        es: 'Viajad juntos por vuestros recuerdos más bonitos.',
        fr: 'Voyagez ensemble à travers vos plus beaux souvenirs.',
        it: 'Viaggiate insieme attraverso i vostri ricordi più belli.'
      },
      emotion: { 
        en: 'Nostalgia, Gratitude, Love', 
        de: 'Nostalgie, Dankbarkeit, Liebe',
        es: 'Nostalgia, Gratitud, Amor',
        fr: 'Nostalgie, Gratitude, Amour',
        it: 'Nostalgia, Gratitudine, Amore'
      },
    },
    {
      id: 'together-7',
      title: { 
        en: 'Intimacy Challenge', 
        de: 'Intimacy Challenge',
        es: 'Desafío de Intimidad',
        fr: 'Défi d\'Intimité',
        it: 'Sfida dell\'Intimità'
      },
      description: { 
        en: 'Increase your closeness – through small dares for trust and passion.', 
        de: 'Steigert eure Nähe – durch kleine Mutproben für Vertrauen und Leidenschaft.',
        es: 'Aumenta vuestra cercanía – a través de pequeños retos de confianza y pasión.',
        fr: 'Augmentez votre proximité – à travers de petits défis de confiance et de passion.',
        it: 'Aumentate la vostra vicinanza – attraverso piccole sfide di fiducia e passione.'
      },
      emotion: { 
        en: 'Tension, Sensuality, Courage', 
        de: 'Spannung, Sinnlichkeit, Mut',
        es: 'Tensión, Sensualidad, Valentía',
        fr: 'Tension, Sensualité, Courage',
        it: 'Tensione, Sensualità, Coraggio'
      },
    },
    {
      id: 'together-8',
      title: { 
        en: 'Love Letter Reloaded', 
        de: 'Love Letter Reloaded',
        es: 'Carta de Amor Recargada',
        fr: 'Lettre d\'Amour Revisitée',
        it: 'Lettera d\'Amore Ricaricata'
      },
      description: { 
        en: 'Write short messages to each other that open your hearts.', 
        de: 'Schreibt euch kurze Nachrichten, die euer Herz öffnen.',
        es: 'Escribíos mensajes cortos que abran vuestros corazones.',
        fr: 'Écrivez-vous des petits messages qui ouvrent vos cœurs.',
        it: 'Scrivetevi brevi messaggi che aprano i vostri cuori.'
      },
      emotion: { 
        en: 'Vulnerability, Depth, Romance', 
        de: 'Verletzlichkeit, Tiefe, Romantik',
        es: 'Vulnerabilidad, Profundidad, Romance',
        fr: 'Vulnérabilité, Profondeur, Romance',
        it: 'Vulnerabilità, Profondità, Romanticismo'
      },
    },
    {
      id: 'together-9',
      title: { 
        en: 'Dance in the Living Room', 
        de: 'Dance in the Living Room',
        es: 'Baile en el Salón',
        fr: 'Danse dans le Salon',
        it: 'Ballo in Salotto'
      },
      description: { 
        en: 'Light a candle, play music – and dance as if you were alone in the world.', 
        de: 'Zündet eine Kerze an, spielt Musik – und tanzt, als wärt ihr allein auf der Welt.',
        es: 'Enciende una vela, pon música – y baila como si estuvierais solos en el mundo.',
        fr: 'Allumez une bougie, mettez de la musique – et dansez comme si vous étiez seuls au monde.',
        it: 'Accendete una candela, mettete musica – e ballate come se foste soli al mondo.'
      },
      emotion: { 
        en: 'Freedom, Sensuality, Joy', 
        de: 'Freiheit, Sinnlichkeit, Freude',
        es: 'Libertad, Sensualidad, Alegría',
        fr: 'Liberté, Sensualité, Joie',
        it: 'Libertà, Sensualità, Gioia'
      },
    },
    {
      id: 'together-10',
      title: { 
        en: 'Surprise Me Mini-Gift', 
        de: 'Surprise Me Mini-Gift',
        es: 'Sorpréndeme Mini-Regalo',
        fr: 'Surprise Mini-Cadeau',
        it: 'Sorprendimi Mini-Regalo'
      },
      description: { 
        en: 'Prepare a mini gift for each other from things you find at home.', 
        de: 'Bereitet euch gegenseitig ein Mini-Geschenk aus Dingen, die ihr zuhause findet.',
        es: 'Preparad un mini regalo el uno para el otro con cosas que encontréis en casa.',
        fr: 'Préparez-vous mutuellement un petit cadeau avec des choses trouvées à la maison.',
        it: 'Preparate un mini regalo l\'uno per l\'altro con cose che trovate a casa.'
      },
      emotion: { 
        en: 'Humor, Appreciation, Creativity', 
        de: 'Humor, Wertschätzung, Kreativität',
        es: 'Humor, Aprecio, Creatividad',
        fr: 'Humour, Appréciation, Créativité',
        it: 'Umorismo, Apprezzamento, Creatività'
      },
    },
  ],
};

// ========================================
// CATEGORY 4: 🔥 ROMANCE & INTIMACY
// ========================================

const intimacyCategory: Category = {
  id: 'intimacy',
  name: { 
    en: 'Romance & Intimacy', 
    de: 'Erotik & Intimität',
    es: 'Romance e Intimidad',
    fr: 'Romance et Intimité',
    it: 'Romanticismo e Intimità'
  },
  emoji: '🔥',
  color: '#DC0073',
  items: [
    {
      id: 'intimacy-1',
      title: { 
        en: 'The Slow Kiss Ritual', 
        de: 'The Slow Kiss Ritual',
        es: 'El Ritual del Beso Lento',
        fr: 'Le Rituel du Baiser Lent',
        it: 'Il Rituale del Bacio Lento'
      },
      description: { 
        en: 'A single kiss – but so slow that seconds become an eternity.', 
        de: 'Ein einziger Kuss – aber so langsam, dass aus Sekunden eine Ewigkeit wird.',
        es: 'Un solo beso – pero tan lento que los segundos se convierten en eternidad.',
        fr: 'Un seul baiser – mais si lent que les secondes deviennent une éternité.',
        it: 'Un solo bacio – ma così lento che i secondi diventano un\'eternità.'
      },
      emotion: { 
        en: 'Intensity, Presence, Erotica', 
        de: 'Intensität, Präsenz, Erotik',
        es: 'Intensidad, Presencia, Erótica',
        fr: 'Intensité, Présence, Érotisme',
        it: 'Intensità, Presenza, Erotismo'
      },
    },
    {
      id: 'intimacy-2',
      title: { 
        en: 'Touch Map Game', 
        de: 'Touch Map Game',
        es: 'Juego del Mapa del Tacto',
        fr: 'Jeu de la Carte du Toucher',
        it: 'Gioco della Mappa del Tocco'
      },
      description: { 
        en: "Explore each other's favorite zones – without words.", 
        de: 'Erkundet die Lieblings-Zonen des anderen – ohne Worte.',
        es: 'Explora las zonas favoritas del otro – sin palabras.',
        fr: 'Explorez les zones préférées de l\'autre – sans mots.',
        it: 'Esplorate le zone preferite dell\'altro – senza parole.'
      },
      emotion: { 
        en: 'Trust, Discovery, Closeness', 
        de: 'Vertrauen, Entdeckung, Nähe',
        es: 'Confianza, Descubrimiento, Cercanía',
        fr: 'Confiance, Découverte, Proximité',
        it: 'Fiducia, Scoperta, Vicinanza'
      },
    },
    {
      id: 'intimacy-3',
      title: { 
        en: 'Blindfold Sensation Play', 
        de: 'Blindfold Sensation Play',
        es: 'Juego de Sensaciones con los Ojos Vendados',
        fr: 'Jeu de Sensations les Yeux Bandés',
        it: 'Gioco di Sensazioni Bendati'
      },
      description: { 
        en: 'Take away their sight – and give them more intense feeling in return.', 
        de: 'Nimm dem anderen den Sehsinn – und schenke ihm dafür intensiveres Spüren.',
        es: 'Quítale la vista – y dale a cambio sensaciones más intensas.',
        fr: 'Ôtez-lui la vue – et offrez-lui des sensations plus intenses en retour.',
        it: 'Togligli la vista – e dagli in cambio sensazioni più intense.'
      },
      emotion: { 
        en: 'Tension, Surrender, Sensuality', 
        de: 'Spannung, Hingabe, Sinnlichkeit',
        es: 'Tensión, Entrega, Sensualidad',
        fr: 'Tension, Abandon, Sensualité',
        it: 'Tensione, Abbandono, Sensualità'
      },
    },
    {
      id: 'intimacy-4',
      title: { 
        en: 'Whispered Fantasies', 
        de: 'Whispered Fantasies',
        es: 'Fantasías Susurradas',
        fr: 'Fantasmes Chuchotés',
        it: 'Fantasie Sussurrate'
      },
      description: { 
        en: 'Whisper fantasies to each other – but only in hints.', 
        de: 'Flüstert euch Fantasien – aber nur in Form von Andeutungen.',
        es: 'Susurraos fantasías – pero solo insinuaciones.',
        fr: 'Chuchotez-vous des fantasmes – mais seulement par allusions.',
        it: 'Sussurratevi fantasie – ma solo accenni.'
      },
      emotion: { 
        en: 'Tension, Depth, Honesty', 
        de: 'Spannung, Tiefe, Ehrlichkeit',
        es: 'Tensión, Profundidad, Honestidad',
        fr: 'Tension, Profondeur, Honnêteté',
        it: 'Tensione, Profondità, Onestà'
      },
    },
    {
      id: 'intimacy-5',
      title: { 
        en: 'Secret Spots Hunt', 
        de: 'Secret Spots Hunt',
        es: 'Caza de Puntos Secretos',
        fr: 'Chasse aux Points Secrets',
        it: 'Caccia ai Punti Segreti'
      },
      description: { 
        en: 'One searches for secret favorite spots – the other shows reactions.', 
        de: 'Der eine sucht geheime Lieblingsstellen – der andere zeigt Reaktionen.',
        es: 'Uno busca puntos favoritos secretos – el otro muestra reacciones.',
        fr: 'L\'un cherche les points préférés secrets – l\'autre montre ses réactions.',
        it: 'Uno cerca i punti segreti preferiti – l\'altro mostra le reazioni.'
      },
      emotion: { 
        en: 'Humor + Erotica, Discovery', 
        de: 'Humor + Erotik, Entdeckung',
        es: 'Humor + Erótica, Descubrimiento',
        fr: 'Humour + Érotisme, Découverte',
        it: 'Umorismo + Erotismo, Scoperta'
      },
    },
    {
      id: 'intimacy-6',
      title: { 
        en: 'Temperature Tease', 
        de: 'Temperature Tease',
        es: 'Juego de Temperaturas',
        fr: 'Jeu de Températures',
        it: 'Gioco delle Temperature'
      },
      description: { 
        en: 'Play with warm and cold sensations for tingling moments.', 
        de: 'Spiel mit warmen und kalten Reizen für prickelnde Momente.',
        es: 'Juega con sensaciones cálidas y frías para momentos de hormigueo.',
        fr: 'Jouez avec des sensations chaudes et froides pour des moments de frisson.',
        it: 'Giocate con sensazioni calde e fredde per momenti di brivido.'
      },
      emotion: { 
        en: 'Tension, Sensuality, Adventure', 
        de: 'Spannung, Sinnlichkeit, Abenteuer',
        es: 'Tensión, Sensualidad, Aventura',
        fr: 'Tension, Sensualité, Aventure',
        it: 'Tensione, Sensualità, Avventura'
      },
    },
    {
      id: 'intimacy-7',
      title: { 
        en: 'Sensual Massage Ritual', 
        de: 'Sensual Massage Ritual',
        es: 'Ritual de Masaje Sensual',
        fr: 'Rituel de Massage Sensuel',
        it: 'Rituale di Massaggio Sensuale'
      },
      description: { 
        en: 'An aroma massage – slow, attentive & full of presence.', 
        de: 'Eine Aromamassage – langsam, aufmerksam & voller Präsenz.',
        es: 'Un masaje aromático – lento, atento y lleno de presencia.',
        fr: 'Un massage aux huiles – lent, attentif et plein de présence.',
        it: 'Un massaggio aromatico – lento, attento e pieno di presenza.'
      },
      emotion: { 
        en: 'Surrender, Calm, Physical Closeness', 
        de: 'Hingabe, Ruhe, körperliche Nähe',
        es: 'Entrega, Calma, Cercanía física',
        fr: 'Abandon, Calme, Proximité physique',
        it: 'Abbandono, Calma, Vicinanza fisica'
      },
    },
    {
      id: 'intimacy-8',
      title: { 
        en: 'Guided Mutual Touch', 
        de: 'Guided Mutual Touch',
        es: 'Toque Mutuo Guiado',
        fr: 'Toucher Mutuel Guidé',
        it: 'Tocco Reciproco Guidato'
      },
      description: { 
        en: 'Slowly show each other how you want to be touched.', 
        de: 'Sich gegenseitig langsam zeigen, wie man berührt werden möchte.',
        es: 'Mostraos lentamente cómo queréis ser tocados.',
        fr: 'Montrez-vous lentement comment vous voulez être touchés.',
        it: 'Mostratevi lentamente come volete essere toccati.'
      },
      emotion: { 
        en: 'Trust, Openness, Devoted Closeness', 
        de: 'Vertrauen, Offenheit, hingebungsvolle Nähe',
        es: 'Confianza, Apertura, Cercanía devota',
        fr: 'Confiance, Ouverture, Proximité dévouée',
        it: 'Fiducia, Apertura, Vicinanza devota'
      },
    },
    {
      id: 'intimacy-9',
      title: { 
        en: 'Full-Body Kissing', 
        de: 'Full-Body Kissing',
        es: 'Besos de Cuerpo Entero',
        fr: 'Baisers sur Tout le Corps',
        it: 'Baci su Tutto il Corpo'
      },
      description: { 
        en: 'Not just lips – shoulders, hips, torso, back – everything gets kissed.', 
        de: 'Nicht nur Lippen – Schultern, Hüften, Oberkörper, Rücken – alles wird geküsst.',
        es: 'No solo los labios – hombros, caderas, torso, espalda – todo recibe besos.',
        fr: 'Pas seulement les lèvres – épaules, hanches, torse, dos – tout est embrassé.',
        it: 'Non solo le labbra – spalle, fianchi, busto, schiena – tutto viene baciato.'
      },
      emotion: { 
        en: 'Full-Body Fusion, Surrender, Intense Pleasure', 
        de: 'Ganzkörper-Verschmelzung, Hingabe, intensiver Genuss',
        es: 'Fusión de cuerpo entero, Entrega, Placer intenso',
        fr: 'Fusion totale, Abandon, Plaisir intense',
        it: 'Fusione totale, Abbandono, Piacere intenso'
      },
    },
    {
      id: 'intimacy-10',
      title: { 
        en: 'Soft Restraint Ritual', 
        de: 'Soft Restraint Ritual',
        es: 'Ritual de Ataduras Suaves',
        fr: 'Rituel d\'Attaches Douces',
        it: 'Rituale di Legami Morbidi'
      },
      description: { 
        en: 'Gentle restraints, silk scarves, or handcuffs – not for control, but for conscious surrender.', 
        de: 'Zarte Fesseln, Seidentücher oder Handschellen – nicht zur Kontrolle, sondern zur bewussten Hingabe.',
        es: 'Ataduras suaves, pañuelos de seda o esposas – no para controlar, sino para la entrega consciente.',
        fr: 'Liens doux, foulards en soie ou menottes – non pour contrôler, mais pour un abandon conscient.',
        it: 'Legami delicati, foulard di seta o manette – non per controllare, ma per un abbandono consapevole.'
      },
      emotion: { 
        en: 'Trust, Tension, Letting Go', 
        de: 'Vertrauen, Spannung, Loslassen',
        es: 'Confianza, Tensión, Dejarse llevar',
        fr: 'Confiance, Tension, Lâcher-prise',
        it: 'Fiducia, Tensione, Lasciarsi andare'
      },
    },
  ],
};

// ========================================
// EXPORT
// ========================================

export const categories: Category[] = [
  foodCategory,
  movieCategory,
  togetherCategory,
  intimacyCategory,
];

// Supported language type alias
export type SupportedLanguage = Language;

// Get category items localized
export function getCategoryItems(categoryId: string, lang: Language): {
  id: string;
  title: string;
  description: string;
  emotion: string;
  hasSpecial: boolean;
}[] {
  const category = categories.find(c => c.id === categoryId);
  if (!category) return [];
  
  return category.items.map(item => ({
    id: item.id,
    title: t(item.title, lang),
    description: t(item.description, lang),
    emotion: t(item.emotion, lang),
    hasSpecial: !!(item.special && item.special.length > 0),
  }));
}

// World Cuisine data
const worldCuisines: SubItem[] = [
  {
    id: 'cuisine-japan',
    title: { en: 'Japanese', de: 'Japanisch', es: 'Japonesa', fr: 'Japonaise', it: 'Giapponese' },
    description: { en: 'Sushi, Ramen & Zen atmosphere', de: 'Sushi, Ramen & Zen-Atmosphäre', es: 'Sushi, Ramen y atmósfera Zen', fr: 'Sushi, Ramen et ambiance Zen', it: 'Sushi, Ramen e atmosfera Zen' },
    sound: { en: 'Koto music', de: 'Koto-Musik', es: 'Música Koto', fr: 'Musique Koto', it: 'Musica Koto' },
    mood: { en: 'Minimalist, calm', de: 'Minimalistisch, ruhig', es: 'Minimalista, tranquilo', fr: 'Minimaliste, calme', it: 'Minimalista, calmo' },
  },
  {
    id: 'cuisine-italy',
    title: { en: 'Italian', de: 'Italienisch', es: 'Italiana', fr: 'Italienne', it: 'Italiana' },
    description: { en: 'Pasta, Pizza & Dolce Vita', de: 'Pasta, Pizza & Dolce Vita', es: 'Pasta, Pizza y Dolce Vita', fr: 'Pâtes, Pizza et Dolce Vita', it: 'Pasta, Pizza e Dolce Vita' },
    sound: { en: 'Opera classics', de: 'Opern-Klassiker', es: 'Clásicos de ópera', fr: 'Classiques d\'opéra', it: 'Classici dell\'opera' },
    mood: { en: 'Passionate, warm', de: 'Leidenschaftlich, warm', es: 'Apasionado, cálido', fr: 'Passionné, chaleureux', it: 'Appassionato, caldo' },
  },
  {
    id: 'cuisine-mexico',
    title: { en: 'Mexican', de: 'Mexikanisch', es: 'Mexicana', fr: 'Mexicaine', it: 'Messicana' },
    description: { en: 'Tacos, Guacamole & Fiesta', de: 'Tacos, Guacamole & Fiesta', es: 'Tacos, Guacamole y Fiesta', fr: 'Tacos, Guacamole et Fiesta', it: 'Tacos, Guacamole e Fiesta' },
    sound: { en: 'Mariachi', de: 'Mariachi', es: 'Mariachi', fr: 'Mariachi', it: 'Mariachi' },
    mood: { en: 'Colorful, lively', de: 'Bunt, lebhaft', es: 'Colorido, animado', fr: 'Coloré, animé', it: 'Colorato, vivace' },
  },
  {
    id: 'cuisine-india',
    title: { en: 'Indian', de: 'Indisch', es: 'India', fr: 'Indienne', it: 'Indiana' },
    description: { en: 'Curry, Naan & Spice Magic', de: 'Curry, Naan & Gewürz-Magie', es: 'Curry, Naan y magia de especias', fr: 'Curry, Naan et magie des épices', it: 'Curry, Naan e magia delle spezie' },
    sound: { en: 'Sitar melodies', de: 'Sitar-Melodien', es: 'Melodías de sitar', fr: 'Mélodies de sitar', it: 'Melodie di sitar' },
    mood: { en: 'Exotic, aromatic', de: 'Exotisch, aromatisch', es: 'Exótico, aromático', fr: 'Exotique, aromatique', it: 'Esotico, aromatico' },
  },
  {
    id: 'cuisine-thailand',
    title: { en: 'Thai', de: 'Thailändisch', es: 'Tailandesa', fr: 'Thaïlandaise', it: 'Thailandese' },
    description: { en: 'Pad Thai, Tom Yum & Balance', de: 'Pad Thai, Tom Yum & Balance', es: 'Pad Thai, Tom Yum y equilibrio', fr: 'Pad Thai, Tom Yum et équilibre', it: 'Pad Thai, Tom Yum e equilibrio' },
    sound: { en: 'Thai flute', de: 'Thai-Flöte', es: 'Flauta tailandesa', fr: 'Flûte thaïlandaise', it: 'Flauto tailandese' },
    mood: { en: 'Fresh, vibrant', de: 'Frisch, lebhaft', es: 'Fresco, vibrante', fr: 'Frais, vibrant', it: 'Fresco, vibrante' },
  },
];

// Get random world cuisine
export function getWorldCuisine(lang: Language): {
  title: string;
  description: string;
  sound: string | null;
  mood: string | null;
} {
  const cuisine = getRandomItem(worldCuisines);
  return {
    title: t(cuisine.title, lang),
    description: t(cuisine.description, lang),
    sound: cuisine.sound ? t(cuisine.sound, lang) : null,
    mood: cuisine.mood ? t(cuisine.mood, lang) : null,
  };
}
