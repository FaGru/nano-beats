import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const ZUSTAND_GLOBAL_STORE_KEY = 'globalStore';

type State = {
  isSidebarOpen: boolean;
};
type Actions = { setIsSidebarOpen: (newValue: boolean) => void };

const initialState: State = {
  isSidebarOpen: true
};

export const useGlobalStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...initialState,
      setIsSidebarOpen: (newValue) => {
        set({ isSidebarOpen: newValue });
      }
    }),
    {
      name: ZUSTAND_GLOBAL_STORE_KEY,
      storage: createJSONStorage(() => localStorage)
    }
  )
);
