'use client'

import { PayPalButtons } from "@paypal/react-paypal-js"
import clsx from "clsx"

export const PayPalButton = () => {
  return (
    <PayPalButtons />
    // <div className={
    //   clsx(
    //     "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
    //     {
    //       'bg-red-500': !order!.isPaid,
    //       'bg-green-700': order!.isPaid
    //     }
    //   )
    // }>
    //   <IoCardOutline size={30} />
    //   {/* <span className="mx-2">Pendiente de pago</span> */}
    //   {
    //     order!.isPaid
    //       ? <span className="mx-2">Pagada</span>
    //       : <span className="mx-2">Pendiente de pago</span>
    //   }
    // </div>
  )
}
