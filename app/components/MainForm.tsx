"use client"

import { useState, ChangeEvent } from 'react';
import { createQuery } from '../actions';
import Form from './Form'
import { inputsMapType } from '../types/intefaces';
import { Select, MenuItem, Input, SelectChangeEvent } from '@mui/material';

export default function MainForm() {
  const [reqTable, setReqTable] = useState<keyof inputsMapType | string>('equipment');
  return (
        <form action={createQuery} 
            className='flex flex-col justify-between w-[80%] border px-4 py-8 rounded-sm mx-auto my-5 items-start h-[80%] shadow-sm
                        *:my-5 [&>input]:px-2 [&>input]:py-4 [&>label]:border-bottom'> 


          <Select 
            sx={{my: 5}}
            value='equipment' 
            name="tableName" 
            id="hamal-req-table"
            label="Subject"
            onChange={(event: SelectChangeEvent<string>) => setReqTable(event.target.value)}
            className='*:capitalize'
            >
              <MenuItem value=""></MenuItem>
              <MenuItem value="equipment">equipment</MenuItem>
              <MenuItem value="transport">transport</MenuItem>
          </Select>
          {/* <select  defaultValue={'equipment'} onChange={(event:React.ChangeEvent<HTMLSelectElement>) => setReqTable(event.target.value)}> */}
          {/* <option value="" ></option> */}
          {/* <option value="equipment">Equipment</option> */}


          {/* </select> */}
          {
            reqTable.length > 0 && <Form tableName={reqTable} />
          }

          <Input type='submit' value={'submit'} />
        </form>
  )
}