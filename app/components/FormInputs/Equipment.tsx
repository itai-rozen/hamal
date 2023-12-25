import { ChangeEvent, useState } from "react"

export default function Equipment() {
  const [needTransport, setNeedTransport] = useState<boolean>(true)
  return (
  <>
    <label htmlFor="fullname">Full Name:</label>
    <input id="fullname" name="fullname" type="text" required value="test NAME" />
    <label htmlFor="phone">Phone:</label>
    <input id="phone" name="phone" type="phone" required value="111111111" />
    <label htmlFor="need_transport">Need transport? :</label>
    <input type="checkbox" name="need_transport" id="need_transport" checked={needTransport} onChange={(e: ChangeEvent<HTMLInputElement>) => setNeedTransport((e.target.checked)) } value={`${needTransport}`} />
    {
      needTransport && <>
      <label htmlFor="address">Address: </label>
      <input type="text" id="address" name="address" value="test ADDRESS"  />
      </>
    }
    <label htmlFor="equipment-content">Equipment:</label>
    <textarea name="content" id="equipment-content" cols={30} rows={10} placeholder="10 XL t-shirts">
      11 sponges
    </textarea>
  </>)
}