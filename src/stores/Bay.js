import { create } from 'zustand'

export const useStore = create((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
  dec: () => set((state) => ({ count: state.count > 0 ? state.count - 1 : 0 })),
  rest: () => set({count: 0}),
}))
