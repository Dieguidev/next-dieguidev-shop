'use client';
import { useCartStore } from "@/store";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";


export const OrderSummary = () => {

  // ecitar conflicto para multiples render doc zustand
  const { itemsInCart, subtotal, taxes, total } = useCartStore(useShallow(state => state.getSummaryInformation()));

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [])


  if (!loaded) {
    return <p>Loading...</p>
  }


  return (
    <div className="grid grid-cols-2">
      <span>No. Productos</span>
      <span className="text-right">{itemsInCart === 1 ? "1 artículo" : `${itemsInCart} artículos`}</span>
      <span>Subtotal</span>
      <span className="text-right">${subtotal}</span>
      <span>Impuestos (15%)</span>
      <span className="text-right">${taxes}</span>
      <span className="mt-5 text-2xl">Total:</span>
      <span className="mt-5 text-2xl text-right">${total}</span>
    </div>
  )
}
