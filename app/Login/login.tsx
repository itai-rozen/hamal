"use client"
import Image from "next/image"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { connectDb } from "../actions"
import bcrypt from 'bcryptjs'
import { Button, TextField } from "@mui/material"

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [msg, setMsg] = useState<string>('');

  async function handleLogin() {
    signIn('google');
    await fetch('http://localhost:3000/api/setCookie', {
      method: 'post'
    })
  }

  async function signUp(formData: FormData) {
    const email = formData.get('signup_email')
    const password = formData.get('signup_password');
    const repassword = formData.get('signup_repassword');
    if (password !== repassword) {
      setError('password was not re-entered correctly')
      return;
    }
    const hashedPwd = bcrypt.hashSync(password as string, 10);
    const query = `INSERT INTO hamal_users (email, password) VALUES('${email}', '${hashedPwd}')`;
    const responseText = await connectDb(query);
    const { rows, err } = JSON.parse(responseText);
    console.log('response: ', rows, err);
    if (err) {
      setError(JSON.stringify(err));
      setMsg('');
    }
    else {
      setError('');
      setMsg('success!')
    }
  }
  return (
    <>
      <div className="w-[50vw] mx-auto my-5 *:form:border-black">

        <Button onClick={() => signIn("google")}>
          <Image
            src='/google.svg'
            alt="google icon"
            width={100}
            height={50}
            priority={true}
            />
            <h2>Login with google</h2>
        </Button>

        <div className="my-2 text-center">OR</div>
        
        <form className="flex flex-col  [&>div]:my-4 *:py-3 " action={() => signIn('credentials', {
          redirect: false,
          email,
          password
        })}>
          <h2>Login with email & password</h2>
          <TextField
            id="email"
            name="email"
            label="Email"
            onChange={e => setEmail(e.target.value)}
            type="email"
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
          <Button type="submit">Submit</Button>
        </form>
        <div className="my-2">OR</div>
        <form action={signUp} className="flex flex-col  [&>div]:my-4 *:py-3">
          <h2>Sign Up</h2>
          <TextField
            id="signup_email"
            name="signup_email"
            type="email"
            label="Email"
          />
          <small className="text-red-500">
           * password must contain at least one number and one letter, and at least 8 or more characters
          </small>
          <TextField
            id="signup_password"
            name="signup_password"
            type="password"
            label="Password"
            inputProps={{pattern: "(?=.*\d)(?=.*[a-z]).{8,}" }}
            title="Must contain at least one number and one letter, and at least 8 or more characters"
          />
                   <TextField
            id="signup_repassword"
            name="signup_repassword"
            type="password"
            label="Re-enter password"
            inputProps={{pattern: "(?=.*\d)(?=.*[a-z]).{8,}" }}
            title="Must contain at least one number and one letter, and at least 8 or more characters"
          />
          <Button type="submit">Submit</Button>
        </form>
        {error && <p>{error}</p>}
        {msg && <p>{msg}</p>}
      </div>

    </>
  )
}