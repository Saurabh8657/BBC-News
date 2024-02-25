// SignupForm.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import Navbar from "../components/Navbar";
import { dashBoardURL } from "../apiRequest";

function SignupForm() {
  const [username, setusername] = useState();
  const [password, setpassword] = useState();
  const nevigate = useNavigate();

  let url = `https://bcc-news-backend.onrender.com/users`;

  async function addDashBoardForUser(dashboardId){
    let dashboardObjForUser = {
        id: dashboardId,
        bookmark: []
    }
    try{
      let response = await fetch(`${dashBoardURL}`,{
        method:"POST",
        headers:{"Content-type":"Application/json"},
        body:JSON.stringify(dashboardObjForUser) 
      })
      let data = await response.json();
      // console.log(data);
    }catch(error){
      console.log(error) ;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(url, {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        addDashBoardForUser(data.id);
        nevigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // console.log("signuprender");
  //  <img src={logo} alt="Logo" className="mx-auto mb-4" style={{ maxWidth: '100px' }} />

  return (
    <>
      <Navbar />
      <div className="max-w-ld mx-auto">
        <div
          className="max-w-full mx-auto mt-8 p-6 bg-opacity-80 bg-cover bg-center bg-white shadow-md rounded-md text-center"
          style={{
            backgroundImage:
              'url("https://t4.ftcdn.net/jpg/03/67/85/53/360_F_367855342_hC9tRkea0aqxsyqfOzBwjc9Tv3jiSmNz.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-3">
              <label
                htmlFor="fullName"
                className="block text-sm font-bold text-gray-600"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="mt-1 p-2 w-1/3 border rounded-md bg-gray-200"
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="block text-sm font-bold text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-1/3 border rounded-md bg-gray-200"
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="password"
                className="block text-sm font-bold text-gray-600"
              >
                Create Username
              </label>
              <input
                type="text"
                id="password"
                name="password"
                onChange={(e) => setusername(e.target.value)}
                className="mt-1 p-2 w-1/3 border rounded-md bg-gray-200"
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="mobileNumber"
                className="block text-sm font-bold text-gray-600"
              >
                Create Password
              </label>
              <input
                type="password"
                id="mobileNumber"
                name="mobileNumber"
                onChange={(e) => setpassword(e.target.value)}
                className="mt-1 p-2 w-1/3 border rounded-md bg-gray-200"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:ring focus:border-gray-700"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-gray-600 font-bold">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-500 hover:underline font-bold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignupForm;
