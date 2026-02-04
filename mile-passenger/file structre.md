mile-passenger/
├── app/                        # Expo Router (file-based routing) – highly recommended 2025/2026
│   ├── (auth)/                 # Auth group (no tabs)
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   ├── verify-otp.tsx
│   │   └── _layout.tsx
│   ├── (app)/                  # Main protected tabs/stack
│   │   ├── home/
│   │   │   └── index.tsx       # Map + search ride
│   │   ├── book-ride/
│   │   │   └── index.tsx
│   │   ├── trips/
│   │   │   └── index.tsx       # History
│   │   ├── profile/
│   │   │   └── index.tsx
│   │   ├── _layout.tsx         # Tab navigator
│   │   └── +not-found.tsx
│   └── _layout.tsx             # Root layout
├── src/
│   ├── components/             # Reusable UI (atoms → molecules → organisms)
│   │   ├── ui/                 # Atomic design
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Card/
│   │   │   └── MapMarker/
│   │   ├── common/             # App-specific (Header, RideCard, etc.)
│   │   └── feature/            # Complex (BookingForm, DriverInfoSheet)
│   ├── hooks/                  # Custom hooks
│   │   ├── useLocation.ts
│   │   ├── useAuth.ts
│   │   └── useRide.ts
│   ├── lib/                    # Utilities & helpers
│   │   ├── api/                # Axios / fetch wrappers + endpoints
│   │   ├── constants/
│   │   ├── helpers/            # formatCurrency, calculateDistance
│   │   └── theme/              # colors, fonts, tailwind config if using NativeWind
│   ├── navigation/             # If not using Expo Router fully
│   ├── services/               # Business logic
│   │   └── locationService.ts
│   ├── store/                  # Zustand / Jotai / Redux slices
│   │   └── authStore.ts
│   └── types/                  # Shared interfaces (User, Ride, Location)
├── assets/                     # images, fonts, icons
│   ├── images/
│   └── fonts/
├── app.json                    # Expo config (name, icon, splash, version)
├── tsconfig.json
├── babel.config.js
├── metro.config.js             # If custom
├── package.json
├── README.md
└── .gitignore