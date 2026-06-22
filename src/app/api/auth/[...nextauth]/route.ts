import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { BlogUser } from "@/src/app/types/user";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" }
      },
      async authorize(credentials) {
        
        const emailCorreto = process.env.ADMIN_EMAIL;
        const senhaCorreta = process.env.ADMIN_PASSWORD;

        if (
          credentials?.email === emailCorreto &&
          credentials?.password === senhaCorreta
        ) {
          // Se estiver tudo certo, retorna um objeto de usuário para criar a sessão
          return { id: "1", name: "Admin", email: emailCorreto };
        }

  
        return null;
      }
    })
    ],
    callbacks: {
        async signIn({ user }:{user:BlogUser|any}) {
            const emailDoAdmin = "roseane.knex@gmail.com";

            if (user.email === emailDoAdmin) {
                return true; 
            }

            return false; 
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);


export { handler as GET, handler as POST };