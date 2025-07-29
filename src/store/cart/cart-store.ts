import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  addProductToCart: (product: CartProduct) => void;
  getTotalItems: () => number;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProductFromCart: (product: CartProduct) => void;
  getSummaryInformation: () => {
    itemsInCart: number;
    subtotal: number;
    taxes: number;
    total: number;
  };
}

export const useCartStore = create<State>()(
  // Using Zustand's persist middleware to store cart data in local storage
  // This allows the cart to persist across page reloads
  persist(
    (set, get) => ({
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
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();
        const updatedCart = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity };
          }
          return item;
        });
        set({ cart: updatedCart });
      },
      removeProductFromCart: (product: CartProduct) => {
        const { cart } = get();
        const updatedCart = cart.filter(
          (item) => !(item.id === product.id && item.size === product.size)
        );
        set({ cart: updatedCart });
      },
      getSummaryInformation: () => {
        const { cart } = get();
        const subtotal = cart.reduce(
          (subtotal, product) => product.quantity * product.price + subtotal,
          0
        );
        const taxes = subtotal * 0.15; // Assuming a tax rate of 15%
        const total = subtotal + taxes;
        const itemsInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );

        return {
          itemsInCart,
          subtotal,
          taxes,
          total,
        };
      },
    }),
    {
      name: "shopping-cart",
    }
  )
);
