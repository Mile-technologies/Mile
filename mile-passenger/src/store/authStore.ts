import { create } from 'zustand';

type AuthMethod = 'phone' | 'passkey' | 'google' | null;

interface UserInfo {
  name?: string;
  email?: string;
  password?: string; // In a real app, never store plain text passwords!
  picture?: string;
  id?: string;
}

interface AuthState {
  user: UserInfo | null;
  authMethod: AuthMethod;
  phoneNumber: string | null;
  isBiometricsEnabled: boolean;
  
  login: (user?: UserInfo) => void;
  logout: () => void;
  setAuthMethod: (method: AuthMethod) => void;
  setPhoneNumber: (number: string) => void;
  setBiometricsEnabled: (enabled: boolean) => void;
  setUserInfo: (info: UserInfo) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  authMethod: null,
  phoneNumber: null,
  isBiometricsEnabled: false,

  login: (user) => set({ user: user || { name: 'User' } }),
  logout: () => set({ user: null, authMethod: null, phoneNumber: null, isBiometricsEnabled: false }),
  setAuthMethod: (method) => set({ authMethod: method }),
  setPhoneNumber: (number) => set({ phoneNumber: number }),
  setBiometricsEnabled: (enabled) => set({ isBiometricsEnabled: enabled }),
  setUserInfo: (info) => set((state) => ({ user: { ...state.user, ...info } })),
}));
