import React from "react";
import { useState } from "react";
import axiosCleint from "../../plugins/AxiosCleint";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  let payload = {
    username,
    password,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axiosCleint
      .post("/auth/signin",   { ...payload })
      .then((res) => {
        localStorage.setItem("token", res?.data?.tokens?.access_token);
        if (res?.status === 201) {
          navigate("/books");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Username yoki login xato")
      });
  };
  return (
    <div className="border-[2px] w-[350px] h-[500px] flex flex-col gap-[20px] mx-auto my-[120px] bg-[#263e5a] rounded-[15px]">
      <h6 className='text-center font-[600] text-[30px] my-[30px] text-white'>
        Sign In
      </h6>
      <form onSubmit={handleSubmit} className="flex flex-col px-[10%] gap-[40px]">
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className="px-3 py-[0.32rem] leading-[1.6] rounded-[5px] "
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="px-3 py-[0.32rem] leading-[1.6] rounded-[5px]"
        />
        <div className="flex gap-[20px] justify-between w-full my-[20px]">
          <button className="text-white w-[40%] py-[10px] px-[20px] bg-[#9ba0b0] rounded-[5px]">Sign In</button>
          <Link to={'/sign_up'} className=" w-[40%] text-center text-white py-[10px] rounded-[5px] bg-[#6b5876]">Back</Link>
        </div>
      </form>
    </div>
  );
}
