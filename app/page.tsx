import Dashboard from './components/Dashboard'
import { cookies, headers } from 'next/headers'
import { setCookie } from './actions'
export default async function Home():Promise<JSX.Element> {
  // const userId : RequestCookie | undefined = await getCookie('hamal_user_id');
  if (cookies().has('next-auth.session-token'))
    console.log('has')
  else 
    console.log('NO')
  const allCookies = await fetch('http://localhost:3000/api/cookie/', {
      headers: headers()
    } 
  )
  console.log('all cookies: ', allCookies)
  // setCookie('manager_id', '1', 9999999999999999)
  return (
    <Dashboard cookies={JSON.stringify(allCookies)}  />
  )
}

