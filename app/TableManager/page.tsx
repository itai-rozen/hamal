"use client"
import { useState, useEffect } from "react";
import { connectDb } from "../actions";
export default function TableManager() {
  const [equipmentData, setEquipmentData] = useState<[
    {
      id: number,
      fullname: string,
      notes: string,
      needTransport: boolean,
      status: string,
      date_created: string,
      phone: string,
      address: string | null
    }] | []>([]);
  const [tableHeaders, setTableHeaders] = useState<string[]>([])

  const fetchData = async () => {
    const resText: string = await connectDb('SELECT * FROM equipment ORDER BY date_created')
    const res: { rows: [], err: string } = await JSON.parse(resText);
    console.log('res: ', res)
    if (res.rows.length > 0) {
      setEquipmentData(res?.rows);

      console.log('data set!: ')
      console.log('equipment: ', equipmentData)
    }
  }
  useEffect(() => {
    try {
      fetchData();
    } catch (err) {
      console.log(err)
    }
  }, [])

  const deleteRow = (id:Number):void => {
    connectDb(`DELETE FROM equipment WHERE id=${id}`);
    fetchData();
  }

  return (
    <>
      <h1>Table manager</h1>
      <div className="w-[80%] mx-auto *:flex *:justify-between *:align-left">
        <div className="table-headers">
          <p className="table-header">Full Name</p>
          <p className="table-header">Phone</p>
          <p className="table-header">Need transport</p>
          <p className="table-header">Address</p>
          <p className="table-header">notes</p>
          <p className="table-header">status</p>
          <p className="table-header"></p>
          <p className="table-header"></p>
        </div>
        {
          equipmentData.length && equipmentData.map(row => {
            return <div key={row.id}  >
              <p>{row.fullname}</p>
              <p>{row.phone}</p>
              <p>{row.needTransport ? 'yes' : 'no'}</p>
              <p>{row.address}</p>
              <p>{row.notes}</p>
              <p>{row.status}</p>
              <button>Update</button>
              <button onClick={() => deleteRow(row.id)}>Delete</button>
            </div>
          })
        }
      </div>
    </>
  )
}