import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProviders from "next-auth/providers/google";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (user) {
          const isCorrectPassword = await bcrypt.compare(
            credentials?.password,
            user.password
          );
          if (isCorrectPassword) {
            return user;
          } else {
            return null;
          }
        }
        return null;
      },
    }),
    GoogleProviders({
      clientId: process.env.GG_CLIENT_ID!,
      clientSecret: process.env.GG_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        if (existingUser) {
          await prisma.account.upsert({
            where: {
              provider_providerAccountId: {
                provider: "google",
                providerAccountId: profile?.sub,
              },
            },
            update: {},
            create: {
              userId: existingUser.id,
              provider: "google",
              providerAccountId: profile?.sub,
              type: "oauth",
              access_token: account?.access_token,
              refresh_token: account?.refresh_token,
              expires_at: account?.expires_at,
              token_type: account?.token_type,
              scope: account?.scope,
              id_token: account?.id_token,
            },
          });
          return true;
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        if (session?.name) {
          token.name = session.name;
        }
        if (session?.image) {
          token.picture = session.image;
        }
      }

      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
      }

      return session;
    },
  },
};

const handle = NextAuth(authOptions);

export { handle as GET, handle as POST };
