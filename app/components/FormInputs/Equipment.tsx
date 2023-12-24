import { ChangeEvent, useState } from "react"

export default function Equipment() {
  const [needTransport, setNeedTransport] = useState<boolean>(false)
  return (
  <>
    <label htmlFor="fullname">Full Name:</label>
    <input id="fullname" name="fullname" type="text" required />
    <label htmlFor="phone">Phone:</label>
    <input id="phone" name="phone" type="phone" required />
    <label htmlFor="need_transport">Need transport? :</label>
    <input type="checkbox" name="need_transport" id="need_transport" onChange={(e: ChangeEvent<HTMLInputElement>) => setNeedTransport((e.target.checked)) } />
    {
      needTransport && <>
      <label htmlFor="address">Address: </label>
      <input type="text" id="address" name="address"  />
      </>
    }
    <label htmlFor="equipment-content">Equipment:</label>
    <textarea name="equipment-content" id="equipment-content" cols={30} rows={10} placeholder="10 XL t-shirts"></textarea>
  </>)
}