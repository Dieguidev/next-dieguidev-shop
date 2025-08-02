import { Address } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: Address;

  setAddress: (address: Address) => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set) => ({
      address: {
        firstName: "",
        lastName: "",
        address: "",
        address2: "",
        postalCode: "",
        city: "",
        country: "",
        phone: "",
      },
      setAddress: (address: Address) => {
        set({ address });
      },
    }),
    {
      name: "address-storage",
    }
  )
);
