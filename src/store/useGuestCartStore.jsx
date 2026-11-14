import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useGuestCartStore = create(
  persist(
    (set) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const exists = state.items.find((i) => i.productId === product.id)
          if (exists) {
            return {
              items: state.items.map((i) =>
                i.productId === product.id ? { ...i, count: i.count + 1 } : i,
              ),
            }
          }
          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                count: 1,
              },
            ],
          }
        }),

      updateQty: (productId, count) =>
        set((state) => ({
          items: state.items.map((i) => (i.productId === productId ? { ...i, count } : i)),
        })),

      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) })),

      clear: () => set({ items: [] }),
    }),
    { name: 'guest-cart' },
  ),
)

export default useGuestCartStore