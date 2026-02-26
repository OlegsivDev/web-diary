# 私の日記 — Personal Diary Frontend

A React + Tailwind CSS frontend for a personal diary web application, featuring a Japanese-inspired dark aesthetic with vermillion accents, traditional typography, and a clean minimal layout.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)

---

## Features

- **Authentication** — Register and login with JWT token stored in localStorage
- **Post Feed** — Paginated diary entries sorted newest to oldest
- **Full CRUD** — Create, read, update, and delete diary entries
- **Mood Picker** — 8 emoji mood tags per entry
- **Japanese UI** — All interface text in Japanese with locale-aware date formatting
- **Dark Theme** — Night-toned palette with vermillion (朱色) accents
- **Responsive** — Mobile-first layout, decorative side panel visible on desktop (≥1024px)

---

## Tech Stack

| Package | Version | Purpose |
|---------|---------|---------|
| React | 18 | UI framework |
| React Router | 6 | Client-side routing |
| Vite | 5 | Build tool & dev server |
| Tailwind CSS | 4 | Utility-first styling |
| Axios | 1.6 | HTTP client |
| date-fns | 3 | Date formatting (Japanese locale) |
| react-hot-toast | 2.4 | Toast notifications |

---

## Project Structure

```
src/
├── api.js                      # Axios instance + all API calls
├── main.jsx                    # App entry point
├── App.jsx                     # Route definitions
├── index.css                   # Global styles, CSS variables, component classes
│
├── context/
│   └── AuthContext.jsx         # JWT auth state (login, register, logout)
│
├── pages/
│   ├── LoginPage.jsx           # ログイン — Login page
│   ├── RegisterPage.jsx        # 新規登録 — Registration page
│   └── FeedPage.jsx            # 記録一覧 — Main diary feed
│
└── components/
    ├── Navbar.jsx              # Top navigation bar
    ├── PostCard.jsx            # Single diary entry card
    ├── PostModal.jsx           # Create / edit entry modal
    └── DeleteModal.jsx         # Delete confirmation modal
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- The [.NET backend](../DiaryApp/README.md) running on `http://localhost:5000`

### Installation

```bash
cd diary-frontend
npm install
```

### Development

```bash
npm run dev
# → http://localhost:5173
```

Vite automatically proxies all `/api/*` requests to `http://localhost:5000`, so no CORS configuration is needed during development.

### Production Build

```bash
npm run build
# Output in /dist — serve as static files or behind a reverse proxy
```

---

## Environment & Configuration

All API calls go through the Vite proxy defined in `vite.config.js`:

```js
server: {
  proxy: {
    '/api': 'http://localhost:5000'
  }
}
```

To point to a different backend, update the proxy target or change the `baseURL` in `src/api.js`.

---

## Design System

### Typography

| Font | Usage |
|------|-------|
| Shippori Mincho | Headings, titles, logo |
| Noto Serif JP | Body text, card content |
| Noto Sans JP | Labels, buttons, metadata |

All fonts are loaded from Google Fonts and defined as CSS variables in `index.css`.

### Color Palette

| Variable | Hex | Usage |
|----------|-----|-------|
| `--color-night` | `#12100E` | Page background |
| `--color-night-card` | `#211E1A` | Card backgrounds |
| `--color-night-border` | `#2E2A24` | Borders, dividers |
| `--color-washi` | `#F2EDE4` | Primary text |
| `--color-stone` | `#8B8680` | Secondary / muted text |
| `--color-vermillion` | `#C0392B` | Primary accent (buttons, highlights) |
| `--color-gold` | `#B8860B` | Decorative accent |

### Reusable CSS Classes

| Class | Description |
|-------|-------------|
| `.btn-primary` | Filled vermillion button |
| `.btn-ghost` | Transparent ghost button |
| `.input-field` | Dark-themed text input |
| `.card` | Entry card with hover shadow |
| `.ruled-lines` | Repeating horizontal line background |

---

## Pages & Components

### LoginPage / RegisterPage

Two-column layout: decorative left panel (desktop only) with a giant watermark kanji (日記 / 記録) and an inspirational quote, plus a centered form on the right. Inline validation on the registration form.

### FeedPage

Displays all diary entries for the authenticated user. Shows a skeleton loader during fetch, an illustrated empty state for new users, and paginated navigation at the bottom.

### PostCard

Each card renders with:
- A left red accent bar
- Day number and month in the left margin
- Title, weekday + time metadata, and optional mood badge
- Edit / Delete action buttons that appear on hover

### PostModal

Slide-up sheet for creating and editing entries. Contains a large serif title input, a mood emoji picker (8 options), and a ruled textarea. Closes on `Escape` or backdrop click.

### DeleteModal

Compact confirmation dialog with the entry title highlighted, requiring explicit confirmation before deletion.

---

## API Integration

All requests are made via `src/api.js`. JWT token is attached automatically via an Axios request interceptor.

| Function | Method | Endpoint |
|----------|--------|----------|
| `login(data)` | POST | `/api/auth/login` |
| `register(data)` | POST | `/api/auth/register` |
| `getFeed(page, size)` | GET | `/api/posts?page=&pageSize=` |
| `createPost(data)` | POST | `/api/posts` |
| `updatePost(id, data)` | PUT | `/api/posts/:id` |
| `deletePost(id)` | DELETE | `/api/posts/:id` |

---

## Running Both Frontend and Backend

```bash
# Terminal 1 — backend
cd DiaryApp
dotnet run          # → http://localhost:5000

# Terminal 2 — frontend
cd diary-frontend
npm run dev         # → http://localhost:5173
```

Open `http://localhost:5173` in your browser. Register an account and start writing.
