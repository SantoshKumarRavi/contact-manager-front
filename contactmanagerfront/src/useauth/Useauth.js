import React, {useState}  from "react";

const AuthContext =React.createContext();

export function AuthProvider({ children }){
  const [accesstoken, setaccesstoken] =useState("");
const value={
    accesstoken:accesstoken,
    setValue: (value) => setaccesstoken(()=>value)
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function AuthConsumer() {
  return React.useContext(AuthContext);
}