import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const ZUSTAND_GLOBAL_STORE_KEY = 'globalStore';

type State = {
  isSidebarOpen: boolean;
  token: string | null;
};
type Actions = {
  setIsSidebarOpen: (newValue: boolean) => void;
  removeToken: () => void;
  setToken: (token: string) => void;
};

const initialState: State = {
  isSidebarOpen: true,
  token: null
};

export const useGlobalStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...initialState,
      setIsSidebarOpen: (newValue) => {
        set({ isSidebarOpen: newValue });
      },
      removeToken: () => {
        set({ token: null });
      },
      setToken: (token) => {
        set({ token });
      }
    }),
    {
      name: ZUSTAND_GLOBAL_STORE_KEY,
      storage: createJSONStorage(() => localStorage)
    }
  )
);
