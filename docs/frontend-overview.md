### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Redux Toolkit
- Axios

### Naming Tip
- PascalCase for component files like (UserCard.tsx)
- snakeCase for custom hooks or helper functions (useAuth.ts, formatDate.ts)

- features folder is used for creating slice through redux toolkit
- constants folder is used for constant data -- (about.tsx datax)
- components for components
    |- cards for all type of card -- (blog card, product card, user card)
    |- common include -- (header, footer, button)
    |- layout include -- (mainLayout.tsx, sidebar.tsx)
    |- forms include -- (LoginForm.tsx, RegisterForm.tsx)
    |- modals include -- (ConfirmModal, InfoModal)

and for pages no need to create extra folder just only create folder with the names of page and put them in src folder -- (blog/[slug]/page.tsx, category/[category]/page.tsx, search/page.tsx)

- pages will be created
    |-  home 
    |-  category
    |-  search
    |-  detail
    |-  dashboard
    |-  Login/Register 
    |-  create / edit blog page -- if needed because i will use a rich text editor for editing, writing and updating blog
- static pages
    |-  About Us / About the author
    |-  Contact us
    |-  Privacy Policy
    |-  Terms & Conditions
    |-  Newsletter Subscribe
    |-  Search Result
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


