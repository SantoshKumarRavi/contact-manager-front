
import Tippy from "@tippy.js/react";
import 'tippy.js/dist/tippy.css'
import React from 'react'

function ToolT() {
  return (
    <div>
    <Tippy content="this is tooltip">
    <button>Hello from my side</button>
    </Tippy>    
    </div>
  )
}

export default ToolT


