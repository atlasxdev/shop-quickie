import { create } from "zustand";

export interface User {
  address: Address;
  id: number;
  email: string;
  username: string;
  password: string;
  name: Name;
  phone: string;
}

export interface Address {
  geolocation: Geolocation;
  city: string;
  street: string;
  number: number;
  zipcode: string;
}

export interface Geolocation {
  lat: string;
  long: string;
}

export interface Name {
  firstname: string;
  lastname: string;
}

export interface Cart {
  id: number | null;
  userId: number | null;
  date: string;
  products: { productId: string; quantity: number }[] | [];
}

type UserStore = {
  user: string | null;
  logIn: (user: string) => void;
  logOut: () => void;
};

export type CartStore = {
  cart: [] | Cart[];
  updateCart: (cart: Cart[]) => void;
  getInDateRange: () => void;
  addToCart: (item: { productId: string; quantity: number }) => void;
  deleteCart: (id: number) => void;
};

export const useCartStore = create<CartStore>()((set) => ({
  cart: [],
  updateCart: (cart) => set({ cart }),
  getInDateRange: () =>
    set((state) => ({
      cart: state.cart.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      ),
    })),
  addToCart: (item) =>
    set((state) => {
      const cart = state.cart;
      const updateCart = cart.filter((items) => {
        const updatedProducts = items.products.filter(
          ({ productId }) => productId != item.productId
        );

        return [{ ...state, cart: [{ ...items, products: updatedProducts }] }];
      });
      localStorage.setItem("cart", JSON.stringify(updateCart));
      return { ...state, cart };
    }),
  deleteCart: (id) =>
    set((state) => ({ cart: state.cart.filter((v) => v.id != id) })),
}));

export const useUserStore = create<UserStore>()((set) => ({
  user: null,
  logIn: (user) => set({ user }),

  logOut: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
