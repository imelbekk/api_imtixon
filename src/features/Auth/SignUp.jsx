import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Notifications } from "../../plugins/Notifications";
import useAuthStore from "../../store/auth";


export default function SignUp() {
  const [full_name, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {register} = useAuthStore()
  const navigate = useNavigate()
  const save = async (e) => {
    e.preventDefault();
    await register({
      full_name,
      username, 
      password 
    })
    let token = localStorage.getItem("token")
    if(token){
      Notifications({text:'Success', type: 'success'})
      setTimeout(() => {
        navigate("/sign_in")
      }, 1000);
    }else{
      Notifications({text: 'Password yoki Username xato', type: 'error'})
    }
  };
  const active = Boolean(full_name) && Boolean(username) && Boolean(password)
  return (
  <div className="border-[2px] w-[350px] h-[500px] flex flex-col gap-[20px] mx-auto my-[120px] bg-[#263e5a] rounded-[15px]">
    <ToastContainer/>
      <h6 className="text-center font-[600] text-[30px] my-[30px] text-white">Sign Up</h6>
      <form
        className="flex flex-col px-[10%] gap-[40px]"
        onSubmit={save}
      >
        <input
          type="text"
          placeholder="Full Name"
          onChange={(e) => setFullName(e.target.value)}
          className="px-3 py-[0.32rem] leading-[1.6] rounded-[5px]"
        />
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className="px-3 py-[0.32rem] leading-[1.6] rounded-[5px]"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="px-3 py-[0.32rem] leading-[1.6] rounded-[5px]"
        />
        <div className="flex gap-[20px] justify-between w-full my-[20px]">
        <button className="text-white w-[40%] py-[10px] px-[20px] bg-[#9ba0b0] rounded-[5px]" type="submit" disabled={!active}>
          Sign Up
        </button>
        <Link to={'/sign_in'} className=" w-[40%] text-center text-white py-[10px] rounded-[5px] bg-[#6b5876]">Sign In</Link>
        </div>
      </form>
    </div>
  );
}
