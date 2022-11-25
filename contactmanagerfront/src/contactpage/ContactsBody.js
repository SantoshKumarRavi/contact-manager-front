import React from "react";

const ContactsBody = ({
  filewithoutnpm,
  header,
  changeCheckbox,
  deleteTracking,
}) => {
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
              <p className="name">{x.name}</p>
              <p className="email">{x.email}</p>
              <p className="phonenumber">{x.phonenumber}</p>
              <p className="designation">{x.designation}</p>
            </div>
          );
        })}
    </>
  );
};
export default ContactsBody;
