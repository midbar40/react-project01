import { create } from 'zustand'

interface AuthState {
    cookies: string;
    setCookies: (cookies: string) => void;
    clearCookies: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
    cookies: '',
    setCookies: (newCookie: string) => set({ cookies: newCookie }),
    clearCookies: () => set({ cookies: '' })
}))