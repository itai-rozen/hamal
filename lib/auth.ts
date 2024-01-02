import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";

interface Credentials extends Record<"email" | "password", string> {}

export const authOptions : NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'example@exampke.com'},
        password: { label: "Password", type: "password" }
      },
      /* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/
      // @ts-ignore
      async authorize(credentials) {
        console.log('credentials: ', credentials)
        const user : {email: string, password: string} = {email: '2@ee', password: '12345'};
        if (user) 
          return user;
        else
          return null;
      }
    })
    // ...add more providers here
  ]
}
export default NextAuth(authOptions)