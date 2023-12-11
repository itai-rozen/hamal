import Link from "next/link"
const Nav = () => {
  return <nav>
    <Link href="/login">Login</Link>
    <Link href="/">Dashboard</Link>
  </nav>
}

export default Nav;