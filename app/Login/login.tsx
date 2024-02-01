"use client"
import Image from "next/image"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { connectDb } from "../actions"
import bcrypt from 'bcryptjs'
import { Button, Link, TextField, Typography } from "@mui/material"
import { handleSignin } from "../actions"

export default function Login() {
  const [isAccount, setIsAccount] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

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
    }
    else {
      setError('');
    }
  }

  return (
    <>
      <div className="w-[50vw] mx-auto my-5 space-y-5   
                      [&>div]:border-2  [&>div]:rounded-sm
                      [&_form>*]:mx-4 [&_.sign]:m-4 [&>section]:text-center [&>section]:my-1">

        <div className="flex flex-col items-center">

          <Button className="w-[100%]" onClick={() => signIn("google")}>
            <Image
              src='/google.svg'
              alt="google icon"
              width={50}
              height={30}
              priority={true}
            />
            <h2 className="mx-2">Sign in with google</h2>
          </Button>
        </div>

        <section>OR</section>
       {
        isAccount ? <div>
          <form className="flex flex-col  space-y-4 *:py-3 " action={handleSignin}>
            <Typography variant="h6" className="text-center">Sign in with email & password</Typography>
            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
            />
            <Button type="submit">Sign In</Button>
          </form>
          <Typography className="sign">dont have an account? <Link href="#" onClick={() => setIsAccount(false)}>sign up</Link></Typography>
             
        </div>
        : 
        <div>
          <form action={signUp} className="flex flex-col  space-y-4 *:py-3">
            <Typography variant="h6" className="text-center">Sign Up</Typography>
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
              // inputProps={{ pattern: "^(?=.*\d).{8,}$" }}
              inputProps={{ pattern: "(?=.*\d)(?=.*[a-zA-Z]).{8,}$" }}
              title="Must contain at least one number and one letter, and at least 8 or more characters"
            />
            <TextField
              id="signup_repassword"
              name="signup_repassword"
              type="password"
              label="Re-enter password"
              // inputProps={{ pattern: "^(?=.*\d).{8,}$" }}
              inputProps={{ pattern:"[a-z]" }}
              title="Must contain at least one number and one letter, and at least 8 or more characters"
            />
            <Button type="submit">Create an Account</Button>
          </form>
          <Typography className="sign">already have an account? <Link href="#" onClick={() => setIsAccount(true)}>sign in</Link></Typography>

        </div>
       } 
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>

    </>
  )
}