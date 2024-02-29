import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useLocation, useOutletContext, useNavigate } from 'react-router-dom';
import { getIsLogin, getJSONFromLocalStorage, saveJSONToLocalStorage } from '../helper/localStorageHandler';
import Products from '../components/Products';
import Toast from '../components/Toast';

const Home = () => {
  const isLoggedIn = getIsLogin();
  const location = useLocation();
  const navigate = useNavigate();
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [products, setProducts] = useState(getJSONFromLocalStorage('products'));
  const [cart, setCart] = useOutletContext();
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 8;

  function duplicateArrayWithUniqueIds(array, repetitions) {
    const duplicatedProducts = [];
    for (let i = 0; i < repetitions; i++) {
      for (const product of array) {
        duplicatedProducts.push({ ...product, id: product.id + array.length * i });
      }
    }
    return duplicatedProducts;
  }
  
  useEffect(() => {
    const success = new URLSearchParams(location.search).get('success');
    const signup = new URLSearchParams(location.search).get('signup');
    if (success) {
      signup === 'true' ? handleToastUp('Sign up successful') : handleToastUp('Sign in successful');
      navigate(location.pathname, { replace: true });
    }
    
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('https://fakestoreapi.com/products')
            const fullProducts = duplicateArrayWithUniqueIds(data, 4);
            setProducts(fullProducts);
            saveJSONToLocalStorage('products', fullProducts);
            setTotalPages(fullProducts.length / productsPerPage);
        } catch(err) {
            console.log(err);
        }
    }
    fetchProducts();
  }, [])

  const addToCart = (product) => {
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

  const scrollToTarget = () => {
    const targetElement = document.getElementById('products');
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const handleToastUp = (message) => {
    setToastMessage(message);
    setToastSuccess(true);
    setTimeout(() => {
      setToastSuccess(false);
      setToastMessage('');
    }, 5000);
  }
  
  return !isLoggedIn ? <Navigate to='/signinup' replace /> : (
    <>
    {toastSuccess && toastMessage && <Toast success={toastSuccess} message={toastMessage} />}
    <div className="w-[100vw] relative">
        <section className="h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-20">
          <div className="container mx-auto flex justify-around h-full">
            <div className="flex flex-col justify-center">
              <div className="font-semibold flex items-center uppercase">
                <div className="w-10 h-[2px] mr-3 bg-cyan-700"></div>Hot Trend
              </div>
              <h1 className="uppercase text-[55px] md:text-[70px] leading-[1.1] font-semibold mb-4">
                Fresh Fashion Finds
                <br />
                <span className="font-light text-lg">new collection</span>
              </h1>
              <a
                className="self-start uppercase font-semibold border-b-2 border-primary text-2xl cursor-pointer"
                onClick={scrollToTarget}
              >
                Discover More
              </a>
            </div>
          </div>
        </section>
        <section id="products" className="pt-[8rem]">
          <div id='products' className="container mx-auto">
            <h1 className="text-3xl font-semibold mb-10 text-center">
              Explore Our Products
            </h1>
            <Products products={products} totalPages={totalPages} productsPerPage={productsPerPage} addToCart={addToCart} />
          </div>
        </section>
    </div>
    </>
  )
}

export default Home