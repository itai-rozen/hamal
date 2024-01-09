import MainForm from "../components/MainForm";

export default function Page() {
  return <>
    <main>

      <h1>Hamal</h1>
      <h2>User ID: {`${'token'}`}</h2>

      <MainForm />
    </main>
  </>
}