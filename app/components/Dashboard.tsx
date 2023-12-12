"use client"

import Image from 'next/image'
import Form from './Form'
import styles from './page.module.css'
import { useState } from 'react'



export default function Dashboard() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // console.log('process env: ', process.env)
  return (
    <main>
      <h1>Hamal</h1>
    <Form 
    setUsername={setUsername}
    setPassword={setPassword}
    />
    <h4>{username}</h4>
    <h4>{password}</h4>
    </main>
  )
}
