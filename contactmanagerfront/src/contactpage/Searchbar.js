import React ,{useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
const Searchbar = ({filewithoutnpm,searchedEmails,setSearchedEmails,showImportUI,showDeleteUI}) => {
    const [searctText, setSearchText] = useState("")
    const [issearched,setSearched]=useState(false)
    const[showEmail,setShowEmail]=useState({})
    const searchHandler = (e) => {
        // const [searctText, setSearchText]=useState("")
        // {_id: '637e091f6a0c229c73f2103e', name: 'Shantosh', email: 'shantosh@gmail.com'}
        let search = (e.target.value)
        setSearchText(search)
        if(search==""){
            setSearched(false)
            setSearchedEmails(()=>{})
        }
      }
      function showSearchedEmailData(e){
        let e_mail_index=(e.target.id)
        let updatedArray=[...showEmail.datas]
        console.log("clicked id",updatedArray,e_mail_index)
        setSearchedEmails(()=>{
            return {
                datas:[updatedArray[e_mail_index]]
            }})
            setSearched(false)
    }
        
    useEffect(()=>{
        if (searctText !== "") {
            const newContactList = filewithoutnpm?.datas?.filter((obj) => {
              // console.log(contact)
              let emailId = obj.Email
              if (emailId.startsWith(searctText)) {
                return 1
              }
            })
            console.log("new contact", searctText,newContactList)
            if(newContactList.length!=0){
                setShowEmail(() => {
                    return {
                      datas: newContactList
                    }
                  })
                  setSearched(true)

            }else{
                setSearched(false)
            }
         
            //  setSearchResult(newContactList)
          }else{
              setSearched(false)
          }
    },[searctText])
  return (
    <>
    <div className='input-search input-search-wrapper '>
    <FontAwesomeIcon className='fontaw-mag-glass'   icon={solid('magnifying-glass')}/>
      <input
        type="text"
        className={(showImportUI||showDeleteUI) ?'input-search input-search-content glossy-background':"input-search input-search-content"}

        // className='input-search input-search-content'
        placeholder="Search contacts"
        value={searctText}
        onChange={searchHandler}
      />
      </div>
      
      {issearched && (
        <div className='search-email-wrapper'>
          {showEmail?.datas?.map((x, i) => {
            return <div className='email-wrapper' >
                <FontAwesomeIcon className='fontaw-mag-glass'   icon={solid('magnifying-glass')}/>
                <div className='email-searched-content' id={i} onClick={(e)=>showSearchedEmailData(e)}  key={i}>{x.Email}</div>
                </div>;
          })}
        </div>
      )}
    </>
  );
}

export default Searchbar