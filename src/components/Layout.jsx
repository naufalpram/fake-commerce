import React, { useEffect, useMemo, useState } from 'react'
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { getJSONFromLocalStorage, removeLoginState } from '../helper/localStorageHandler';

const Layout = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState(getJSONFromLocalStorage('cart'));
  const navigate = useNavigate();

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

  const handleLogout = () => {
    removeLoginState();
    navigate('/signinup');
  }

  return (
    <div className='flex'>
    <Header isSticky={isSticky} handleOpen={handleOpen} handleLogout={handleLogout} totalQuantity={totalQuantity} />
    <Sidebar isOpen={isOpen} handleClose={handleOpen} cart={cart} setCart={setCart} />
    <Outlet context={[cart, setCart]} />
    </div>
  )
}

export default Layout;