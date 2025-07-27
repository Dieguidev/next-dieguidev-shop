'use server';

import { signIn } from '@/auth.config';
import { AuthError } from 'next-auth';

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log(formData);

    // await signIn('credentials', Object.fromEntries(formData));
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Credenciales inválidas. Por favor, verifica tu usuario y contraseña.';
        default:
          return 'Algo salió mal.';
      }
    }
    throw error;
  }
}