"use client"

import { useState, ChangeEvent } from 'react';
import { createQuery } from '../actions';
import Form from './Form'
import { inputsMapType } from '../types/intefaces';

export default function MainForm() {
  const [reqTable, setReqTable] = useState<keyof inputsMapType|string>('equipment');
  return (
    <div className="form-container">
      <form action={createQuery}>
        <select name="tableName" id="hamal-req-table" defaultValue={'equipment'} onChange={(event:React.ChangeEvent<HTMLSelectElement>) => setReqTable(event.target.value)}>
          <option value="" ></option>
          <option value="equipment">Equipment</option>
        </select>
        { 
          reqTable.length > 0  && <Form tableName={reqTable} />
        }
        <input type="submit" value="submit" />
      </form>
    </div>
  )
}