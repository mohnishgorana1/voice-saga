'use client';

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { deleteCookie } from 'cookies-next';
import toast from 'react-hot-toast';

const LeftSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(null)
  const [username, setUsername] = useState("")

  const handleLogout = () => {
    // cookie
    deleteCookie('token')
    deleteCookie('user')

    // local storage
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    console.log("Logout Success");
    setIsLoggedIn(false)

    toast.success("Logout Success")
  }

  useEffect(() => {
    // find user
    const user = localStorage.getItem("user")
    if (user) {
      const currentUser = JSON.parse(user)
      setIsLoggedIn(true)
      setUsername(currentUser.name)
      setUserId(currentUser.id)
    }
  }, [])

  return (
    <section className=' text-white-1 '>
      <nav className="flex flex-col gap-6">
        <Link href="/" className="flex cursor-pointer items-center gap-1 pb-10 max-lg:justify-center">
          <Image src="/icons/logo.svg" alt="logo" width={23} height={27} />
          <h1 className="text-24 font-extrabold text-white max-lg:hidden">&nbsp;Voice Saga</h1>
        </Link>

        {sidebarLinks.map(({ route, label, imgURL }) => {
          const isActive = pathname === route || pathname.startsWith(`${route}/`);

          return <Link href={route} key={label} className={cn("flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start", {
            'bg-nav-focus border-r-4 border-orange-1': isActive
          })}>
            <Image src={imgURL} alt={label} width={24} height={24} />
            <p>{label}</p>
          </Link>
        })}
      </nav>

      <div className='mt-32'>
        {
          !isLoggedIn ?
            (
              <div className='flex flex-col items-center gap-5'>
                <Button className="text-16 w-full bg-orange-1 font-extrabold border-2 border-orange-1 hover:bg-transparent hover:border-2 hover:border-orange-1 hover:text-orange-1 duration-300">
                  <Link href="/sign-in">Login</Link>
                </Button>
                <Button className="text-16 w-full bg-orange-1 font-extrabold border-2 border-orange-1 hover:bg-transparent hover:border-2 hover:border-orange-1 hover:text-orange-1 duration-300">
                  <Link href="/sign-up">Register</Link>
                </Button>
              </div>
            )
            :
            (
              <Button className="text-16 w-full bg-orange-1 font-extrabold border-2 border-orange-1 hover:bg-transparent hover:border-2 hover:border-orange-1 hover:text-orange-1 duration-300" onClick={handleLogout}>
                Log Out
              </Button>
            )
        }



      </div>
    </section>
  )
}

export default LeftSidebar