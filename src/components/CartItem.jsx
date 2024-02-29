import React from 'react'
import { IoMdAdd, IoMdClose, IoMdRemove } from 'react-icons/io'

const CartItem = ({ itemData, handleIncrement, handleDecrement, handleRemove }) => {
  return (
    <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500">
        <div className="w-full min-h-[150px] flex items-center gap-x-4">
            <div>
            <img className="max-w-[80px]" src={itemData.image} alt="" />
            </div>
            <div className="w-full flex flex-col">
            <div className="flex justify-between mb-2">
                <div
                className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline"
                >
                {itemData.title}
                </div>
                <div
                className="text-xl cursor-pointer"
                >
                <IoMdClose 
                    className="text-gray-500 hover:text-red-500 transition" 
                    onClick={() => handleRemove(itemData.id)}
                />
                </div>
            </div>
            <div className="flex gap-x-2 h-[36px] text-sm">
                <div className="flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium">
                <div
                    className="h-full flex-1 flex justify-center items-center cursor-pointer"
                >
                    <IoMdRemove onClick={() => handleDecrement(itemData.id)} />
                </div>
                <div className="h-full flex justify-center items-center px-2">
                    {itemData.quantity}
                </div>
                <div
                    className="h-full flex flex-1 justify-center items-center cursor-pointer"
                >
                    <IoMdAdd onClick={() => handleIncrement(itemData.id)} />
                </div>
                </div>
                {/* item price */}
                <div className="flex flex-1 justify-around items-center">
                $ {itemData.price}
                </div>
                {/* final price */}
                <div className="flex flex-1 justify-end items-center text-primary font-medium">{`$ ${parseFloat(
                itemData.price * itemData.quantity,
                ).toFixed(2)}`}</div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default CartItem