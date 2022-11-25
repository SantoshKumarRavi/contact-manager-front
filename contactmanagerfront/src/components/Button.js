import React from 'react'

const Button = ({classname=null,value=null,functionality=null,showref=null,showUI=null}) => {
  return (
    <button className={classname} style={{backgroundColor:showUI?`rgba(255,255,255,0.1)`:""}} ref={showref} onClick={functionality}>
   {value}
    </button>
    )
}

export default Button