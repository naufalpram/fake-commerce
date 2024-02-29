import React, { useEffect, useState } from 'react'
import { IoArrowBackCircle } from "react-icons/io5";
import { Navigate, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { getIsLogin, getJSONFromLocalStorage, saveJSONToLocalStorage } from '../helper/localStorageHandler';

const ProductDetail = () => {
  const isLoggedIn = getIsLogin();
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useOutletContext();

  useEffect(() => {
    const allProducts = getJSONFromLocalStorage('products');
    setProduct(allProducts.find(item => item.id == productId));
  }, [])

  const addToCart = () => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
        const updatedCart = cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
        setCart(updatedCart);
        saveJSONToLocalStorage('cart', updatedCart);
    } else {
        const updatedCart = [...cart, { ...product, quantity: 1 }];
        setCart(updatedCart);
        saveJSONToLocalStorage('cart', updatedCart);
    }
  }
  

  return !isLoggedIn ? <Navigate to='/signinup' replace /> : (
    <section className="pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32 max-h-screen flex flex-col items-center relative">
        <div className="w-[100vw] pl-20" onClick={() => navigate('..')}>
          <IoArrowBackCircle
            className="text-primary cursor-pointer"
            size={40}
          />
        </div>
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
              <img
                className="max-w-[200px] lg:max-w-xs"
                src={product.image}
                alt={`${product.title} image`}
              />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
                {product.title}
              </h1>
              <div className="text-2xl text-red-500 font-medium mb-6">
                $ {product.price}
              </div>
              <p className="mb-8">{product.description}</p>
              <button className="bg-primary py-4 px-8 text-white" onClick={addToCart}>
                Add to cart
              </button>
            </div>
          </div>
        </div>
    </section>
  )
}

export default ProductDetail