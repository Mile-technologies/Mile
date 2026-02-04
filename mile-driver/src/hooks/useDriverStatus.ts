import { create } from 'zustand';

interface DriverState {
  isOnline: boolean;
  toggleStatus: () => void;
}

export const useDriverStatus = create<DriverState>((set) => ({
  isOnline: false,
  toggleStatus: () => set((state) => ({ isOnline: !state.isOnline })),
}));
