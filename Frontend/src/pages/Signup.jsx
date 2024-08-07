import React, { useState } from 'react';
import signin from "../assest/signin.gif";
import password from "../assest/password.png";
import hidepassword from "../assest/hidepassword.png";
import {Link, useNavigate} from "react-router-dom"
import Imgtobase from '../Helpers/Imgtobase';
import SummaryApi from '../../Common';
import { toast } from 'react-toastify';
import axios from "axios";

const Signup = () => {

    const [showPassword,setShowPassword] = useState(true);
    const [showconPassword,setconShowPassword] = useState(true);
    const [data,setData] = useState({
      email : "",
      password : "",
      name : "",
      confirmpassword : "",
      profilepic : "",

    })
  const navigate = useNavigate()
  
    const HandleChange = (e) => {
      const {name,value} = e.target
  
      setData((preve) => {
        return{
          ...preve,
          [name] : value
        }
      })
    
    }
  
    
    const HandleSubmit = async (e) => {
      e.preventDefault();
      
      if(data.password === data.confirmpassword){

      //console.log("SummaryApi",SummaryApi.signUp.url)

      const dataResponse = await fetch(SummaryApi.signUp.url,{
        method : SummaryApi.signUp.method,
        headers : {
          "content-type" : "application/json",
        },
        body : JSON.stringify(data)
      })

      // axios.post('http://localhost:8080/api/signup',{data.email , data.password,data.name})
      //   .then(result => console.log(result))
      //   .catch(err => console.log(err))

      const dataApi = await dataResponse.json()
      
      if(dataApi.success){
        toast.success(dataApi.message);
        navigate("/login")
      }
      if(dataApi.error){
        toast.error(dataApi.message)
      }
    }
    else{
      toast.error("Please check password and confirm password")
    }
      // toast(dataApi.message)
      console.log("Data",data)
    }
  
    const HandleUploadPic = async (e) => {
        const file = e.target.files[0];

        const imgpic = await Imgtobase(file)
        console.log("imgpic",imgpic);
        setData((preve) => {
            return{
                ...preve,
                profilepic : imgpic
            }

        })
    }

  return (
    <section id='signup'>

    <div className="mx-auto container px-4">
    <div className="bg-white p-6 mt-4 py-4 w-full max-w-sm mx-auto">
      <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
        <div>
            <img src={data.profilepic || signin} alt="" />
        </div>
        <form>
            <label>
                <div className="bg-slate-200 pb-4 pt-2 text-center absolute w-full bottom-0 text-xs bg-opacity-75 cursor-pointer">
                Upload Photo
                </div>
            <input type='file' className='hidden' onChange={HandleUploadPic}/>
        </label>
        </form>
      </div>

      <form className='pt-6 flex flex-col gap-2' onSubmit={HandleSubmit}>

      <div className="grid">
          <label htmlFor="">Name :</label>
          <div className="bg-slate-100 p-2">
            <input 
            type="text" 
            placeholder='Enter Your Name'
            value={data.name}
            name = 'name'
            onChange={HandleChange}
            required
            className='w-full outline-none h-full bg-transparent'/>
          </div>
        </div>

        <div className="grid">
          <label htmlFor="">Email :</label>
          <div className="bg-slate-100 p-2">
            <input 
            type="email" 
            placeholder='Enter Email'
            value={data.email}
            name = 'email'
            onChange={HandleChange}
            required
            className='w-full outline-none h-full bg-transparent'/>
          </div>
        </div>

        <div className="mt-2">
          <label htmlFor="">Password :</label>
          <div className="bg-slate-100 p-2 flex">
            <input 
            type={showPassword ? "text" : "password"} 
            placeholder='Enter Password'
            value={data.password}
            name = 'password'
            onChange={HandleChange}
            required
            className='w-full outline-none h-full bg-transparent'/>
          <div className="cursor-pointer text-xl" onClick={() => setShowPassword((preve) =>! preve)}>
            <span>
              {
                  showPassword ? (<img src={hidepassword} alt="" className='w-5 h-5'/>) : (<img src={password} alt="" className='w-5 h-5'/>)
                }
              
            </span>
          </div>
          </div>
          
        </div>

        <div className="mt-2">
          <label htmlFor="">Confirm Password :</label>
          <div className="bg-slate-100 p-2 flex">
            <input 
            type={showconPassword ? "text" : "password"} 
            placeholder='Enter Confirm Password'
            value={data.confirmpassword}
            name = 'confirmpassword'
            onChange={HandleChange}
            required
            className='w-full outline-none h-full bg-transparent'/>
          <div className="cursor-pointer text-xl" onClick={() => setconShowPassword((preve) =>! preve)}>
            <span>
              {
                  showconPassword ? (<img src={hidepassword} alt="" className='w-5 h-5'/>) : (<img src={password} alt="" className='w-5 h-5'/>)
                }
              
            </span>
          </div>
          </div>
          
        </div>

        <button className='bg-red-600 text-white w-full py-2 mb-4 rounded-full max-w-[150px] hover:scale-110 translate-all mt-4 block mx-auto'>Login</button>
      </form>

       <p className='my-4'>Already have an Account ? <Link to={"/login"} className='text-blue-700 hover:underline hover:text-red-500'>Login</Link></p>
    </div>
  </div>
    </section>
  )
}

export default Signup;