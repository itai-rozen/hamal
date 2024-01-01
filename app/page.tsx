import Dashboard from './components/Dashboard'
import { getCookie, setCookie } from './actions'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
export default async function Home():Promise<JSX.Element>{
  const userId : RequestCookie | undefined = await getCookie('hamal_user_id');
  console.log('user id: ', userId?.value)
  return (
    <Dashboard userId={userId?.value} />
  )
}

