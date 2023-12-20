"use server"
import { createPool } from "@vercel/postgres";
export default async function connectDb(q) {
    const client = createPool({connectionString: process.env.POSTGRES_URL});
    let res = {};
    try {
      res.rows = await client.query(q);
      await client.end()
    } catch(err) {
      res.err = err;
    }
    return JSON.stringify(res)
}