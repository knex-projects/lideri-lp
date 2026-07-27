'use client';

import type { LoginFormData } from '@/src/types';
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { logoLideri1 } from "@/public/assets"
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { Mail } from "lucide-react";



const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "O e-mail é obrigatório." })
    .email({ message: "Insira um e-mail válido." }),
  password: z
    .string()
    .min(1, { message: "A senha é obrigatoria" }),
});




export default function PaginaLogin() {
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleCredentialsLogin = async (data: LoginFormData) => {
    setLoginError(null);

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: "/admin",
    });

    if (result?.error) {
      setLoginError("E-mail ou senha incorretos.");
    } else if (result?.url) {
      window.location.href = result.url;
    }
  };

  return (
    <div className="min-h-screen flex items-center pt-29 justify-center bg-loginImage bg-black bg-cover px-4" >

      <div className="max-w-185 min-h-180.75 w-full bg-white flex flex-col justify-between pt-24  pb-5 rounded-[0.5rem] shadow-lg px-10 sm:px-16 border border-N8 text-center">
        <div className=" flex justify-center items-center ">
          <div className="invert  relative flex justify-center w-full h-24  sm:w-70 sm:h-27 ">
            <Image
              src={logoLideri1}
              fill
              alt="logo"
              className=" object-contain"
            />
          </div>
        </div>



        {loginError && (
          <div className=" bg-red-50 text-red-600 text-sm font-medium rounded-lg text-left border border-red-200">
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit(handleCredentialsLogin)} className="space-y-4 text-left mb-6">
          <div className=" relative w-full">
            <label className="text-[1.5rem] font-normal text-N9">login</label>
            <div className="relative mt-1">

              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail
                  className={`h-5 w-5 ${errors.email ? "text-red-500" : "text-N5"}`}
                />
              </div>

              <input
                type="email"
                {...register("email")}
                className={`w-full p-2.5  h-12 pl-10 border border-N5 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition ${errors.email ? "border-red-500 focus:ring-red-500" : "border-N5"
                  }`}
                placeholder="seu-email@exemplo.com"
              />
            </div>
          </div>
          <div>
            <label className="text-[1.5rem] font-normal text-N9">Senha</label>
            <input
              type="password"
              {...register("password")}
              className={`mt-1 w-full h-12 p-2.5 text-N5 border border-N5 rounded-lg focus:ring-R5 focus:border-R5 transition ${errors.password ? "border-red-500 focus:ring-red-500" : "border-N5"
                }`}
              placeholder="••••••••"
            />

            {errors.password && (
              <span className="text-xs text-red-500 mt-1 block">{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 text-24 md:h-17 bg-R5 text-N1 md:text-[1.5rem] font-semibold mt-10 rounded-lg hover:bg-R8 transition "
          >
            {isSubmitting ? "Carregando..." : "Logar"}
          </button>
        </form>

        <div className="relative flex  items-center">
          <div className="flex-grow border-t border-N5"></div>
          <span className="flex-shrink mx-4  text-N5 text-md">ou</span>
          <div className="flex-grow border-t border-N5"></div>
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full flex items-center justify-center gap-3 bg-white text-N9 font-semibold py-2.5 border border-N5 rounded-lg shadow-sm hover:bg-gray-50 transition"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.96 1 12 1 7.35 1 3.4 3.65 1.5 7.5l3.6 2.8C6.01 6.84 8.78 5.04 12 5.04z" />
            <path fill="#4285F4" d="M23.5 12.25c0-.82-.07-1.6-.2-2.35H12v4.46h6.46c-.28 1.48-1.12 2.74-2.38 3.58l3.68 2.85c2.14-1.98 3.38-4.9 3.38-8.54z" />
            <path fill="#FBBC05" d="M5.1 14.7c-.24-.73-.38-1.5-.38-2.3s.14-1.57.38-2.3L1.5 7.3C.54 9.22 0 11.35 0 13.6s.54 4.38 1.5 6.3l3.6-2.9z" />
            <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.9l-3.68-2.85c-1.02.68-2.33 1.1-4.28 1.1-3.22 0-6-1.8-6.9-4.76l-3.6 2.8C3.4 20.35 7.35 23 12 23z" />
          </svg>
          Entrar com o Google
        </button>
      </div>
    </div>
  );
}