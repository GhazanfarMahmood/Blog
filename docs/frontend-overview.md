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
- Axios

### Naming Tip
- PascalCase for component files like (UserCard.tsx)
- snakeCase for custom hooks or helper functions (useAuth.ts, formatDate.ts)

- features folder is used for creating slice through redux toolkit
- constants folder is used for constant data -- (about.tsx data)
- components for components
    |- cards for all type of card -- (blog card, product card, user card)
    |- common include -- (header, footer, button)
    |- layout include -- (mainLayout.tsx, sidebar.tsx)
    |- forms include -- (LoginForm.tsx, RegisterForm.tsx)
    |- modals include -- (ConfirmModal, InfoModal)

and for pages no need to create extra folder just only create folder with the names of page and put them in src folder -- (blog/[slug]/page.tsx, category/[category]/page.tsx, search/page.tsx)

- pages will be created
    |-  home                            (done)
    |-  category                        (done)
    |-  category detail                 (done)
    |-  search                          (done)
    |-  detail                          (done)
    |-  author / writer                 (done)
    |-  dashboard                       (will work in admin panel)
    |-  Login/Register                  (optional - if needed then i will go but i will make it for admin panel)
    |-  create / edit blog page -- if needed because i will use a rich text editor for editing, writing and updating blog                               (will work in admin panel)
- static pages
    |-  About Us / About the author     (done)
    |-  Contact us                      (done)
    |-  Privacy Policy                  (done)
    |-  Terms & Conditions              (done)
    |-  Newsletter Subscribe            (optional - if needed then i will go)
    |-  Search Result                   (done as per upper)
- optional pages
    |-  portfolio -- only if you are showcasing your personal work
    |-  Services -- only if you offer paid content, writing, consulting
    |-  Testimonials/Reviews -- only if people comment on work

### some of descriptive short codes
symbol              meaning
LT                  Lite / Lower Tier
RG                  Regular
PR                  Pro
MX                  max / maximum
--- Good for product features, user roles, etc.

### Other Creative Abbreviations
Symbol              meaning
MN                  Mini
ST                  standard
Gt                  grand / greater
UL                  ultra
MG                  mega




### Things we did first after installing next js
-- set up folder structure to keep the project organized.
-- Configured global font in app/layout.tsx so it applies to the entire site.
----- If a page needs a different font, we create a new layout.tsx inside that page’s folder and apply the font there.
-- Customized global styles by updating globals.css with our own theme variables, breakpoints, and utility styles.


### in next js to create a dynamic routing like for subcategory or some other purpose in next js we use the [slug] name folder in that folder in which we want to create dynamic routing like in category page we want to create sub category then we use slug like:
--- [categories] 
---      |- page.tsx
---      |- [slugs]
---      |-    page.tsx


### in tailwind css we use the use @layer theme, @layer base, @layer components, @layer utilities
### @layer 