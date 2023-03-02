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
    <div className='bg-[#6CC1F4] flex items-center justify-around py-3 text-xl font-medium'>
      {
        tabs.map(tab => {
          const link = '/' + `${tab.link}`
          return(
            <div className="">
              <Link href={link}>
                {tab.name}
              </Link>
            </div>
          )
        })
      }
    </div>
  )
}

export default Navbar