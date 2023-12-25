import connectDb from './Workbench/connect'
export async function createQuery(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  let query = `INSERT INTO ${rawFormData.tableName} `;
  delete rawFormData.tableName
  const keys = Object.keys(rawFormData)
  const values = Object.values(rawFormData)
  query += `(${[...keys]}) VALUES(${values.map(value => value === 'true' ? true : `'${value}'`)})`;
  console.log('q: ', query)
  const response = await connectDb(query)
  console.log('response: ', response)
}