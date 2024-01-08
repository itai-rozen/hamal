"use client"

import MainForm from './MainForm'
import { useSession } from 'next-auth/react'
import { getIdByMail } from '../actions';
import { useEffect, useState } from 'react';
export default function Dashboard({ cookies }:any) {
  console.log('cookies: ', JSON.parse(cookies))
  return (
    <main>

      <h1>Hamal</h1>
      <h2>User ID: {`${'token'}`}</h2>
      
    <MainForm />
    </main>
  )
}
