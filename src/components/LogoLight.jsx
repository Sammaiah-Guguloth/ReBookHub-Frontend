import React from 'react'
import { IoCubeSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

const LogoLight = () => {
  return (
    <Link to={"/"} className='text-center animate-slideLeft'>
        <div className='flex gap-1 md:gap-3 items-center'>
          <IoCubeSharp fontSize={"20px"} />
          <h1 className='font-semibold text-lg md:text-2xl font-heading'>ReBook Hub</h1>
        </div>
    </Link>
  )
}

export default LogoLight