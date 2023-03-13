import React from 'react'
import Link from 'next/link'

function Navbar() {
  const tabs = [
    {name: "Home", link :""},
    {name: "Characters" , link: "characters"},
    {name: "Episodes", link: "episodes"},
    {name: "Other"},
  ]
  return (
    <div className='bg-[#DBCDB6] flex items-center  justify-center text-center  text-xl font-medium w-full'>
      {
        tabs.map(tab => {
          const link = '/' + `${tab.link}`
          return(
              <Link href={link} className="hover:bg-sky-100 h-full py-3 px-20 duration-500">
                {tab.name}
              </Link>
          )
        })
      }
    </div>
  )
}

export default Navbar