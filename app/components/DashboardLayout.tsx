"use client"

import MainForm from './MainForm'
import { getSession, useSession } from 'next-auth/react'
import { getIdByMail } from '../actions';
import { ReactNode, useEffect, useState } from 'react';
import { Session } from 'next-auth';
import Nav from './Nav';
export default function DashboardLayout({ children } : {children: ReactNode}) {
  const [session, setSession] = useState<Session|null>(null)
  const [isManager, setIsManager] = useState<boolean>(false)
  const sessionSync = async () => {
    setSession(await getSession())
  }

  const managerSync = async () => {
    const manager = await getIdByMail(session?.user?.email);
    console.log('manager: ', manager)
    setIsManager(manager)
  }
  useEffect(() => {
    if (!session) {
      setIsManager(false);
      sessionSync();
    }
    if (session) {
      managerSync()
    }
  }, [session])
  return (
  <>
    <Nav session={session} isManager={isManager}/>
    {children}
  </>
  )
}
