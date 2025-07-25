'use client'

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts"
import { useEffect, useState } from "react";

interface StockLabelProps {
  slug: string;
}


export const StockLabel = ({ slug }: StockLabelProps) => {

  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getStock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStock = async () => {
    const inStock = await getStockBySlug(slug);

    setStock(inStock)
    setIsLoading(false);
  }
  return (
    <>
      {
        isLoading ? (
          <h1 className={`${titleFont.className} antialiased font-bold text-lg animate-pulse bg-gray-200`}>
            &nbsp;
          </h1>
        ) : (
          <h1 className={`${titleFont.className} antialiased font-bold text-lg`}>
            Stock: {stock}
          </h1>
        )
      }


    </>
  )

}




