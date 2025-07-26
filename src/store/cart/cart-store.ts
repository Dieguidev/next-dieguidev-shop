import { CartProduct } from "@/interfaces";
import { create } from "zustand";

interface State {
  cart: CartProduct[];
  addProductToCart: (product: CartProduct) => void;
}

export const useCartStore = create<State>()((set, get) => ({
  cart: [],
  addProductToCart: (product: CartProduct) => {
    const { cart } = get();
    //.1 Check if the product already exists in the cart
    const existingProductIndex = cart.some(
      (item) => item.id === product.id && item.size === product.size
    );

    if (!existingProductIndex) {
      set({ cart: [...cart, product] });
      return;
    }

    // If it exists, update the quantity
    const updatedCart = cart.map((item) => {
      if (item.id === product.id && item.size === product.size) {
        return { ...item, quantity: item.quantity + product.quantity };
      }
      return item;
    });
    set({ cart: updatedCart });
  },
}));
