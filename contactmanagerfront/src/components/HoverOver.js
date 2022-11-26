import React ,{ useState }  from "react";
import ReactTooltip from 'react-tooltip';
import "../App.css"
const HoverOver = ({Email,Phonenumber}) => {
    const [isHovering, setIsHovering] = useState(false);
    function handleMouseOver(){
        console.log("im hovered")
        setIsHovering(true)
      }
      function handleMouseOut(){
        console.log("im out")
        setIsHovering(false)
      }

  return (
    <>
    <ReactTooltip   place='bottom' id='tool'
    />
      <div
        className="Email tool-inner  common-header-styles remove-border glossy-background tip "
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        data-for="tool"
        data-tip={Email}
        data-text-color='rgb(0, 214, 252)'
        data-background-color="rgb(70, 98, 103)"
      >
        {Email}
      </div>
      <div
        className={
          isHovering
            ? "blue Phonenumber  common-header-styles remove-border glossy-background"
            : "Phonenumber  common-header-styles remove-border glossy-background"
        }
      >
        {Phonenumber}
      </div>
    </>
  );
};

export default HoverOver;
