import { Button } from './ui/button'
import { NavLink } from 'react-router'

function Navbar() {
  return (
    <nav className='py-5 border-b border-gray-700 md:py-0 flex md:flex-row gap-4 md:gap-0 flex-col md:h-14 justify-around items-center'>
      {/* brand */}
      <NavLink to={"/"}>
        <div className='font-semibold items-center flex gap-2'>
          <span className='inline-block h-6 w-6 text-center rounded-md bg-gradient-to-r from-primary to-primary/40'>
            {"AK"} 
          </span>
          <span className='text-base tracking-tight'>Auth App</span>
        </div>
      </NavLink>

      <div className='flex gap-4 items-center'>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/login"}>
          <Button size={'sm'} className='cursor-pointer' variant={"outline"}>Login
          </Button>
        </NavLink>
        <NavLink to={"/signup"}>
          <Button size={'sm'} className='cursor-pointer' variant={"outline"}>Sign Up</Button>
        </NavLink>
      </div>

    </nav>
  ) 
}

export default Navbar