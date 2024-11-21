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
  id: number | string;
  userId: number;
  date: string;
  products: { productId: string; quantity: number; price: number }[] | [];
}

type UserStore = {
  user: string | null;
  logIn: (user: string) => void;
  logOut: () => void;
};

export type CartStore = {
  cart: null | Cart[];
  updateCart: (cart: Cart[]) => void;
  getInDateRange: () => void;
  addToCart: (item: Cart) => void;
  removeItem: (productId: number) => void;
};

export const useCartStore = create<CartStore>()((set) => ({
  cart: null,
  updateCart: (cart) => set({ cart }),
  getInDateRange: () =>
    set((state) =>
      state.cart != null
        ? {
            cart: state.cart.sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            ),
          }
        : state
    ),
  addToCart: (item) =>
    set((state) => ({ ...state, cart: [{ ...item, ...state.cart }] })),
  removeItem: (id) =>
    set((state) =>
      state.cart != null
        ? { cart: state.cart.filter((v) => v.id != id) }
        : state
    ),
}));

export const useUserStore = create<UserStore>()((set) => ({
  user: null,
  logIn: (user) => set({ user }),

  logOut: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
