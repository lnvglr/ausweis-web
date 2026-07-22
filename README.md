# AusweisApp (web demo)

A React web clone of the German **AusweisApp** mobile experience — flat iOS 27-aligned UI (sizing, typography, colors, shapes), with DE/EN localization.

## Features

- **Identify online** — full eID auth journey: provider consent → place ID → native-style NFC sheet → 6-digit PIN → success/error recovery
- **Phone as card reader** — pair with Mac via code, stand by, scan when requested
- **Check device & ID**, **PIN change**, **Settings**, **Help**
- Simulated NFC (browser demo) with ready / reading / success / moved-away / timeout states

## Stack

Vite · React · TypeScript · Tailwind CSS v4 · React Router

## Run

```bash
npm install
npm run dev
```

Demo PIN: `123456`
