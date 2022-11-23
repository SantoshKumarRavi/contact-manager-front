import { useState ,useRef, useEffect,useCallback} from 'react';
import './App.css';
import Button from './components/Button';
import {useDropzone} from 'react-dropzone';

/*
    "react-dropzone": "^14.2.3"
*/
function App() {
  // console.log("get",getRootProps(),"inpu",getInputProps())
  const[showImportUI,setshowImportUI]=useState(false)
  const showUIref_btn=useRef(null)
  const showUIref_content=useRef(null)
  function updateshowImportUI(){
    setshowImportUI((prev)=>!prev)
  }

  let dummydata=[{color:"red",value:"#f00"},{color:"green",value:"#0f0"},{color:"blue",value:"#00f"},{color:"cyan",value:"#0ff"},{color:"magenta",value:"#f0f"},{color:"yellow",value:"#ff0"},{color:"black",value:"#000"}]
  useEffect(()=>{

    const handleClickOutside = event => {
      if ((showUIref_btn.current && !showUIref_btn.current.contains(event.target))&&(showUIref_content.current && !showUIref_content.current.contains(event.target))) {
        setshowImportUI(false);
      }
    }
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };

  },[])
  // const [images, setImages] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    console.log("acccepted files ========>",acceptedFiles)
    // acceptedFiles?.map((file) => {
    //   const reader = new FileReader();
    //   reader.onload = function (e) {
    //     setImages((prevState) => [
    //       ...prevState,
    //       {  src: e.target.result },
    //     ]);
    //   };
    //   reader.readAsDataURL(file);
    //   return file;
    // });
  }, []);
  const { getRootProps, getInputProps ,acceptedFiles } = useDropzone({onDrop});
  const files = acceptedFiles.map((file) => (
    <div key={file.path}>
      {file.path} - {file.size} bytes
    </div>
  ));
  return (
    <div  className="App">
      {showImportUI &&<style>{'body {background-color:rgba(0, 0, 0, 0.5)}'}</style>}
      <Button showUI={showImportUI}  showref={showUIref_btn} functionality={updateshowImportUI} value={"import"}/>
     <div className='import'>
     {showImportUI && <div  ref={showUIref_content}>
        <div className='drag-wrapper' {...getRootProps()}>
          <input {...getInputProps()}/>
          drag here
        </div>
        <div>{files}</div>
      </div>}
     </div>
    {
      dummydata.map((x,i)=><div key={i}>color :{x.color} ; value {x.value}</div>)
    }
        {/* {images && images.map((x,i)=><div className='img'>
            <img key={i} src={x.src}/>
          </div>) } */}

    </div>
  );
}

export default App;