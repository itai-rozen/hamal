"use client"

import Image from 'next/image'
import MainForm from './MainForm'
import styles from './page.module.css'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { ReactNode } from 'react'
import  { userIdType } from '../types/intefaces'

export default function Dashboard({userId}: any) {
  return (
    <main>
      <h1>Hamal</h1>
      <h2>User ID: </h2>
      {`${userId}`}
    <MainForm />
    </main>
  )
}
