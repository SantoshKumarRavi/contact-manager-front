import React from 'react'

const Button = ({value,functionality,showref=null,showUI=null}) => {
  return (
    <button style={{backgroundColor:showUI?`rgba(255,255,255,0.1)`:""}} ref={showref} onClick={functionality}>{value}</button>
    )
}

export default Button