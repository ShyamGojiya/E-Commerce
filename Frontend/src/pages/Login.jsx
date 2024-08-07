import React, { createContext, useContext, useState } from "react";
import signin from "../assest/signin.gif";
import password from "../assest/password.png";
import hidepassword from "../assest/hidepassword.png";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../../Common";
import { toast } from "react-toastify";
import axios from "axios";
import Context from "../Context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { fetchUserAddToCart , fetchUserDetails } = useContext(Context);

  const HandleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    //console.log("SummaryApi.signIn.method",SummaryApi.signIn.url)

    // const dataResponse = await fetch(SummaryApi.signIn.url,{
    //   method : SummaryApi.signIn.method,
    //   // withCredentials: true ,
    //     headers : {
    //       // Accept : 'application/data',
    //       "content-type" : "application/json",
    //     },
    //     body : JSON.stringify(data)
    // })
    // const dataApi = await dataResponse.json();

    //console.log(data)
    const config = {
      withCredentials: true, // Corrected attribute name
      headers: { "Content-Type": "application/json" },
    };
    const link = SummaryApi.signIn.url;
    // const email = data.email;
    // const password = data.password;

    //console.log(link,data);
    const gsr = await axios.post(link, data, config);

    if (gsr.data.success) {
      toast.success(gsr.data.message);
      navigate("/");
      fetchUserDetails()
      fetchUserAddToCart()
      //console.log("Data Login",gsr.data);
    }
    if (gsr.data.error) {
      toast.error(gsr.data.message);
    }
  };

  // console.log("Data Login : ",data)
  return (
    <>
      <section id="login">
        <div className="mx-auto container px-4">
          <div className="bg-white p-6 mt-4 py-4 w-full max-w-sm mx-auto">
            <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
              <img src={signin} alt="" />
            </div>

            <form className="pt-6" onSubmit={HandleSubmit}>
              <div className="">
                <label htmlFor="">Email :</label>
                <div className="bg-slate-100 p-2">
                  <input
                    type="email"
                    placeholder="Enter Email"
                    value={data.email}
                    name="email"
                    onChange={HandleChange}
                    className="w-full outline-none h-full bg-transparent"
                  />
                </div>
              </div>
              <div className="mt-2">
                <label htmlFor="">Password :</label>
                <div className="bg-slate-100 p-2 flex">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    value={data.password}
                    name="password"
                    onChange={HandleChange}
                    className="w-full outline-none h-full bg-transparent"
                  />
                  <div
                    className="cursor-pointer text-xl"
                    onClick={() => setShowPassword((preve) => !preve)}
                  >
                    <span>
                      {showPassword ? (
                        <img src={hidepassword} alt="" className="w-5 h-5" />
                      ) : (
                        <img src={password} alt="" className="w-5 h-5" />
                      )}
                    </span>
                  </div>
                </div>
                <Link
                  to={"/forgot-password"}
                  className="block ml-auto w-fit hover:underline hover:text-red-500"
                >
                  Forgot Password?
                </Link>
              </div>
              <button className="bg-red-600 text-white w-full py-2 mb-4 rounded-full max-w-[150px] hover:scale-110 translate-all mt-4 block mx-auto">
                Login
              </button>
            </form>

            <p className="my-4">
              Don't have an Account ?
              <Link
                to={"/sign-up"}
                className="text-blue-700 hover:underline hover:text-red-500"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
