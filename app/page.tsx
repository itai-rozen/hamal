import Page from './Dashboard/page'
import DashboardLayout from './components/DashboardLayout'
export default async function Home():Promise<JSX.Element> {
  // const userId : RequestCookie | undefined = await getCookie('hamal_user_id');

  // setCookie('manager_id', '1', 9999999999999999)
  return (
    <DashboardLayout>
      <Page />
    </DashboardLayout>
  )
}

