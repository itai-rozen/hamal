import Image from 'next/image'
import styles from './page.module.css'
import Dashboard from './components/Dashboard'
import { getCookie, setCookie } from './actions'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'
import { userIdType } from './types/intefaces'
import { NextResponse } from 'next/server'
export default async function Home():Promise<JSX.Element>{
  const response: Response = await fetch('http://localhost:3000/api/setCookie');
  // console.log('response: ', response)
  const userId : RequestCookie  |undefined = await getCookie('hamal_user_id');
  console.log('user id: ', userId?.value)
  return (
    <Dashboard userId={userId?.value} />
  )
}

