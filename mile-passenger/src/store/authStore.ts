import { create } from 'zustand';

interface AuthState {
  user: any;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: () => set({ user: { name: 'User' } }),
  logout: () => set({ user: null }),
}));
