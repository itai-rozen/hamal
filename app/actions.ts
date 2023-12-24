import { sql } from '@vercel/postgres'

export async function createQuery(formData: FormData) {
  // console.log('form data: ', formData)
  console.log('form data keys: ',{...formData.keys()})
  console.log('form data values: ',{...formData.values()})
  for (const value in formData.values()) {
    console.log('value: ', value)
  }
  const tableName = formData.get('table-name');
  const query = `insert into ${tableName}`
  console.log('query: ', query)
}