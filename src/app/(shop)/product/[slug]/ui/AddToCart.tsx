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

  const addToCart = () => {
    console.log(size, quantity);

  }

  return (
    <>
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
