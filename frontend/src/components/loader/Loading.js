import React from 'react'

const Loading = () => {
  return (
    <div className='w-full max-w-[100px] max-h-[30px] border-2 border-green-500 object-contain object-center !z-[500]'>
        <img src="/loader.gif" alt="loader" className='object-contain object-center'/>
    </div>
  )
}

export default Loading