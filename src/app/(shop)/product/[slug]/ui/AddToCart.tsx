'use client'

import { SizeSelector, QuantitySelector } from "@/components"
import { Product, Size } from "@/interfaces"
import { useState } from "react"

interface AddToCartProps {
  product: Product
}

export const AddToCart = ({ product }: AddToCartProps) => {

  const [size, setSize] = useState<Size | undefined>()

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
        quantity={1}
      />



      {/* Button */}
      <button className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  )
}
