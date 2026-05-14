<div align="center">

# 🛡️ RedBirds Cybersecurity

**A modern, animated cybersecurity web application built with React 18 + Vite**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.10-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.3.0-FF0055?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)](./LICENSE)

[Live Demo](https://red-birds-puce.vercel.app/) · [Report Bug](https://github.com/Riddhi73/RedBirds/issues) · [Request Feature](https://github.com/Riddhi73/RedBirds/issues)

</div>

---

## 📖 Overview

**RedBirds** is a sleek, production-ready cybersecurity company website built as a modern React Single Page Application (SPA). It features a **glassmorphism UI design**, fluid **Framer Motion** animations, and a clean multi-page structure powered by **React Router v6** — all bundled with Vite for blazing-fast development and optimal production builds.

> Originally conceived as a static site, RedBirds has been fully re-architected as a component-driven React application with a scalable folder structure, custom Tailwind design tokens, and smooth page transitions.

---

## ✨ Features

- 🎨 **Glassmorphism Design** — frosted-glass UI aesthetics with layered depth and blur effects
- ⚡ **Lightning-Fast Dev Server** — powered by Vite with near-instant HMR
- 🧭 **Client-Side Routing** — seamless multi-page navigation via React Router v6
- 🎞️ **Smooth Animations** — entrance animations and transitions via Framer Motion
- 🧱 **Reusable Components** — layout wrapper with shared `<Header>` and `<Footer>` across all pages
- 🖼️ **Icon System** — consistent, scalable icons with Lucide React
- 📱 **Responsive Layout** — Tailwind utility classes for mobile-first responsiveness
- 🎨 **Custom Design Tokens** — brand colors and theme extensions defined in `tailwind.config.js`
- 🌐 **Cross-Platform Build** — stable Tailwind v3 configuration that works on Windows, macOS, and Linux

---

## 🛠️ Tech Stack

| Category | Technology | Version |
|---|---|---|
| UI Library | React | 18.3.1 |
| Build Tool | Vite | 5.4.1 |
| Routing | React Router DOM | 6.26.0 |
| Animations | Framer Motion | 11.3.0 |
| Styling | Tailwind CSS | 3.4.10 |
| Icons | Lucide React | 0.446.0 |
| CSS Processing | PostCSS + Autoprefixer | 8.x / 10.x |

---

## 📁 Project Structure

```
RedBirds/
├── public/                     # Static assets
├── src/
│   ├── components/
│   │   └── layout/
│   │       └── Layout.jsx      # Shared layout wrapper (Header + Footer)
│   ├── pages/
│   │   ├── Home.jsx            # Landing / hero page
│   │   ├── Services.jsx        # Cybersecurity services listing
│   │   ├── About.jsx           # Company info & team
│   │   ├── Contact.jsx         # Contact form & details
│   │   └── LegalFramework.jsx  # Legal & compliance information
│   ├── styles/
│   │   └── index.css           # Global styles + Tailwind directives
│   ├── App.jsx                 # Root component with Router & routes
│   └── main.jsx                # App entry point
├── index.html                  # HTML shell
├── package.json
├── tailwind.config.js          # Tailwind theme & custom tokens
├── postcss.config.js
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** ≥ 18.x — [Download](https://nodejs.org/)
- **npm** ≥ 9.x (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Riddhi73/RedBirds.git

# 2. Navigate into the project directory
cd RedBirds

# 3. Install all dependencies
npm install
```

### Development

```bash
# Start the local development server
npm run dev
```

The app will be available at **http://localhost:3000** with Hot Module Replacement (HMR) enabled.

### Production Build

```bash
# Compile and minify for production
npm run build

# Preview the production build locally
npm run preview
```

The optimized output will be generated in the `dist/` directory, ready for deployment.

---

## 📄 Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero section, value proposition, call-to-action |
| `/services` | Services | Cybersecurity service offerings |
| `/about` | About | Company background, mission & team |
| `/contact` | Contact | Contact form and business details |
| `/legal` | Legal Framework | Legal notices, compliance, and policies |

---

## 🎨 Design System

Custom design tokens are defined in `tailwind.config.js` under `theme.extend`. This includes:

- **Brand color palette** — Red-forward identity with dark/neutral backgrounds
- **Typography scale** — Consistent heading and body font sizing
- **Spacing & radius tokens** — Reusable spacing units for glassmorphism cards

Glassmorphism effects are achieved via Tailwind's `backdrop-blur`, `bg-opacity`, and `border` utilities combined with custom CSS variables in `index.css`.

---

## 🧩 Key Dependencies

```jsonc
// Runtime dependencies
"react": "^18.3.1"
"react-dom": "^18.3.1"
"react-router-dom": "^6.26.0"   // SPA routing
"framer-motion": "^11.3.0"      // Animations & transitions
"lucide-react": "^0.446.0"      // Icon library

// Dev dependencies
"vite": "^5.4.1"                 // Build tool
"tailwindcss": "^3.4.10"        // Utility-first CSS
"@vitejs/plugin-react": "^4.3.1" // React fast refresh
"autoprefixer": "^10.4.20"      // CSS vendor prefixing
```

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch — `git checkout -b feature/your-feature-name`
3. Commit your changes — `git commit -m 'feat: add some feature'`
4. Push to the branch — `git push origin feature/your-feature-name`
5. Open a Pull Request

Please follow [conventional commits](https://www.conventionalcommits.org/) for commit messages.

---

## 🐛 Issues

Found a bug or have a suggestion? [Open an issue](https://github.com/Riddhi73/RedBirds/issues) with a clear description and steps to reproduce.

---

## 📜 License

© 2026 **RedBirds Cybersecurity**. All rights reserved.

This project is proprietary software. Unauthorized copying, distribution, or modification of this codebase, via any medium, is strictly prohibited without written permission from the author.

---

## 👤 Author

**Riddhi73**

- GitHub: [@Riddhi73](https://github.com/Riddhi73)

---

<div align="center">

Made with ❤️ and ⚛️ React

</div>
