import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthConsumer} from "../useauth/Useauth";

const Login = () => {
  const navigate = useNavigate();
  const value=AuthConsumer()
function login(){
    value.setValue("fgdgd.sbssb.fsfbf")
    navigate("/contact")
}
  return (
    <>
      <div>Login page</div>
      <button onClick={() => login()}>login</button>
    </>
  );
};

export default Login;
