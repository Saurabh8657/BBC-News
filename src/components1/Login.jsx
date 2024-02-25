import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import logo from "../images/logo.png";
import SignupForm from "./SignUp";

import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../apiRequest";

function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [usersList, setusersList] = useState("");
  const nevigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  function handlelogin(e) {
    e.preventDefault();
    if(usersList.find((temp) => temp.username === username && temp.password === password)){
      dispatch({ type: "LOGIN" });
      toast({
        title: "Login Successful",
        description: "Welcome back!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      let logedInUser = usersList.find((temp) => temp.username === username && temp.password === password)
      localStorage.setItem("user", JSON.stringify(logedInUser)); 
      setTimeout(() => {
        nevigate("/");
      }, 1200);
      
    }else{
      toast({
        title: "Login Failed",
        description: "User does not exist.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }
  function handlSignupNavigation(e) {
    e.preventDefault();
    nevigate("/signup");
  }

  useEffect(() => {
    fetchUsers().then((data) => {
      console.log(data);
      setusersList(data);
    })
  }, []);

  return (
    <>
      {" "}
      <Navbar />
      <div className="bg-gray-800 h-screen flex">
        {/* FLEX 1 */}
        <div className="max-w-90 lg:w-1/2 text-center flex flex-col justify-center bg-gray-600">
          <img src={logo} alt="" className="mx-auto w-40 h-auto" />
          <h1 className="text-2xl font-semibold mt-4 text-white">
            Sign in with your email or username
          </h1>
          <form
            onSubmit={handlelogin}
            className="flex flex-col items-center mt-6"
          >
            <input
              type="text"
              value={username}
              placeholder="Enter username"
              onChange={(e) => setusername(e.target.value)}
              className="w-3/4 h-12 border-none m-4 text-center rounded-md bg-white"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Enter password"
              className="w-3/4 h-12 border-none m-4 text-center rounded-md bg-white"
            />
            <button
              type="submit"
              className="w-3/4 h-12 border-none m-2 bg-black text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:border-gray-500"
            >
              Next
            </button>
          </form>
          <a href="#" className="text-blue-500 mt-2">
            Need help signing in?
          </a>
          <hr className="my-4 border-t" />
          <h4 className="mb-2 text-white">Don&apos;t have a BBC account?</h4>
          <a onClick={handlSignupNavigation} href="#" className="text-blue-500">
            Register now
          </a>
        </div>

        {/* FLEX 2 */}
        <div className="hidden md:block w-3/10 bg-cover bg-center">
          <img
            src="https://t4.ftcdn.net/jpg/03/86/51/03/360_F_386510351_03Qk3je4FGnVLo4vXRdOpoDWfZjtmajd.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
}

export default Login;
