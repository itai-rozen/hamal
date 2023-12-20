const { db } = require("@vercel/postgres")

async function getQuery(client,q) {
  return await client.query(q);
}
async function runSql() {
  const client = await db.connect();
  await alterUsersTable(client);
  await client.end()
}

async function alterUsersTable(client) {
  try {
    let res = await getQuery(client, `SELECT * FROM users`)
    console.log('res: ', res)
  } catch(err) {
    console.log('err: ', err)
  }
}

runSql().catch(err => console.log('general error: ', err)) 
// ALTER TABLE table_name
// ALTER COLUMN column_name datatype;