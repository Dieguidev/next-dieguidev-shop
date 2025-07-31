"use server";

import { PayPalOrderStatusResponse } from "@/interfaces";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (transactionId: string) => {
  const accessToken = await getPayPalBearerToken();
  if (!accessToken) {
    return {
      ok: false,
      message: "No se pudo obtener el token de acceso de PayPal",
    };
  }

  const transactionDetails = await verifyPayPalPayment(
    transactionId,
    accessToken
  );
  if (!transactionDetails) {
    return {
      ok: false,
      message: "No se pudo obtener los detalles de la transacción de PayPal",
    };
  }

  const { status, purchase_units } = transactionDetails;
  const { invoice_id: orderId } = purchase_units[0];

  if (status !== "COMPLETED") {
    return {
      ok: false,
      message: "La transacción no está completada",
    };
  }

  try {
    await prisma.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });

    // Revalidar path
    revalidatePath(`/orders/${orderId}`);

    return {
      ok: true,
    };
  } catch (error) {
    console.log("Error checking PayPal payment:", error);
    return {
      ok: false,
      message: "Error al verificar el pago de PayPal",
    };
  }
};

const getPayPalBearerToken = async (): Promise<string | null> => {
  const base64Token = Buffer.from(
    `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.NEXT_PAYPAL_SECRET}`
  ).toString("base64");

  try {
    const response = await fetch(`${process.env.NEXT_PAYPAL_OAUTH_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${base64Token}`,
      },
      cache: "no-store",
      body: "grant_type=client_credentials",
    });

    const data = await response.json();

    return data.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verifyPayPalPayment = async (
  transactionId: string,
  accessToken: string
): Promise<PayPalOrderStatusResponse | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PAYPAL_ORDERS_URL}/${transactionId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch transaction details");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
