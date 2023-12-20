"use client"
import connectDb  from './connect.js';
import { ChangeEvent, useState } from 'react'
export default function Workbench({getQuery} : {getQuery: Function}): React.ReactNode {
  const [query, setQuery] = useState<string>('');
  const [rows, setRows] = useState<object[]>([]);
  const [error, setError] = useState<string>('');
  const handleQuery = async () => {
    try {
      const resText: string = await connectDb(query);
      const res:{rows?:object[], err?: string } = JSON.parse(resText)
      console.log('res text: ', res)
      if (res.rows) {
        setRows(res.rows?.rows)
      }
      if (res.err) {
        setError(res.err)
      }
    } catch(err) {
      console.log('err @handleQuery: ', err)
    }
    
  }
  return (
    <>
      <h1>Workbench</h1>
      <input type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)} />
      <button onClick={handleQuery}>ok</button>
      {
        error && <h4>{JSON.stringify(error)}</h4>
      }
      {
        rows.length > 0 && rows.map(row => row?.user_id)
      }
    </>
  )
} 
