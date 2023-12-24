"use client"
import connectDb  from './connect.js';
import './workbench.css'
import { ChangeEvent, useState } from 'react'
export default function Workbench({getQuery} : {getQuery: Function}): React.ReactNode {
  const [query, setQuery] = useState<string>('');
  const [rows, setRows] = useState<object[] | []>([]);
  const [error, setError] = useState<string>('');
  const handleQuery = async () => {
    try {
      const resText: string = await connectDb(query);
      const res:{rows:[], err: string } = JSON.parse(resText)
      if (res.rows?.length > 0) {
        console.log('rows" ',res.rows)
        setRows(res.rows)
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
      <textarea cols={100} rows={10} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setQuery(e.target.value)} ></textarea>
      <button className='sql-btn' onClick={handleQuery}>ok</button>
      {
        error && <h4>{JSON.stringify(error)}</h4>
      }
      <div className="sql-table">
      {
        rows.length > 0 && rows.map((row:{},i:number) => {
          return Object.entries(row).map(([key, value]) => {
            return <div className='sql-column' key={key+value+i}>
              <p>{key}</p>
              <p>{value as string}</p>
            </div>
          })
        })
      }
      </div>
    </>
  )
} 
