import Image from 'next/image'
import styles from './page.module.css'
import Dashboard from './components/Dashboard'
import { createPool, sql } from '@vercel/postgres'


export default async function Home() {
  console.log('postgres url: ', process.env.POSTGRES_DATABASE)
  // const pool = createPool({
    // connectionString: "postgres://default:e8ymAJvNZ6fV@ep-floral-wildflower-50745834-pooler.eu-central-1.postgres.vercel-storage.com:5432/verceldb"
  // });
  // console.log('pool: ', pool)
  try {
    const rows = await sql`SELECT * FROM users;`;
    console.log('roes: ', rows)
  } catch(err) {
    console.log('err sql connection: ')
  }
  return (
    <Dashboard />
  )
}
