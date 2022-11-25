import React, { useEffect, useState, useRef } from 'react'
import Rows from './Rows'
import "./SearchBar.css";
import Table from './Table';

const ContactPage = (props) => {
  const [searctText, setSearchText] = useState("")
  const inputEl = useRef("")

  const [contactdata, setContactdata] = useState({})
  const [searchdata, setsearchdata] = useState({})

  useEffect(() => {
    console.log("Im fetching data...........")
    fetch("http://localhost:8080/totalcontact")
      .then((res) => res.json()
      ).then((resdata) => {
        setContactdata(() => {
          return {
            data: resdata
          }
        })
        // setContactdata(resdata)
      })
  }, [])

  const searchHandler = () => {
    // const [searctText, setSearchText]=useState("")
    // {_id: '637e091f6a0c229c73f2103e', name: 'Shantosh', email: 'shantosh@gmail.com'}
    let search = (inputEl.current.value)
    setSearchText(search)
    if (search !== "") {
      const newContactList = contactdata?.data?.filter((contact) => {
        // console.log(contact)
        let emailId = contact.email
        if (emailId.startsWith(search)) {
          return 1
        }
      })
      console.log("new contact", newContactList)
      setsearchdata(() => {
        return {
          data: newContactList
        }
      })
      //  setSearchResult(newContactList)
    }
  }

  let result
  if (searctText.length < 1) {
    result = false
  } else {
    result = true
  }
  console.log(searctText.length)

  return (
    <div className="App">
      <div>ContactPage
        <br />
        <div className='ui search'>
          <div className='ui icon input'>
            <input
              ref={inputEl}
              type="text"
              placeholder='Search contacts'
              className='propmt'
              value={searctText}
              onChange={searchHandler}
            />
            <i className='search icon'></i>
            <p>Searched Text</p>

            {result ? searchdata?.data?.map((personDetails, index) => {
              return <div key={index}>
                <Rows key={index}
                  personDetails={personDetails} />
              </div>
            }) : contactdata?.data?.map((personDetails, index) => {
              return <div key={index}>
                <Rows key={index}
                  personDetails={personDetails} />
              </div>
            })
            }
            <table>
              <tr>
                <th>name</th>
                <th>emailId</th>
              </tr>
              </table>
            {result ? searchdata?.data?.map((personDetails, index) => {
              return <div key={index}>
                <Table key={index}
                  personDetails={personDetails} />
              </div>
            }) : contactdata?.data?.map((personDetails, index) => {
              return <div key={index}>
                <Table key={index}
                  personDetails={personDetails} />
              </div>
            })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage