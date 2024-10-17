import { create } from "zustand";

type Store = {
  trigger: number;
  inc: () => void;
};

export const useTrigger = create<Store>()((set) => ({
  trigger: 1,
  inc: () => set((state) => ({ trigger: state.trigger + 1 })),
}));
