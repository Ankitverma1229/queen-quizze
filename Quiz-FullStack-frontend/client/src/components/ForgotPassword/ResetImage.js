import React from 'react'
import girlImage from '../../assets/forgot_password/girl.png'

const ResetImage = () => {
    return (
        <div className="w-[50%]  hidden md:block">
          <img
            src={girlImage}
            alt="Girl image"
            className="w-[100%] h-[100%] object-fit-md-cover object-md-center rounded-tr-lg rounded-br-lg"
          />
        </div>
    )
}

export default ResetImage
