'use client'

import { SizeSelector, QuantitySelector } from "@/components"
import { Product, Size } from "@/interfaces"
import { useState } from "react"

interface AddToCartProps {
  product: Product
}

export const AddToCart = ({ product }: AddToCartProps) => {

  const [size, setSize] = useState<Size | undefined>()
  const [quantity, setQuantity] = useState<number>(1)
  const [posted, setPosted] = useState(false)

  const addToCart = () => {
    setPosted(true)
    if (!size) return
    console.log(size, quantity);

  }

  return (
    <>

      {
        posted && !size && (
          <span className="mt-2 text-red-500">
            Debe de seleccionar una talla para agregar al carrito
          </span>
        )
      }


      {/* Selector de Tallas */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />

      {/* Selector de Cantidad */}
      <QuantitySelector
        quantity={quantity}
        onQuantityChanged={setQuantity}
      />



      {/* Button */}
      <button
        onClick={addToCart}
        className="btn-primary my-5"
      >
        Agregar al carrito
      </button>
    </>
  )
}
