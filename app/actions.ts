"use server"
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
// import connectDb from './Workbench/connect'
import { cookies } from 'next/headers';
import { createPool, sql, db, QueryResultRow } from "@vercel/postgres";

export async function createQuery(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());

  const { sql_action : action, tableName }   = rawFormData;
  if (!action || !tableName) return;
  let query = `${action} ${tableName} `;
  const keys = []
  const values = []
  for (const key in rawFormData) {
    if (key.charAt(0) !== '$' && !['tableName', 'sql_action'].includes(key.trim())) {
      keys.push(key);
      values.push(rawFormData[key]);
    }
  }
  
  query += `(${[...keys]}) VALUES(${values.map(value => value === 'true' ? true : `'${value}'`)})`;
  console.log('q: ', query)
  const response = await connectDb(query)
  console.log('response: ', response)
}

export async function connectDb(q: string): Promise<string> {
    const client = createPool({connectionString: process.env.POSTGRES_URL});
    let res : { rows?: string[], err?: string|unknown } =  {rows: [], err: ''};
    try {
      const response = await client.query(q);
      console.log('response: ', response?.rows)
      const { rows } = response; 
      res.rows = rows;
    } catch(err) {
      console.log('err @connectDb: ', err)
      res.err = err;
    }
    await client.end()
    return JSON.stringify(res)
}

export async function getCookie(cookieName:string):Promise<RequestCookie|undefined> {
  return cookies().get(cookieName)
}

export async function setCookie(cookieName:string, value:string, expires: number) {
  cookies().set(cookieName, value, { maxAge: expires })
}

export async function getIdByMail(email: string|null|undefined) {
  console.log('invoked!')
  const { rows } =  JSON.parse(await connectDb(`
      SELECT manager_id, string_agg(table_name,',') as table_name
      FROM table_managers
      INNER JOIN hamal_users ON table_managers.manager_id=hamal_users.user_id
      WHERE email='${email}'
      GROUP BY manager_id
      `))
  if (rows.length > 0) {
    return rows[0].manager_id
  }
    return null;
}