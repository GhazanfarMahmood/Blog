# here's come the complete 📁 folder structure of project.
# and it includes all the files and folders that are being used in the entire project
"()" parentheses represent the folder name and without parentheses name is file name.
"{}" for multiple things but with the same purpose.

(blog-site)/
├── (client)/       -- front-end
├── (server)/       -- back-end
├── (docs)/         -- document
├── .gitignore/     -- all the file names that we want to ignore will come in it. -- used at root level for 
|                      both backend and frontend.
└── README.md       -- here's project general document will come.


(client)/
├── (.next)/                           -- this folder is used for build at production time and at development 
|                                      time.
├── (node_modules)/                    -- this is node module folder have all the package installed in it.
├── (public)/                          -- this folder is for static data.
├── (src)/                             -- src folder is main folder and it contain all the folder and file of 
|     |                                 our project.
|     ├── (app)/
|     |     ├── {(pages)}/             -- here's page define the multiply pages which we can use for         
|     |     |                          multiply purposes like we have a folder (home) in which we have /page.
|     |     |                          tsx file now the page.tsx is used as the route of home page (home)/
|     |     |                          page.tsx and same for (categories)/page.tsx and (detail)/page.tsx  
|     |     ├── layout.tsx/            -- this page contain the info about body tag of that page, fonts and 
|     |     |                          seo related content especially title and description but this file is
|     |     |                          in root folder that is (app) and also we put our common component in 
|     |     |                          it that wrap the body like header, footer and if needed then sidebar.
|     |     └── page.tsx/              -- for routing and defining the page type and also wrapping the folder 
|     |                                that we want to show at first.
|     ├── (components)/                 -- here's all my site components will come.
|     |     ├── (cards)/                -- here's site card come like a simple blog card 
|     |     ├── (commons)/              -- here's common component will come that will used commonly in
|     |     |      |                       entire site.
|     |     |      ├── button.ts/       -- this file will use for button if [needed]
|     |     |      ├── Header.ts/       -- header of page
|     |     |      └── Footer.ts/       -- footer of page
|     |     ├── (forms)/                -- login and register type of pages come.
|     |     ├── (layout)/               -- contain the layout like (mainLayout, or sidebar)
|     |     └── (modals)/               -- this page contain all type of modal that use in entire site.
|     ├── (constants)/                  -- for constant data -- (about page static data)
|     ├── (features)/                   -- for creating slice with the help of redux toolkit.
|     ├── (hooks)/                      -- for custom hooks -- (useAuth.ts)
|     ├── (store)/                      -- for store that we use with the help of redux toolkit.
|     ├── (styles)/                     -- for adding custom styling by using custom css.
|     |     └── globals.css             -- for adding custom breakpoint, color and much more.
|     ├── (types)/                      -- for typescript types -- (blog.types.ts, user.types.ts,)etc.
|     └── (utils)/                      -- for validation or helpers -- (helpers.ts, validators.ts)  
├── .gitignore/                         -- only used to ignore the files that are using in front-end.
├── eslint.config.mjs/                  -- still need to know but not essential to understand.
├── next-env.d.ts/                      -- still need to know but not essential to understand.
├── next.config.ts/                     -- still need to know but not essential to understand.
├── package-lock.json/                  -- still need to know but not essential to understand.
├── package.json/                       -- contain all the info which type of packages installed in my 
|                                       -- project.
├── postcss.config.mjs/                 -- contain configuration file in which tailwind css convert into the 
|                                       css that will used in our project.
├── README.md/                          -- contain the general info and instruction for the frontend of our 
|                                       project
└── tsconfig.json/                      -- used to configure the typescript.

(docs)/
├── api-routes.md/                       -- contain the docs about api
├── backend-overview.md/                 -- contain the docs about backend
├── folder-structure.md/                 -- contain the docs about folder structure
└── frontend-overview.md/                -- contain the docs about frontend

(server)/
├── (node_modules)/                      -- contain all type of packages that we install in our backend
├── (src)/                               -- src folder is main folder and it contain all the folder and file 
|     |                                  of our project.                 
|     ├── (config)/                      -- still need to know
|     |     ├── db.ts/                   -- still need to know
|     |     └── dotenv.ts/               -- still need to know
|     ├── (controllers)/                 -- still need to know
|     |      └── blogController.ts/      -- still need to know
|     ├── (middlewares)/                 -- still need to know
|     |      └── errorMiddleware.ts/     -- still need to know
|     ├── (models)/                      -- still need to know
|     |      └── errorMiddleware.ts/     -- still need to know
|     ├── (routes)/                      -- still need to know
|     |      └── blogRoutes.ts/          -- still need to know
|     ├── app.ts/                        -- still need to know
|     └── server.ts/                     -- still need to know    
├── .env/                                -- for privacy like making api key secure
├── package-lock.json/                   -- still need to know but not essential to understand.
├── package.json/                        -- contain all the info which type of packages installed in my 
|                                        project.
└── tsconfig.json/                       -- configuration file for the typescript.

