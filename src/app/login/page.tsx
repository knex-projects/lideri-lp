'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import backGround from "@/public/assets/images/loginBG.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";

// 1. Criando o Schema de Validação com Zod
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "O e-mail é obrigatório." })
    .email({ message: "Insira um e-mail válido." }),
  password: z
    .string()
    .min(1, { message: "A senha é obrigatoria" }),
});


type LoginFormData = z.infer<typeof loginSchema>;

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
    <div className="min-h-screen flex items-center justify-center bg-black bg-cover px-4" style={{ backgroundImage: `url(${backGround})` }}>
       
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-gray-100 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Painel Admin</h2>

       
        {loginError && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm font-medium rounded-lg text-left border border-red-200">
            {loginError}
          </div>
        )}

      
        <form onSubmit={handleSubmit(handleCredentialsLogin)} className="space-y-4 text-left mb-6">
          <div>
            <label className="text-sm font-medium text-gray-700">E-mail</label>
            <input
              type="email"
              {...register("email")}
              className={`mt-1 w-full p-2.5 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition ${
                errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300"
              }`}
              placeholder="seu-email@exemplo.com"
            />
            {/* Mensagem de erro do Zod para o E-mail */}
            {errors.email && (
              <span className="text-xs text-red-500 mt-1 block">{errors.email.message}</span>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              {...register("password")}
              className={`mt-1 w-full p-2.5 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition ${
                errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300"
              }`}
              placeholder="••••••••"
            />
            {/* Mensagem de erro do Zod para a Senha */}
            {errors.password && (
              <span className="text-xs text-red-500 mt-1 block">{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400"
          >
            {isSubmitting ? "Carregando..." : "Entrar com E-mail"}
          </button>
        </form>

        <div className="relative flex py-4 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-sm">ou</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Botão do Google */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/admin/editar" })}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 font-semibold py-2.5 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.96 1 12 1 7.35 1 3.4 3.65 1.5 7.5l3.6 2.8C6.01 6.84 8.78 5.04 12 5.04z"/>
            <path fill="#4285F4" d="M23.5 12.25c0-.82-.07-1.6-.2-2.35H12v4.46h6.46c-.28 1.48-1.12 2.74-2.38 3.58l3.68 2.85c2.14-1.98 3.38-4.9 3.38-8.54z"/>
            <path fill="#FBBC05" d="M5.1 14.7c-.24-.73-.38-1.5-.38-2.3s.14-1.57.38-2.3L1.5 7.3C.54 9.22 0 11.35 0 13.6s.54 4.38 1.5 6.3l3.6-2.9z"/>
            <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.9l-3.68-2.85c-1.02.68-2.33 1.1-4.28 1.1-3.22 0-6-1.8-6.9-4.76l-3.6 2.8C3.4 20.35 7.35 23 12 23z"/>
          </svg>
          Entrar com o Google
        </button>
      </div>
    </div>
  );
}