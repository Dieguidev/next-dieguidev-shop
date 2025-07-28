"use server";

import { signIn } from "@/auth.config";
import { AuthError } from "next-auth";

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    console.log(formData);

    // await signIn('credentials', Object.fromEntries(formData));
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return "success";
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Credenciales inválidas. Por favor, verifica tu usuario y contraseña.";
        default:
          return "Algo salió mal.";
      }
    }
    throw error;
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al iniciar sesión. Por favor, intenta nuevamente.",
    };
  }
};
