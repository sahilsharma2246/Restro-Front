import { create } from "zustand";

const useCartStore = create((set) => ({
  items: [],

  addItem: (food) =>
    set((state) => {
      const existing = state.items.find(
        (item) => item.food._id === food._id
      );

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.food._id === food._id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {
            food,
            quantity: 1,
          },
        ],
      };
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter(
        (item) => item.food._id !== id
      ),
    })),

  clear: () =>
    set({
      items: [],
    }),
}));

export default useCartStore;