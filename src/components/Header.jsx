import React from 'react'
import { BsBag } from 'react-icons/bs'
import { CiLogout } from 'react-icons/ci'

const Header = ({ isSticky, handleOpen, handleLogout, totalQuantity }) => {
  return (
    <header
      className={
        `${isSticky ? 'bg-white py-4 shadow-md' : 'bg-none py-6'} fixed w-full z-10 lg:px-8 transition-all`
      }
    >
      <div className="container mx-auto flex items-center justify-between h-full my-4">
        <div>
          <div className="w-[40px]">
            <h1
              style={{ fontFamily: '"Satisfy", cursive', fontSize: "1.5rem", fontWeight: "bold"}}
            >
              Fakecommerce
            </h1>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="cursor-pointer flex relative" onClick={handleOpen}>
            <BsBag className="text-2xl" />
            <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
              {totalQuantity}
            </div>
          </div>
          <div className="cursor-pointer flex relative">
            <CiLogout className="text-3xl" onClick={handleLogout} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header