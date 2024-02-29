import React from 'react'

const Toast = ({ success = false, failed = false, message = '' }) => {
  return (
    <div className={`p-4 text-sm text-white fixed rounded-lg top-8 right-5 z-20
            ${success ? 'bg-[#22c55e] w-[148px]'
            : failed ? 'bg-[#ef4444] w-80'
            : ''}`
            }>
        {message}
    </div>
  )
}

export default Toast;