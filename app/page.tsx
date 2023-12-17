import Image from 'next/image'
import styles from './page.module.css'
import Dashboard from './components/Dashboard'
import { sql } from '@vercel/postgres'


export default async function Home():Promise<JSX.Element>{
  console.log('postgres url : ', process.env.POSTGRES_URL as string)
  const users = await getUsers()
  return (
    <Dashboard users={users.data} />
  )
}

async function getUsers() {
  interface res  {
    data?: object,
    err?: string|object|unknown
  }
  const res: res = {
    data: {},
    err: ''
  }
  try {
    const { rows } = await sql`SELECT * FROM users;`;
    res.data = rows
  } catch(err) {
    res.err = err;
    return res
  }
  return res;
}
