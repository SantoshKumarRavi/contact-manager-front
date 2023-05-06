import React, { useState } from "react";
import styles from "./index.module.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { AuthConsumer } from "../src/useauth/Useauth";
import {login} from "../src/network/lib/authenticate"
import { useRouter } from 'next/router';

const Login = () => {
  type DataType={
    password?:String,
    name?:String, 
    email?:String
  }
  const [type, setType] = useState("password");
  const [hide, setHide] = useState({ display: "none" });
  const [show, setShow] = useState({ display: "block" });
  const [data, setData] = useState<DataType>({});
  const [errormsg, seterrormsg] = useState(
    "Enter Your Credentials to Enter Your Account"
  );
  const [errcolor, seterrcolor] = useState("#7f8c8d");

  const value = AuthConsumer();
  const router = useRouter();

  function handleview(action) {
    if (action === "show") {
      setType("text");
      setHide({ display: "block" });
      setShow({ display: "none" });
    } else {
      setType("password");
      setShow({ display: "block" });
      setHide({ display: "none" });
    }
  }
  function handleSubmit(e) {
    e.preventDefault();

    if (!data.password || !data.email) {
      return alert("Kindly fill all the fields");
    }
    login(data).then((res)=>{
      console.log("res", res);
      if (res.data.status !== "success") {
        seterrormsg(res.data.message);
        seterrcolor("red");
      }
      if (res.data.jwt_token !== undefined) {
        value.setValue(res.data.jwt_token);
        value.setName(data.email);
        value.setId(res.data.userid);
        router.push("/contact")
      }
    }).catch((err)=>{
      console.log("err",err)
    })

  }
  return (
    <div 
    className={`${styles.logindiv}`}
    >
      <form action="" onSubmit={handleSubmit}
          className={`${styles.formBox}`}
      >
        <p  style={{ color: errcolor }}
          className={`${styles.description}`}>
          {errormsg}
        </p>
        <input
          className={`${styles.upperinput} ${styles.input}`}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          type="email"
          placeholder="User ID"
        />
        <div 
         className={`${styles.passworddiv}`}
        > 
          <input
            className={`${styles.passwordinput } ${styles.input}`}
            id="password-input"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            type={type}
            placeholder="Password"
          />
          <span 
          className={`${styles.iconspan}`}
          > 
            <AiFillEyeInvisible
              style={hide}
              className="eye"
              onClick={() => handleview("hide")}
            />
            <AiFillEye
              className="eye"
              style={show}
              onClick={() => handleview("show")}
            />
          </span>
        </div>
        <button  type="submit"
        className={`${styles.button}`}
        >
          Sign In
        </button>
        {/* <Link to="/signup" className="anchor">
          Sign Up
        </Link> */}
      </form>
    </div>
  );
};
export default Login;
