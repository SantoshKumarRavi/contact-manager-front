import { useState , useEffect} from 'react';
import './App.css';
 import ContactPage from './components/ContactPage';
// import Table from './components/Table';

function App() {
const[searchTerm , setSearchTerm]=useState("")
const [searchResult, setSearchResult]=useState([])
const [contactdata, setContactdata]=useState([])
     var datas = (contactdata);

    useEffect(()=>{
            console.log("Im fetching data...........")
            fetch("http://localhost:8080/totalcontact")
            .then((res)=>res.json()
              ).then((data)=>{
                setContactdata(data)
            })
        },[])

  return (
    <div className="App">
      <ContactPage
      datas={searchTerm.length<1 ?datas : searchResult}
      />
      {/* <Table contactdata={contactdata}/> */}
    </div>
  );
}

export default App;
