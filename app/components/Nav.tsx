import Link from "next/link"
import { NextAuthProvider } from "./AuthProvider";
const Nav = () => {
  return <nav>
    <Link href="/">Dashboard</Link>
    <Link href="/Workbench">Workbench</Link>
    <Link href="/Login">Login</Link>

  </nav>
}

export default Nav;