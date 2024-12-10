import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Cart {
  id: string;
  userId: number;
  date: string;
  products: { productId: string; quantity: number; price: number }[] | [];
}

export type UserType = {
  token: string;
  userId: number;
};

type UserStore = {
  user: UserType | null;
  logIn: (user: UserType) => void;
  logOut: () => void;
};

export type CartStore = {
  cart: Cart | null;
  setCart: (cart: Cart) => void;
  addToCart: (item: Cart["products"][0]) => void;
  setItemQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: null,
      addToCart: (item) =>
        set((state) => ({
          ...state,
          cart: { ...get().cart!, products: [item, ...get().cart!.products] },
        })),
      setCart: (cart) => set((state) => ({ ...state, cart })),
      setItemQuantity: (productId, quantity) =>
        set((state) => ({
          ...state,
          cart: {
            ...get().cart!,
            products: get().cart!.products.map((v) => {
              if (v.productId == productId) {
                return { ...v, quantity };
              } else {
                return v;
              }
            }),
          },
        })),
      removeItem: (productId) =>
        set((state) => ({
          ...state,
          cart: {
            ...get().cart!,
            products: get().cart!.products.filter(
              (v) => v.productId != productId
            ),
          },
        })),
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      logIn: (user) =>
        set((state) => ({ ...state, user: (get()["user"] = user) })),
      logOut: () =>
        set((state) => ({ ...state, user: (get()["user"] = null) })),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }),
    }
  )
);
