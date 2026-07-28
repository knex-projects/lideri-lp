import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const SESSION_MAX_AGE = 24 * 60 * 60;

export const authOptions: NextAuthOptions = {
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
          
          return { id: "1", name: "Admin", email: emailCorreto };
        }

  
        return null;
      }
    })
    ],

    pages: {
    signIn: "/login", 
  },
    callbacks: {
        async signIn({ user }) {
            const emailDoAdmin = "roseane.knex@gmail.com";

            if (user.email === emailDoAdmin) {
                return true; 
            }

            return false; 
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: "jwt",
      maxAge: SESSION_MAX_AGE,
    },
    jwt: {
      maxAge: SESSION_MAX_AGE,
    },
};
const handler = NextAuth(authOptions);


export { handler as GET, handler as POST };
