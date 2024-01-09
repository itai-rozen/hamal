"use client"

import Login from "./login";
import { useSession } from "next-auth/react";
import Logout from "./Logout";
import DashboardLayout from "../components/DashboardLayout";
// interface Props {
  // session: Session | null
// }
export default function Page() {
  const { data: session} = useSession();
  console.log('session: ', session)
  return (
    <DashboardLayout>
    <Login />
    {session?.user && <Logout />}
    </DashboardLayout>
  )
}