import { create } from "zustand";

interface LoadingState {
  isLoading: boolean;
  isColdStarting: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  coldStartTimer: ReturnType<typeof setTimeout> | null; // Track the timer ID
}

const useLoadingStore = create<LoadingState>((set, get) => ({
  isLoading: false,
  isColdStarting: false,
  coldStartTimer: null,

  startLoading: () => {
    // 1. Clear any existing timer just in case
    const existingTimer = get().coldStartTimer;
    if (existingTimer) clearTimeout(existingTimer);

    // 2. Set the new timer
    const timer = setTimeout(() => {
      // If we are still loading after 3 seconds, set isColdStarting to true
      if (get().isLoading) {
        set({ isColdStarting: true });
      }
    }, 5000);

    set({ isLoading: true, isColdStarting: false, coldStartTimer: timer });
  },

  stopLoading: () => {
    // 3. Clean up the timer and reset states
    const timer = get().coldStartTimer;
    if (timer) clearTimeout(timer);

    set({ isLoading: false, isColdStarting: false, coldStartTimer: null });
  },
}));

export default useLoadingStore;
