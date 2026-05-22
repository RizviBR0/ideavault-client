# IdeaVault - Startup Idea Discovery & Collaboration Hub

### 🌐 Live Site URL: [https://ideavault-client.vercel.app](https://ideavault-client.vercel.app)

IdeaVault is a premium, state-of-the-art startup incubator and collaboration portal that empowers innovators to seed startup concepts, gather validation, engage in detailed discussions, and monitor community interactions through a stunning, glassmorphic visual system.

---

## 🌟 Key Features

- **🔐 Robust Authentication:**
  Powered by `better-auth`, featuring email & password registration with dynamic complexity checks, instant Google Single Sign-on (SSO), and session guards defending private dashboards.

- **💡 Idea Catalog with Regex Search & Filters:**
  Discover a diverse feed of concepts structured in a premium 3-column grid. Features active case-insensitive title search (debounced for performance) and instant category categorization.

- **💬 Real-Time Discussion Boards:**
  Submit ideas, and participate in discussion threads under every concept. Authors possess complete self-service inline text editing (Save/Cancel textareas) and immediate deletion controls.

- **📊 Creator's Personal Dashboard (CRUD):**
  Review all your submitted ideas in a sleek "My Ideas" control center. Update any details dynamically using the pre-filled HeroUI `Modal` forms or delete concepts using an `AlertDialog` confirmation check.

- **🔄 Collapsible Interaction Ledger:**
  The "My Interactions" panel maps all comments back to their original concepts, rendering a history of all platform engagement in custom collapsible accordion elements.

- **🎨 Premium Dark/Light Theme Engine:**
  A comprehensive global state engine bound directly to CSS utility variables and Tailwind CSS v4 design rules. Styled utilizing custom HSL colors, smooth transitions, hand-drawn vector details, and responsive border alignment.

---

## 🛠️ Technology Stack

### Frontend (Client)

- **Core Framework:** Next.js 16.2.6 & React 19.2.4
- **Styling:** Tailwind CSS v4, PostCSS, React Icons
- **Design System Components:** `@heroui/react` (HeroUI components)
- **Authentication:** `better-auth` client with JWKS-based JWT token exchange
- **Alerts:** `react-hot-toast`

### Backend (Server)

- **Core Runtime:** Node.js, Express.js CORS configuration
- **Database:** MongoDB Native Node.js Driver
- **Security:** `jose-cjs` verifying Bearer tokens against Next.js public JWKS endpoints