"use client"

import { useState, ChangeEvent } from 'react';
import { createQuery } from '../actions';
import Form from './Form'

export default function MainForm() {
  const [reqTable, setReqTable] = useState<string>('');
  return (
    <div className="form-container">
      <form action={createQuery}>
        <select name="hamal-req-table" id="hamal-req-table" onChange={(event:React.ChangeEvent<HTMLSelectElement>) => setReqTable(event.target.value)}>
          <option value="" selected></option>
          <option value="equipment">Equipment</option>
        </select>
        { 
          reqTable.length > 0  && <Form tableName={reqTable} />
        }
      </form>
    </div>
  )
}