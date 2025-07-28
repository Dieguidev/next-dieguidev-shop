'use client';

import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import clsx from 'clsx';
import { registerUser } from "@/actions";
import { useState } from "react";

type FormInputs = {
  name: string;
  email: string;
  password: string;
}

export const RegisterForm = () => {

  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<FormInputs>()

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('')
    const { name, email, password } = data;
    const resp = await registerUser(name, email, password);

    if (!resp.ok) {
      setErrorMessage(resp.message);
      return
    }

    console.log(resp);

  }



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

      {/* {
        errors.name?.type === 'required' && (
          <span className="text-red-500">* El nombre es obligatorio</span>
        )
      } */}

      <label htmlFor="name">Nombre completo</label>
      <input
        className={
          clsx(
            "px-5 py-2  bg-gray-200 rounded mb-5",
            {
              "border-red-500 border-2": errors.name,
            }
          )
        }
        type="text"
        autoFocus
        {...register("name", { required: true })}
      />

      <label htmlFor="email">Correo electrónico</label>
      <input
        className={
          clsx(
            "px-5 py-2  bg-gray-200 rounded mb-5",
            {
              "border-red-500 border-2": errors.email,
            }
          )
        }
        type="email"
        {...register("email", { required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i })}
      />


      <label htmlFor="email">Contraseña</label>
      <input
        className={
          clsx(
            "px-5 py-2  bg-gray-200 rounded mb-5",
            {
              "border-red-500 border-2": errors.name,
            }
          )
        }
        type="password"
        {...register("password", { required: true, minLength: 6 })}
      />

      <span className="text-red-500">{errorMessage}</span>

      <button

        className="btn-primary">
        Crear Cuenta
      </button>


      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/login"
        className="btn-secondary text-center">
        Ingresar
      </Link>

    </form>
  )
}
