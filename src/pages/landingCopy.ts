export type LandingLang = 'en' | 'de'

type Item = { title: string; body: string }
type Highlight = Item & { file: string; alt: string }

export type LandingCopy = {
  documentTitle: string
  eyebrow: string
  hero: string
  openPrototype: string
  source: string
  phoneAlt: string
  motivationTitle: string
  motivation: [string, string, string]
  criteriaTitle: string
  criteriaIntro: string
  criteria: Item[]
  practiceTitle: string
  practiceIntro: string
  highlights: Highlight[]
  scopeTitle: string
  scopeIntro: string
  scope: Item[]
  ctaTitle: string
  ctaBody: string
  demoPinLabel: string
  transportPinLabel: string
  footerBefore: string
  footerAfter: string
  langToggleLabel: string
  appearance: {
    system: string
    light: string
    dark: string
    nextSystem: string
    nextLight: string
    nextDark: string
  }
}

const en: LandingCopy = {
  documentTitle: 'AusweisApp — redesign proposal',
  eyebrow: 'Redesign proposal',
  hero: 'Germany’s online ID app, rebuilt as a quieter iOS interface. Same idea — show people what’s happening and let them decide — with fewer taps and less visual noise.',
  openPrototype: 'Open prototype',
  source: 'Source',
  phoneAlt: 'Redesigned AusweisApp Scan screen in an iPhone frame',
  motivationTitle: 'Why this exists',
  motivation: [
    'AusweisApp already nails the hard part. Before anything leaves the card, you see who’s asking and which data they want. Transparency and control, built in. That’s the right model — and Governikus deserves credit for shipping it.',
    'The interface is where it loses me. Screens feel dated and uneven. You tap through more steps than you need, and sometimes you scroll just to find Continue. Spacing and hierarchy don’t always match the seriousness of a PIN plus an ID card. For an authenticator, polish isn’t vanity. It’s part of whether the thing feels trustworthy.',
    'So I rebuilt the main flows in the browser. Same jobs, different UI. Poke around — that’s what a prototype is for.',
  ],
  criteriaTitle: 'What I optimized for',
  criteriaIntro: 'Not a manifesto. Just the bets this build makes.',
  criteria: [
    {
      title: 'Feels like iOS',
      body: 'Sheets, lists, nav — the usual iOS patterns. Not a web form wearing a phone costume.',
    },
    {
      title: 'Quiet layouts',
      body: 'Type and spacing do the work. If you have to squint for the next step, the layout failed.',
    },
    {
      title: 'Fewer taps',
      body: 'You shouldn’t scroll to hit Continue. Every extra screen is tax — keep the path short and the main button in reach.',
    },
    {
      title: 'Readable under pressure',
      body: 'Consent lists and PIN pads need to scan in a second. Fancy chrome doesn’t help when you’re holding a card against the phone.',
    },
    {
      title: 'One job per screen',
      body: 'Identify. Pair. Change PIN. Don’t bury the next step under settings noise.',
    },
    {
      title: 'Finish matters',
      body: 'Half-finished UI on an ID app reads as “don’t trust this.” Polish isn’t decoration here.',
    },
  ],
  practiceTitle: 'A few screens',
  practiceIntro: 'These carry the argument better than another paragraph.',
  highlights: [
    {
      file: '02-identify-consent.png',
      title: 'Consent before the card',
      body: 'Who’s asking, and for what — before anything leaves the chip. Big type, short list.',
      alt: 'Identify consent screen listing requested personal data',
    },
    {
      file: '08-nfc-scan.png',
      title: 'NFC as a system sheet',
      body: 'Bottom sheet, short status. Like the OS, not a custom popup from another decade.',
      alt: 'NFC scan sheet prompting to place the ID card',
    },
    {
      file: '07-pair-mac.png',
      title: 'Pairing, stripped down',
      body: 'Show the code. Wait. Done. No extra furniture.',
      alt: 'Mac pairing screen showing a pairing code',
    },
  ],
  scopeTitle: 'What’s in here',
  scopeIntro:
    'Same jobs as the official app. Everything else is fake — no live eID, no NFC chip, no real personal data.',
  scope: [
    {
      title: 'Identify online',
      body: 'Consent, NFC sheet, card PIN, success.',
    },
    {
      title: 'Phone as card reader',
      body: 'Mac pairing code, then wait for a remote scan.',
    },
    {
      title: 'Change PIN',
      body: '6-digit, Transport-PIN, or no PIN — then enter it.',
    },
    {
      title: 'Device & ID check',
      body: 'Fake NFC check that the phone can talk to the card.',
    },
    {
      title: 'Settings & help',
      body: 'Language, appearance, pairings, help pages.',
    },
    {
      title: 'Localization',
      body: 'German, English, Turkish, Russian, Polish, Ukrainian, Arabic (RTL).',
    },
  ],
  ctaTitle: 'Try it',
  ctaBody: 'Screenshots lie about motion. Tap through the flows.',
  demoPinLabel: 'Demo card PIN',
  transportPinLabel: 'Transport-PIN',
  footerBefore: 'Design exploration by ',
  footerAfter:
    '. Not affiliated with AusweisApp, Governikus, or the German government — written with respect for the product’s focus on transparency and control. No real eID, NFC, or personal data. MIT license.',
  langToggleLabel: 'Switch to German',
  appearance: {
    system: 'System',
    light: 'Light',
    dark: 'Dark',
    nextSystem: 'Switch to light appearance',
    nextLight: 'Switch to dark appearance',
    nextDark: 'Switch to system appearance',
  },
}

const de: LandingCopy = {
  documentTitle: 'AusweisApp — Redesign-Vorschlag',
  eyebrow: 'Redesign-Vorschlag',
  hero: 'Ein unabhängiger Redesign-Vorschlag für die Online-Ausweis-Abläufe: dieselbe Transparenz und Kontrolle, mit einer ruhigeren, stärker an iOS angelehnten Oberfläche — und weniger Schritten bis zur Authentifizierung.',
  openPrototype: 'Prototyp öffnen',
  source: 'Quellcode',
  phoneAlt: 'Neugestalteter AusweisApp-Scan-Bildschirm im iPhone-Rahmen',
  motivationTitle: 'Motivation',
  motivation: [
    'Die AusweisApp macht den wichtigen Teil richtig. Bevor Daten die Karte verlassen, sieht man, wer anfragt und welche Angaben verlangt werden. Transparenz und Kontrolle sind eingebaut — und das verdient Anerkennung, auch für die Arbeit von Governikus.',
    'Schwächer ist die Oberfläche. Die UI wirkt uneinheitlich und veraltet. Es gibt zu viele Schritte, und manchmal muss man scrollen, nur um „Weiter“ zu erreichen. Abstände und Hierarchie passen nicht immer zur Ernsthaftigkeit von PIN und Ausweis. Bei einer Authentisierungs-App ist Sorgfalt in der Darstellung keine Nebensache: Sie beeinflusst, ob die App vertrauenswürdig wirkt.',
    'Deshalb habe ich die zentralen Abläufe als Browser-Prototyp neu umgesetzt. Dieselbe Funktionalität, andere Darstellung — zum direkten Ausprobieren.',
  ],
  criteriaTitle: 'Designkriterien',
  criteriaIntro: 'Worauf dieser Prototyp ausgelegt ist.',
  criteria: [
    {
      title: 'Plattformnah',
      body: 'Navigation, Sheets und Listen folgen iOS-Mustern — damit die App wie eine native App wirkt, nicht wie ein Webformular.',
    },
    {
      title: 'Ruhige Layouts',
      body: 'Typografie und Abstände tragen die Hierarchie. Der nächste Schritt soll ohne Suchen erkennbar sein.',
    },
    {
      title: 'Weniger Reibung',
      body: 'Authentifizierung mit möglichst wenigen Schritten. Primäre Aktionen bleiben erreichbar, ohne zu scrollen — jeder zusätzliche Tap kostet Zeit und Aufmerksamkeit.',
    },
    {
      title: 'Klar unter Druck',
      body: 'Einwilligung und PIN-Eingabe müssen auf einen Blick lesbar sein. Dekorative Elemente helfen wenig, wenn der Ausweis am Telefon liegt.',
    },
    {
      title: 'Ein Fokus pro Screen',
      body: 'Online-Ausweisen, Pairing und PIN ändern jeweils für sich — ohne Ablenkung durch Nebenthemen.',
    },
    {
      title: 'Qualität als Signal',
      body: 'Eine unfertige Oberfläche bei einer Ausweis-App untergräbt Vertrauen. Sorgfalt ist hier Teil der UX, kein Beiwerk.',
    },
  ],
  practiceTitle: 'In der Praxis',
  practiceIntro: 'Drei Screens, an denen sich der Ansatz zeigt.',
  highlights: [
    {
      file: '02-identify-consent.png',
      title: 'Einwilligung vor der Karte',
      body: 'Wer anfragt und welche Daten — bevor etwas den Chip verlässt. Klare Schrift, kurze Liste.',
      alt: 'Einwilligungsbildschirm mit Auflistung der angeforderten personenbezogenen Daten',
    },
    {
      file: '08-nfc-scan.png',
      title: 'NFC als System-Sheet',
      body: 'Vertrautes Bottom Sheet, kurzes Feedback. Näher an der System-UI als an einem eigenen Dialog.',
      alt: 'NFC-Scan-Sheet mit Aufforderung, den Ausweis aufzulegen',
    },
    {
      file: '07-pair-mac.png',
      title: 'Pairing ohne Ballast',
      body: 'Code anzeigen, warten, fertig. Eine Aufgabe auf dem Screen.',
      alt: 'Mac-Pairing-Bildschirm mit Pairing-Code',
    },
  ],
  scopeTitle: 'Umfang',
  scopeIntro:
    'Dieselben Aufgaben wie in der offiziellen App, andere Darstellung. Kein echtes eID, keine NFC-Hardware, keine personenbezogenen Daten.',
  scope: [
    {
      title: 'Online ausweisen',
      body: 'Einwilligung, NFC-Sheet, Karten-PIN, Erfolg.',
    },
    {
      title: 'Telefon als Kartenleser',
      body: 'Pairing-Code für den Mac, danach Bereitschaft für den Scan.',
    },
    {
      title: 'PIN ändern',
      body: '6-stellig, Transport-PIN oder keine PIN — dann Eingabe.',
    },
    {
      title: 'Geräte- & Ausweisprüfung',
      body: 'Simulierter NFC-Check, ob das Telefon die Karte erreicht.',
    },
    {
      title: 'Einstellungen & Hilfe',
      body: 'Sprache, Erscheinungsbild, Pairings und Hilfeseiten.',
    },
    {
      title: 'Lokalisierung',
      body: 'Deutsch, Englisch, Türkisch, Russisch, Polnisch, Ukrainisch und Arabisch (RTL).',
    },
  ],
  ctaTitle: 'Prototyp ausprobieren',
  ctaBody:
    'Bewegung und Ablauf lassen sich im interaktiven Prototyp besser beurteilen als auf Screenshots.',
  demoPinLabel: 'Demo-Karten-PIN',
  transportPinLabel: 'Transport-PIN',
  footerBefore: 'Designexploration von ',
  footerAfter:
    '. Nicht verbunden mit der offiziellen AusweisApp, Governikus oder der Bundesregierung. Mit Respekt für den Fokus des Produkts auf Transparenz und Kontrolle. Kein echtes eID, NFC oder personenbezogene Daten. MIT-Lizenz.',
  langToggleLabel: 'Zu Englisch wechseln',
  appearance: {
    system: 'System',
    light: 'Hell',
    dark: 'Dunkel',
    nextSystem: 'Zu hellem Erscheinungsbild wechseln',
    nextLight: 'Zu dunklem Erscheinungsbild wechseln',
    nextDark: 'Zu System-Erscheinungsbild wechseln',
  },
}

export const landingCopy: Record<LandingLang, LandingCopy> = { en, de }

export function resolveLandingLang(contentLocale: string): LandingLang {
  return contentLocale === 'de' ? 'de' : 'en'
}
