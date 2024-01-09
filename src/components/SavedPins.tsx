import React from 'react'
import { BsFillPinFill } from "react-icons/bs"

type Props = {
    user: string;
}

const SavedPins = ({ user }: Props) => {
  return (
    <div className='flex justify-center items-center h-[12vh] text-sm'>  
      your saved pins 
      <span className='px-1'>
      <BsFillPinFill />
      </span>
      will appear here!
    </div>
  )
}

export default SavedPins