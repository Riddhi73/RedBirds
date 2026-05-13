# RedBirds Cybersecurity — React Application

A modern React conversion of the RedBirds cybersecurity website with glassmorphism design, Framer Motion animations, and React Router navigation.

## Tech Stack

- **React 18** + Vite
- **React Router v6**
- **Tailwind CSS v3** (stable, no native binding issues)
- **Framer Motion** for animations
- **Lucide React** for icons

## Project Structure

```
redbirds-react/
├── src/
│   ├── components/layout/Layout.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Services.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── LegalFramework.jsx
│   ├── styles/index.css
│   ├── App.jsx
│   └── main.jsx
├── tailwind.config.js
├── postcss.config.js
├── index.html
└── package.json
```

## Setup

```bash
# 1. Extract ZIP and navigate
cd redbirds-react

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
# Opens at http://localhost:3000

# 4. Build for production
npm run build
```

## Tailwind v3 Configuration

Colors and design tokens are defined in `tailwind.config.js` using the `theme.extend` object. This is the stable, battle-tested approach that works reliably on Windows, macOS, and Linux.

## License

© 2026 RedBirds Cybersecurity. All rights reserved.
