## 🎨 Frontend

### 🚀 Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Redux Toolkit
- RTK Query

---

### 📂 Structure
src/
  ├── app/                # Routing (App Router)
  ├── components/
  │     ├── cards/
  │     ├── common/
  │     ├── layout/
  │     ├── forms/
  │     └── modals/
  ├── features/           # Redux slices
  ├── constants/          # Static data

---

### 📄 Key Pages
- Home
- Category
- Blog Detail
- Search
- Dashboard
- Auth (Login / Register)

---

### 🔄 Routing
- Uses Next.js App Router
- Dynamic routes via `[slug]`

Examples:
- /blog/[slug]
- /category/[slug]

---

### ⚙️ Setup Highlights
- Global layout & fonts configured in `app/layout.tsx`
- Global styles managed via `globals.css`
- Modular and reusable component structure