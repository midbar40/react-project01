import { create } from 'zustand'

interface AuthState {
    cookies: string;
    setCookies: (cookies: string) => void;
    clearCookies: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
    cookies: '',
    setCookies: (cookies: string) => set({ cookies }),
    clearCookies: () => set({ cookies: '' })
}))