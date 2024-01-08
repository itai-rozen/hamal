"use client"
import { useState, useEffect } from "react";
import { connectDb } from "../actions";
import { Accordion, AccordionSummary, AccordionDetails, Dialog, DialogTitle, DialogActions } from "@mui/material";
export default function TableManager() {
  const [equipmentData, setEquipmentData] = useState<[
    {
      id: number,
      fullname: string,
      notes: string,
      need_transport: boolean,
      status: string,
      date_created: string,
      phone: string,
      address: string | null
    }] | []>([]);
  const [deletedId, setDeletedId] = useState<number|null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

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

  const deleteRow = (id:number|null):void => {
    console.log('id: ', id)
    connectDb(`DELETE FROM equipment WHERE id=${id}`);
    setDeletedId(null);
    setModalOpen(false);
    fetchData();
  }

  const updateRow = (formData : FormData) => {
    const fullName = formData.get('fullName')
    const phone = formData.get('phone')
    const notes = formData.get('notes')
    const address = formData.get('address')
    const needTransport = formData.has('need_transport') + '';
    const status = formData.get('status')
    const query = `
    UPDATE equipment SET 
                          fullName='${fullName}', 
                              phone='${phone}', 
                              notes='${notes}',
                              need_transport=${needTransport},
                              address='${address}',
                              status='${status}',
                              date_modified=NOW() 
                            WHERE id=${formData.get('id')}`;    
    try {
      connectDb(query);
      fetchData();
    } catch(err) {
      console.log('error @updateRow: ', err)
    }

  }

  return (
    <>
      <h1>Table manager</h1>
      <div className="w-[90%] mx-auto *:flex *:justify-between *:align-left">
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
        <div className="flex-col">
        {
          equipmentData.length > 0 && equipmentData.map(row => {
            return <Accordion  className="w-[100%]">
                <AccordionSummary 
                  sx={{pointerEvents: 'none'}}
                  className="w-[100%]"
                  expandIcon = {
                    <p className="mx-3 pointer-events-auto">Update</p>
                  }>
                 <div key={row.id}  className="w-[100%] flex justify-between">
                    <p>{row.fullname}</p>
                    <p>{row.phone}</p>
                    <p>{row.need_transport ? 'yes' : 'no'}</p>
                    <p>{row.address}</p>
                    <p>{row.notes}</p>
                    <p>{row.status}</p>
                    <button className="pointer-events-auto" onClick={e => {
                      e.stopPropagation();
                      setModalOpen(true)
                      setDeletedId(row.id)
                    }}>Delete</button>
                  </div>
                </AccordionSummary>
                <AccordionDetails className="w-[100%] flex z-10 [&>form>input]:flex-0.5">
                  <form action={updateRow}>
                    <input type="hidden" name="id" defaultValue={row.id}  />
                    <input type="text" name="fullName" defaultValue={row.fullname} />
                    <input type="text" name="phone" defaultValue={row.phone} />
                    <input type="checkbox" name="needTransport" checked={row.need_transport} />
                    <input type="text" name="address" defaultValue={row.address ?? ''} />
                    <textarea className="flex-2" name="notes" cols={10} rows={1} value={row.notes}></textarea>
                    <select name="status"  defaultValue={row.status}> 
                      <option value="pending">pending</option>
                      <option value="viewed">viewed</option>
                      <option value="in progress">in progress</option>
                      <option value="completed">completed</option>
                      <option value="aborted">aborted</option>
                    </select>
                    <input type="submit" value="Save Changes" />
                  </form>
                </AccordionDetails>
              </Accordion>
          })
        }
        </div>
        <Dialog open={modalOpen as boolean && !!deletedId}>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogActions>
            <button onClick={() => deleteRow(deletedId as number|null)}>yes</button>
            <button onClick={() => setModalOpen(false)}>no</button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}