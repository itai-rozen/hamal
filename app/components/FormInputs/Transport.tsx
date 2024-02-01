import { TextField } from "@mui/material";


export default function Transport() {
  return (<>
    <TextField
      sx={{ my: 5 }}
      id="fullname"
      name="fullname"
      variant="standard"
      label="Full Name"
      required
      defaultValue={"Transport test NAME"}
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
    <TextField
      sx={{ my: 5 }}
      label='Where from'
      name="address_from"
      defaultValue={"Transport ADDRESS from"}
    />
    <TextField
      sx={{ my: 5 }}
      label='Where to'
      name="address_to"
      defaultValue={"Transport ADDRESS to"}
    />
    <TextField
      sx={{ my: 5 }}
      variant="outlined"
      fullWidth
      multiline
      minRows={10}
      label="Load"
      name="content"
      id="transport-content"
      placeholder="3 soldiers"
      defaultValue="3 soldiers"
    />
    <TextField
      variant="outlined"
      fullWidth
      multiline
      minRows={10}
      label="notes"
      name="notes"
      id="transport-notes"
      placeholder="Anything else you want to add?"
    />
    <input type="hidden" name="sql_action" id="sql_action" defaultValue="INSERT INTO"/>
  </>)
}