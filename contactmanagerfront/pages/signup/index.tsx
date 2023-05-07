import React, { useState } from "react";
import styles from "./index.module.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { IoMdCloudDone } from "react-icons/io";
import { register } from "../src/network/lib/authenticate";
import Link from 'next/link';

const Signup = () => {
  type FormType={
    password?:String,
    name?:String, 
    email?:String
  }
  const [type, setType] = useState("password");
  const [message, setMessage] = useState("");
  const [hide, setHide] = useState({ display: "none" });
  const [show, setShow] = useState({ display: "block" });
  const [form, setForm] = useState<FormType>({});
  const [popStyle, setPopStyle] = useState({ visiblility: "hidden",display:"none" });
  const [cnfPassword, setCnf] = useState("");
  const [errormsg, seterrormsg] = useState("Create Your Account");
  const [errcolor, seterrcolor] = useState("#7f8c8d");

  function popup() {
    setPopStyle({ visiblility:"visible",display:"flex" });
  }
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
    popup();
    if (form.password !== cnfPassword) {
      seterrormsg("Oops password and confirm password does not match");
      seterrcolor("red");
      setPopStyle({ visiblility: "hidden",display:"none" });
      return;
    }
    register(form).then((x)=>{
      popup();
      setMessage(x.data.message);
    }).catch((err)=>{
      console.log("err",err)
    })
  }
  return (
    <div   className={styles.main}  >
      <div className={styles.popup} style={popStyle}>
        <IoMdCloudDone style={{ fontSize: "40px", color: "green" }} />
        <p className={styles.message}>{message}</p>
        <button
        className={styles.popup_btn}
        >
            <Link 
             href={`/login`}>
            <a  style={{textDecoration:"none"}}>
            Log-In
            </a>
          </Link>
        </button>
      </div>
      <form action="" onSubmit={handleSubmit}
      className={`${styles.form} ${styles.regisName}`}
      >
        <p
        className={styles.description} 
         style={{ color: errcolor }}>
          {errormsg}
        </p>
        <input
          className={`${styles.upper_input} ${styles.input} ${styles.regisName}`}
          type="text"
          autoComplete="off"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          name="name"
          id="name-input"  
        />
        <input
          className={`${styles.upper_input} ${styles.input} ${styles.regisName}`}
          autoComplete="off"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          name="email"
          type="email"
          placeholder="Email"
        />

        <div 
          className={styles.passwordDiv}
        > 
          <input
            className={styles.passwordinput}
            id="password-input"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            name="password"
            type={type}
            placeholder="Password"
          />
          <span
            className={styles.icon_span}          
          >
            <AiFillEyeInvisible
              style={show}
              onClick={() => handleview("show")}
            />
            <AiFillEye style={hide} onClick={() => handleview("hide")} />
          </span>
        </div>
        <div
          className={styles.passwordDiv}
        >
          <input
            className={styles.passwordinput}
            id="password-input"
            onChange={(e) => setCnf(e.target.value)}
            name="Confirm-password"
            type={type}
            placeholder="Confirm Password"
          />
          <span 
            className={styles.icon_span}
          >
            <AiFillEyeInvisible
              style={show}
              onClick={() => handleview("show")}
            />
            <AiFillEye style={hide} onClick={() => handleview("hide")} />
          </span>
        </div>
        <button
        className={styles.button}
        type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
