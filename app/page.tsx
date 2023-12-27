import Image from 'next/image'
import styles from './page.module.css'
import Dashboard from './components/Dashboard'
import { getCookie, setCookie } from './actions'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'
import { userIdType } from './types/intefaces'
export default async function Home():Promise<JSX.Element>{
  await fetch('http://localhost:3000/setCookie')
  const userId = await getCookie('hamal_user_id');

  return (
    <Dashboard userId={userId} />
  )
}

