import Link from "next/link"
const Nav = () => {
  return (
    <nav 
      className="bg-red-400 h-10 max-h-10 min-h-6 flex justify-between px-6 align-bottom items-center 
                   font-bold group
                   *: text-slate-200 *: text-[16px] *:transition-all">
        <Link className="hover:text-white   hover:transition-all hover:transition-in" href="/">Dashboard</Link>
        <Link className="hover:text-white   hover:transition-all hover:transition-in" href="/TableManager">Table Manager</Link>
        <Link className="hover:text-white   hover:transition-all hover:transition-in" href="/Workbench">Workbench</Link>
        <Link className="hover:text-white   hover:transition-all hover:transition-in" href="/Login">Login</Link>
    </nav>
  )
}

export default Nav;