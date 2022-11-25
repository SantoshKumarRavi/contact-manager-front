import React from "react";

const ContactsBody = ({
  filewithoutnpm,
  header,
  changeCheckbox,
  deleteTracking,
}) => {

  console.log("data inside bpody",filewithoutnpm.datas)
  return (
    <>
      {header?.heading &&
        filewithoutnpm?.datas?.map((x, i) => {
  
          // deletedArray?.push({id:x._id,checked:false})
          // setDeleteTracking((pre)=>[...pre,{id:x._id,checked:false}]) //here not working ;;err: too many renders
          return (
            <div className="data-wrapper" key={i}>
              <input
                data-index={String(i)}
                onChange={(e) => changeCheckbox(e)}
                id={x._id}
                type={"checkbox"}
                checked={deleteTracking[i]?.checked}
              />
              <p className="Name">{x.Name}</p>
              <p className="Designation">{x.Designation}</p>
              <p className="Company">{x.Company}</p>
              <p className="Industry">{x.Industry}</p>
              <p className="Email">{x.Email}</p>
              <p className="Phonenumber">{x.Phonenumber}</p>
              <p className="Country">{x.Country}</p>
              
            </div>
          );
        })}
    </>
  );
};
export default ContactsBody;
