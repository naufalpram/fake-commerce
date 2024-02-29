import React, { useMemo } from 'react'
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import CartItem from './CartItem';
import { removeFromLocalStorage, saveJSONToLocalStorage } from '../helper/localStorageHandler';

const Sidebar = ({ isOpen, handleClose, cart, setCart }) => {
  
  const removeItemFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    saveJSONToLocalStorage('cart', updatedCart);
  };

  const incrementQuantity = (productId) => {
    const updatedCart = cart.map((item) => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item);
    setCart(updatedCart);
    saveJSONToLocalStorage('cart', updatedCart);
  };

  const decrementQuantity = (productId) => {
    const decrement = () => {
        const updatedCart = cart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
        );
        
        // Ensure at least one item remains in the cart after decrementing
        return updatedCart.filter((item) => item.quantity > 0);
    }
    const updatedCart = decrement();
    setCart(updatedCart);
    saveJSONToLocalStorage('cart', updatedCart);
  };

  
  const calculateSubtotal = () => {
    if (!cart || cart.length === 0) {
        return 0;
    }
    return cart.reduce((acc, item) =>  acc + item.price * item.quantity, 0);
  }
    // subtotal price of products in cart
  const subTotal = useMemo(() => calculateSubtotal(), [cart]);
    
  const handleClearCart = () => {
    setCart([]);
    removeFromLocalStorage('cart');
  }
  
  const handleCheckout = () => {
    alert(`Thank you for buying, your total is ${subTotal}`);
    handleClearCart();
  }

  return (
    <div
        className={
          `${isOpen ? 'right-0' : '-right-full'} w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] lg:w-[40vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`
        }
      >
        <div className="flex items-center justify-between py-6 border-b">
          <div className="cursor-pointer w-8 h-8 flex justify-center items-center" onClick={handleClose}>
            <IoMdArrowForward className="text-2xl" />
          </div>
        </div>
        <div className="flex flex-col gap-y-2 h-[360px] md:h-[480px] lg:h-[420px] overflow-y-auto overflow-x-hidden border-b">
          {cart.map(item => 
            <CartItem
                key={item.id}
                itemData={item}
                handleIncrement={incrementQuantity}
                handleDecrement={decrementQuantity}
                handleRemove={removeItemFromCart}
            />
          )}
        </div>
        <div className="flex flex-col gap-y-3  mt-4">
          <div className="flex w-full justify-between items-center">
            <div className="font-semibold">
              <span className="mr-2">Subtotal:</span> $ {parseFloat(subTotal).toFixed(2)}
            </div>
            <div className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl">
              <FiTrash2 onClick={handleClearCart} />
            </div>
          </div>
          <button className="bg-primary flex p-3 justify-center items-center text-white w-full font-medium" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
  )
}

export default Sidebar