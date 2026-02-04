mile-driver/
├── app/                        # Expo Router
│   ├── (auth)/                 # Same as passenger
│   ├── (app)/
│   │   ├── dashboard/
│   │   │   └── index.tsx       # Earnings overview, map with requests
│   │   ├── requests/
│   │   │   └── index.tsx       # Incoming ride requests
│   │   ├── trips/
│   │   │   └── index.tsx       # Active/completed
│   │   ├── earnings/
│   │   │   └── index.tsx
│   │   ├── profile/
│   │   │   └── index.tsx       # Documents, vehicle, bank
│   │   └── _layout.tsx         # Bottom tabs: Home/Map, Requests, Earnings, Profile
│   └── _layout.tsx
├── src/
│   ├── components/
│   │   ├── ui/                 # Same as passenger + driver-specific (AcceptRejectButtons, EarningsChart)
│   │   └── feature/            # RideRequestCard, NavigationPanel
│   ├── hooks/
│   │   ├── useDriverStatus.ts  # Online/offline
│   │   └── useIncomingRide.ts
│   ├── lib/
│   │   ├── api/                # Driver endpoints (acceptRide, updateLocation)
│   │   └── constants/
│   ├── store/
│   └── types/
├── assets/                     # Driver icons, car images
├── app.json                    # Different bundleId, name: "Mile Cab Driver"
└── ... (rest same as passenger)