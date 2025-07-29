'use client'

import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import clsx from 'clsx';


export const PlaceOrder = () => {

  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  const address = useAddressStore(state => state.address)
  const { address: address1, city, country, firstName, lastName, phone, postalCode, address2, } = address;

  // ecitar conflicto para multiples render doc zustand
  const { itemsInCart, subtotal, taxes, total } = useCartStore(useShallow(state => state.getSummaryInformation()));

  const cart = useCartStore(state => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, [])

  const onPlaceHolder = async () => {
    setIsPlacingOrder(true)

    const productsToOrder = cart.map(product => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size
    }))

    console.log({ address, productsToOrder });

    setIsPlacingOrder(false)
  }

  if (!loaded) {
    return <p>Cargando...</p>
  }


  return (
    <div className="bg-white rounded-xl shadow-xl p-7">

      <h2 className="text-2xl font-bold mb-2">Dirección de entrega</h2>
      <div className="mb-10">
        <p className="text-xl">{firstName} {lastName}</p>
        <p>{address1}</p>
        <p>{address2}</p>
        <p>{postalCode}</p>
        <p>{city} {country}</p>
        <p>{phone}</p>
      </div>

      {/* Divider */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />



      <h2 className="text-2xl mb-2">Resumen de orden</h2>
      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">{itemsInCart === 1 ? "1 artículo" : `${itemsInCart} artículos`}</span>
        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subtotal)}</span>
        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(taxes)}</span>
        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
      </div>

      <div className="mt-5 mb-2 w-full">

        <p className="mb-5">
          <span className="text-xs">
            Al hacer clic en &quot;Colocar orden&quot;, aceptas nuestros <a href="#" className="underline">términos y condiciones</a> y <a href="#" className="underline">política de privacidad</a>.
          </span>
        </p>

        {/* <p className="text-red-500">Error de creació</p> */}

        <button
          onClick={onPlaceHolder}
          className={
            clsx({
              'btn-primary': !isPlacingOrder,
              'btn-disabled': isPlacingOrder,
            })
          }
        // href='/orders/123'
        >
          Colocar Orden
        </button>
      </div>
    </div>
  )
}
