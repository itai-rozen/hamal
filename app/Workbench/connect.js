"use server"
import { createPool } from "@vercel/postgres";
export default async function connectDb(q) {
    const client = createPool({connectionString: process.env.POSTGRES_URL});
    let res = {rows: [], err: ''};
    try {
      const { rows } = await client.query(q);
      res.rows = rows;
    } catch(err) {
      res.err = err;
    }
    await client.end()
    return JSON.stringify(res)
}