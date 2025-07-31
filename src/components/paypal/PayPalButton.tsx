'use client'

import { paypalCheckPayment, setTransactionId } from "@/actions";
import { PayPalButtons, PayPalButtonsComponentProps, usePayPalScriptReducer } from "@paypal/react-paypal-js"


interface PayPalButtonProps {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ orderId, amount }: PayPalButtonProps) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = (Math.round(amount * 100) / 100).toFixed(2);

  if (isPending) {
    return (
      <div className="animate-pulse mb-16">
        <div className="h-11 bg-gray-300 rounded" />
        <div className="h-11 bg-gray-300 rounded mt-2" />
      </div>
    )
  }

  const createOrder: PayPalButtonsComponentProps["createOrder"] = async (data, actions) => {
    try {

      const transactionId = await actions.order.create({
        purchase_units: [
          {
            invoice_id: orderId,
            amount: {
              value: `${roundedAmount}`,
              currency_code: 'USD',
            }
          }
        ],
        intent: 'CAPTURE'
      })

      await setTransactionId(orderId, transactionId);

      return transactionId;
    } catch (error) {

      console.error(error);

      throw error;

    }
  };

  const onApprove: PayPalButtonsComponentProps["onApprove"] = async (data, actions) => {
    try {
      const details = await actions.order?.capture();
      if (!details) return;
      await paypalCheckPayment(details.id!)
    } catch (error) {
      console.error('Error capturing PayPal transaction:', error);
    }
  };

  return (
    <div className="relative z-0">

      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </div>
  )
}
