import { ChangeEvent, useState } from "react"
import { Checkbox, FormControlLabel, TextField } from "@mui/material"

export default function Equipment() {
  const [needTransport, setNeedTransport] = useState<boolean>(true)
  return (
  <>
    <TextField
      sx={{my: 5}}
      id="fullname" 
      name="fullname" 
      variant="standard" 
      label="Full Name" 
      required 
      defaultValue={"test NAME"}  
       />
    <TextField 
      id="phone" 
      name="phone" 
      type="phone" 
      variant="standard" 
      label="Phone" 
      required 
     defaultValue={"111111111"}  
    />
    <FormControlLabel 
      control={
        <Checkbox 
          checked={needTransport}
          value={needTransport}
          name="need_transport" 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNeedTransport((e.target.checked)) } 
        />} 
      label="Need transport?" 
    />
    {
      needTransport && 
      <TextField 
        sx={{my:5}}
        label='Address'
        name="address"
        defaultValue={"test ADDRESS"}
      />
    }
    <TextField
      sx={{my: 5}}
      variant="outlined"
      fullWidth
      multiline
      minRows={10}
      label="Equipment"
      name="content" 
      id="equipment-content"
      placeholder="10 XL t-shirts"
      defaultValue="11 octopus"
      />
    <TextField
      variant="outlined"
      fullWidth
      multiline
      minRows={10}
      label="notes"
      name="notes" 
      id="equipment-notes"
      placeholder="Anything else you want to add?"
      />
    <input type="hidden" name="sql_action" id="sql_action" defaultValue="INSERT INTO"/>
  </>)
}