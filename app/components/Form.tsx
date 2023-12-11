import { ChangeEvent } from "react"

export default function Form({setUsername, setPassword}:{setUsername:Function, setPassword:Function}) {
  const showInputs = (e: React.SyntheticEvent) => {
    e.preventDefault()
    console.log(e.target)
  }
  return (
    <div className="form-container">
      <form onSubmit={showInputs}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" onChange={(e:React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}