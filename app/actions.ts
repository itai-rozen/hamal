import { sql } from '@vercel/postgres'

export async function createQuery(formData: FormData) {
  console.log('form data: ', formData)
  console.log('detailed form data: ',[...formData.keys()])
}