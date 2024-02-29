import React, { useEffect, useMemo, useState } from 'react'
import { BsBag } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { getJSONFromLocalStorage } from '../helper/localStorageHandler';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState(getJSONFromLocalStorage('cart'));
  

  const handleOpen = () => {
    setIsOpen(current => !current);
  }
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 64);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getTotalQuantity = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };
  const totalQuantity = useMemo(() => getTotalQuantity(), [cart]);

  return (
    <div className='flex'>
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
            <CiLogout className="text-3xl" />
          </div>
        </div>
      </div>
    </header>
    <Sidebar isOpen={isOpen} handleClose={handleOpen} cart={cart} setCart={setCart} />
    <Outlet context={[cart, setCart]} />
    </div>
  )
}

export default Header