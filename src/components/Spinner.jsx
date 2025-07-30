import React from 'react'
import { BarLoader } from 'react-spinners'

const Override = {
    display:'block',
    margin: '0 auto 50 auto'
}

const Spinner = ({color = 'blue' , size ='150'}) => {

  return (
    <>
        <BarLoader
         color={color}
         size={size}
         cssOverride={Override}
         aria-label='Loading...'
        />
    </>
  )
}

export default Spinner