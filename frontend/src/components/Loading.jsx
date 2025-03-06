import { LoaderPinwheelIcon } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='h-screen w-full flex justify-center items-center '>
      <LoaderPinwheelIcon className='w-10 h-10 animate-spin' />
    </div>
  )
}

export default Loading