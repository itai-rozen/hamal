"use server"
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import connectDb from './Workbench/connect'
import { cookies } from 'next/headers';
export async function createQuery(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  console.log('formdata: ', rawFormData.sql_action)
  const action      = rawFormData.sql_action;
  let query = `${action} ${rawFormData.tableName} `;
  delete rawFormData.tableName;
  delete rawFormData.sql_action;
  const keys = Object.keys(rawFormData)
  const values = Object.values(rawFormData)
  query += `(${[...keys]}) VALUES(${values.map(value => value === 'true' ? true : `'${value}'`)})`;
  console.log('q: ', query)
  const response = await connectDb(query)
  console.log('response: ', response)
}

export async function getCookie(cookieName:string):Promise<RequestCookie|undefined> {
  return cookies().get(cookieName)
}

export async function setCookie(cookieName:string, value:string, expires: number) {
  "use server"
  cookies().set(cookieName, value, { expires })
}
