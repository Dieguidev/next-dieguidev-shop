'use client'

import { SizeSelector, QuantitySelector } from "@/components"
import { CartProduct, Product, Size } from "@/interfaces"
import { useCartStore } from "@/store"
import { useState } from "react"

interface AddToCartProps {
  product: Product
}

export const AddToCart = ({ product }: AddToCartProps) => {

  const addProductToCart = useCartStore((state) => state.addProductToCart)

  const [size, setSize] = useState<Size | undefined>()
  const [quantity, setQuantity] = useState<number>(1)
  const [posted, setPosted] = useState(false)

  const addToCart = () => {
    setPosted(true)
    if (!size) return

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity,
      size,
      image: product.images[0]
    }

    addProductToCart(cartProduct)
    setPosted(false)
    setQuantity(1)
    setSize(undefined)

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
