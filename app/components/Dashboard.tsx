"use client"

import MainForm from './MainForm'
import {useState, useEffect } from 'react'
import { Props } from 'next/script'
import { connectDb } from '../actions'

export default function Dashboard({userId}: { userId:string|undefined }) {

  return (
    <main>
      <h1>Hamal</h1>
      <h2>User ID: {`${userId}`}</h2>
      
    <MainForm />
    </main>
  )
}
