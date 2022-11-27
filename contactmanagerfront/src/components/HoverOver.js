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
        data-text-color='black'
        data-background-color="white"
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
