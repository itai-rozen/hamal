"use client"

import Image from 'next/image'
import MainForm from './MainForm'
import styles from './page.module.css'



export default function Dashboard({  users  }: any) {
  return (
    <main>
      <h1>Hamal</h1>
    <MainForm />
    {
      users.map((user: { user_id: number, password: string, email: string }) => {
        return <div key={user.user_id}>
            <div>{user.user_id}</div>
            <div>{user.password}</div>
            <div>{user.email}</div>
         </div>
      })
    }
    </main>
  )
}
