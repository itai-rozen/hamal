import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDb } from "@/app/actions";
import bcrypt from 'bcryptjs'
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
        try {
          const { rows } =  JSON.parse(await connectDb(`SELECT * FROM users WHERE email='${credentials?.email}'`));
          if (rows.length) {
          const user : { email: string, password: string } = rows[0];
          const valid : Boolean = await bcrypt.compare(credentials?.password as string, user.password);
          console.log('valid: ', valid)
          return (valid) ? user : null
        } 
        else
          return null;
        } catch(err) {
          console.log('err @authorize: ', err)
        }
      }
    })
    // ...add more providers here
  ]
}
export default NextAuth(authOptions)