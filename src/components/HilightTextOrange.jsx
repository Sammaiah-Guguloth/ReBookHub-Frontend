import React from 'react'

const HilightTextOrange = ({children}) => {
  return (
    <span className="bg-gradient-to-r from-[oklab(68%_0.175_0.116)] via-[oklab(79.6%_0.061_0.147)] to-[oklab(91.8%_-0.033_0.177)] bg-clip-text text-transparent"
    >
    {
        " " + children + " "
    } 
    </span>
  )
}

export default HilightTextOrange