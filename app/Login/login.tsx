"use client"
import Image from "next/image"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { connectDb } from "../actions"
import  bcrypt from 'bcryptjs'

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [msg, setMsg] = useState<string>('');
  
  async function handleLogin() {
    signIn('google');
    await fetch('http://localhost:3000/api/setCookie', {
      method:'post'
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
    <div>OR</div>
    <form action={() => signIn('credentials', {
      redirect: false,
      email,
      password
    })}>
      <h2>Login with email & password</h2>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} />
      <input type="submit" value="Login" />
    </form>
    <div>OR</div>
    <form action={signUp}>
      <h2>Sign Up</h2>
      <input type="hidden" name="sql_action" id="sql_action" defaultValue="INSERT INTO"/>
      <input type="hidden" name="tableName" id="tableName" defaultValue="users"/>
      <label htmlFor="signup_email">Email</label>
      <input type="email" name="signup_email" id="signup_email" />
      <label htmlFor="signup_password">Password</label>
      <small>* Must contain at least one number and one letter, and at least 8 or more characters</small>
      <input 
        type="password" 
        name="signup_password" 
        id="signup_password"
        pattern="(?=.*\d)(?=.*[a-z]).{8,}"
        title="Must contain at least one number and one letter, and at least 8 or more characters" />
      <label htmlFor="signup_repassword">Re-enter Passowrd</label>
      <input type="password" name="signup_repassword" id="signup_repassword" />
      <input type="submit" value="Submit" />
    </form>
    {error && <p>{error}</p>}
    {msg && <p>{msg}</p>}
    </>
  )
}