import React from 'react'

const ERR = () => {
const imgSrc="https://www.elegantthemes.com/blog/wp-content/uploads/2020/02/000-404.png"
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
    <img src={imgSrc} alt='404-not-found'/>
    </div>
  )
}

export default ERR
