import { Box, useStatStyles } from '@chakra-ui/react'
import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import logo from "../images/logo.png";
// import { scienceData } from '../Redux/actionCreator'

export function AdminPage() {
    const [endpoint, setEndpoint]=useState("")
 const [image, setImage]=useState();
 const [title, setTitle]=useState();
 const [discription, setdisacription]=useState();
 const [category, setCategories]=useState("")
 



    const sceincedatautl=`https://bcc-news-backend.onrender.com/${endpoint}`
    console.log(sceincedatautl)

    function updateData(e){
      e.preventDefault();
      fetch(sceincedatautl, {
          method:"POST", 
          headers:{"Content-type": "Application/json"}, 
          body:JSON.stringify({
            title, 
            description: discription,
            url:image,
            category:category

          })
      })
      .then((res)=>{
        return res.json()
      })
      .catch((data)=>{
        console.log(data);
      })
      .catch(error=>{
        console.log(error)
    })
    }

  return (
<>
<Navbar />
  <div className="bg-gray-800 py-6">
    <img src={logo} alt="" className="mx-auto w-40 h-auto" />
  </div>
  
  <div className="bg-gray-800 p-4">
    <Box>
      <select
        onChange={(e) => {
          setEndpoint(e.target.value);
        }}
        className="p-3 border rounded-md w-full bg-white hover:bg-gray-100 focus:bg-gray-100"
      >
        <option value="">Select Category</option>
        <option value="sports">Sports</option>
        <option value="entertainment">Entertainment</option>
        <option value="business">Business</option>
        <option value="science">Science</option>
        <option value="technology">Technology</option>
        <option value="politics">Politics</option>
      </select>
    </Box>
  </div>

  <form onSubmit={updateData} className="max-w-ld mx-auto mt-8 p-6 bg-gray-100 shadow-md rounded-md w-3/4">
    {/* Image Input */}
    <div className="mb-4">
      <select
        onChange={(e) => {
          setCategories(e.target.value);
        }}
        name=""
        id=""
        className="p-3 border rounded-md w-full bg-white hover:bg-gray-100 focus:bg-gray-100"
      >
        <option value="">Select Category</option>
        <option value="basketball">Basketball</option>
        <option value="football">Football</option>
        <option value="extra-sports">Extra-Sports</option>
        <option value="cricket">Cricket</option>
        <option value="top-news">Top News</option>
      </select>
    </div>

    <div className="mb-4">
      <label htmlFor="image" className="block text-sm font-medium text-gray-600">
        Image:
      </label>
      <input
        type="text"
        id="image"
        name="image"
        className="mt-1 p-2 w-full border rounded-md"
        placeholder="Enter image URL"
        onChange={(e) => {
          setImage(e.target.value);
        }}
      />
    </div>

    {/* Title Input */}
    <div className="mb-4">
      <label htmlFor="title" className="block text-sm font-medium text-gray-600">
        Title:
      </label>
      <input
        type="text"
        id="title"
        name="title"
        className="mt-1 p-2 w-full border rounded-md"
        placeholder="Enter title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
    </div>

    {/* Description Input */}
    <div className="mb-4">
      <label htmlFor="description" className="block text-sm font-medium text-gray-600">
        Description:
      </label>
      <input
        type="text"
        id="description"
        name="description"
        className="mt-1 p-2 w-full border rounded-md"
        placeholder="Enter description"
        onChange={(e) => {
          setdisacription(e.target.value);
        }}
      />
    </div>

    {/* Submit Button */}
    <div className="flex justify-center mt-4">
      <button
        type="submit"
        className="bg-black text-white py-3 px-8 rounded-md hover:bg-black focus:outline-none focus:ring focus:border-black"
      >
        Submit
      </button>
    </div>
  </form>
</>




  


  )
}

 export default AdminPage
