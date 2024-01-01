"use client"

import Login from "./login";
import { useSession } from "next-auth/react";
import { Session  } from "next-auth";
import Logout from "./Logout";
// interface Props {
  // session: Session | null
// }
export default function Page() {
  const { data: session } = useSession();
  console.log('session: ', session)
  return (
    <>
    <Login />
    {session?.user && <Logout />}
    </>
  )
}