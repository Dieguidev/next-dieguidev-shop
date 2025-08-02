'use client';

import { authenticate } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { IoInformationOutline } from "react-icons/io5";


export const LoginForm = () => {

  // const router = useRouter();
  const [errorMessage, formAction, isPending,] = useActionState(
    authenticate,
    undefined,
  );

  useEffect(() => {
    if (errorMessage === "success") {
      // router.replace('/')
      window.location.replace('/')
    }
  }, [errorMessage])



  return (
    <form action={formAction} className="flex flex-col">

      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email"
      />


      <label htmlFor="email">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password"
      />

      {errorMessage && (
        <div className="flex items-center mb-2 bg-yellow-50 border-l-4 border-yellow-400 p-2 rounded fade-in">
          <IoInformationOutline className="h-6 w-6 text-yellow-700 mr-2" />
          <p className="text-sm text-yellow-700 font-medium">{errorMessage}</p>
        </div>
      )}

      <button
        disabled={isPending}
        type="submit"
        className={clsx({
          "btn-primary": !isPending,
          'btn-secondary': isPending,
        })}>
        {!isPending ? 'Ingresar' : 'Cargando...'}
      </button>


      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/new-account"
        className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>

    </form>
  )
}
