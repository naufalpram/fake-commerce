import React, { useState } from 'react';
import ProductCard from './ProductCard';

const Products = ({ products, totalPages, productsPerPage, addToCart }) => {
    const [page, setPage] = useState(1);


    const handlePageChange = (num) => {
        setPage(num);
    }

    const ProductShown = () => {
        const startIndex = (page - 1) * productsPerPage;
        const endIndex = page * productsPerPage;
        const shownProducts = products.slice(startIndex, endIndex);
        return shownProducts.map(item => (
            <ProductCard key={item.id} productData={item} addToCart={addToCart} />
        ))
    }

    return (
        <div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-screen-lg mx-auto'>
                <ProductShown /> 
            </div>
            <nav className="my-4">
                <ul className="flex justify-center">
                {Array.from({ length: totalPages }, (_, i) => (
                    <li key={i+1}>
                        <button
                            className={`mx-1 px-6 py-4 rounded shadow text-black ${(page === i+1) && 'text-white bg-black'} border-solid border border-black font-bold`}
                            onClick={() => handlePageChange(i + 1)}
                        >{
                            i + 1}
                        </button>
                    </li>
                ))}
                </ul>
            </nav>
        </div>
    )
    
  }

export default Products;