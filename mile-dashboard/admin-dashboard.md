3. Admin Dashboard Repo Structure (mile-cab-admin) – Web React
This is not React Native — it's web React (Vite recommended for speed).
textmile-cab-admin/
├── public/                     # static assets
├── src/
│   ├── pages/                  # Or app/ if using React Router file-based or app router
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── users/
│   │   ├── drivers/
│   │   │   └── verification.tsx
│   │   ├── rides/
│   │   └── settings/
│   ├── components/
│   │   ├── ui/                 # Shadcn/ui or custom (Table, Modal, Chart)
│   │   └── layout/             # Sidebar, Header, DataTable
│   ├── hooks/
│   ├── lib/
│   │   ├── api/
│   │   └── utils/
│   ├── store/                  # Zustand for filters, auth
│   └── types/
├── vite.config.ts
├── tsconfig.json
├── index.html
├── package.json
└── tailwind.config.js          # If using Tailwind

Use shadcn/ui or Chakra/MUI for fast admin UI
React Query / TanStack Table for data-heavy tables (rides list, drivers pending approval)