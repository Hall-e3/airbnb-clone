import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import prisma from "@/app/libs/prismadb";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        // we check to see if the credentials were provided if not we return an error
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide credentials");
        }
        // if credentials were provided we find the user by email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        // if we do not find a user with the provided email and password we return an error
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }
        // this function returns true if our provided password is the same as that one the user create the account with

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }
        return user;
      },
    }),
  ],
  pages: {
    // whenever an error occurs we redirect to the home page
    signIn: "/",
  },
  //   if it's true, it helps to see in terminal during development
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};


export default NextAuth(authOptions);
