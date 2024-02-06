import React from "react";
import { useState } from "react";
import axiosCleint from "../../plugins/AxiosCleint";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [full_name, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    axiosCleint
      .post("/auth/signup", {
        full_name,
        username,
        password,
      })  
      .then((res) => {
        let url = res?.data?.token?.access_token;
        localStorage.setItem("token", url);
        if (res?.status === 201) {
          navigate("/sign_in");
        }
      })
      .catch((err) => {
        alert("Username yoki password xato")
        console.log(err);
      });
  };
  return (
    <div className="border-[2px] w-[350px] h-[500px] flex flex-col gap-[20px] mx-auto my-[120px] bg-[#263e5a] rounded-[15px]">
      <h6 className="text-center font-[600] text-[30px] my-[30px] text-white">Sign Up</h6>
      <form
        className="flex flex-col px-[10%] gap-[40px]"
        onSubmit={handleSubmit}
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
        <button className="text-white w-[40%] py-[10px] px-[20px] bg-[#9ba0b0] rounded-[5px]" type="submit">
          Sign Up
        </button>
        <Link to={'/sign_in'} className=" w-[40%] text-center text-white py-[10px] rounded-[5px] bg-[#6b5876]">Sign In</Link>
        </div>
      </form>
    </div>
  );
}
