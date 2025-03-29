import { create } from 'zustand'

export const useStore = create((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
  dec: () => set((state) => ({ count: state.count > 0 ? state.count - 1 : 0 })),
}))

export function Counter() {
  const { count, inc, dec } = useStore()
  return (
    <div className="flex flex-col items-center p-4 backdrop-blur border-2 border-black rounded-lg">
      <h2 className="text-white text-xl font-bold mb-2">Contador Global: {count}</h2>
      <div className="flex justify-center items-center">
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4"
          onClick={inc}
        >
          Incrementar
        </button>
        <button 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={dec}
        >
          Decrementar
        </button>
      </div>
    </div>
  )
}
