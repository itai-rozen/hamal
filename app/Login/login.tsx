"use client"
import Image from "next/image"
import { signIn } from "next-auth/react"
export default function Login() {
  return (
    <>
    <button onClick={() => signIn("google")}>
      <h2>Login with google</h2>
      <Image 
       src='/google.svg'
       alt="google icon"
       width={100}
       height={50}
       priority={true}
       />
    </button>
    </>
  )
}