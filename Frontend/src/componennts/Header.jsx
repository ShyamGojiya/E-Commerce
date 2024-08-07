import React, { useContext, useState } from "react";
import logo from "../assest/banner/logo.jpg";
import searchicon from "../assest/banner/searchicon.svg";
import usericon from "../assest/banner/usericon.svg";
import profileicon from "../assest/banner/profileicon.jpg";
import cartlogo from "../assest/banner/cartlogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../../Common";
import { toast } from "react-toastify";
import { setUserDetails } from "../../Store/userSlice";
import ROLE from "../../Common/Role";
import Context from "../Context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context)

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });
    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = async(e) => {
    const {value} = e.target;

    if(value){
      navigate(`/search?=${value}`)
    }
    else{
      navigate("/search")
    }
  }
  //console.log("Header ::",context)
  return (
    <>
      <header className="h-18 shadow-md bg-white fixed w-full z-10">
        <div className="h-full container mx-auto flex items-center px-4 justify-between">
          <div className="ml-12">
            <Link to={"/"}>
              <img src={logo} alt="" width={70} height={50} />
            </Link>
          </div>

          <div className="hidden lg:flex items-center w-full justify-center max-w-sm border rounded-full focus-within:shadow pl-1">
            <input
              type="text"
              placeholder="Search product here.."
              className="w-full outline-none"
              onChange={handleSearch}
            />
            <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full">
              <img src={searchicon} alt="" width={16} height={16} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group flex justify-center ">
              {
                user?._id && 
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay((preve) => !preve)}
              >
                {user?.profilepic ? (
                  <img
                    className="w-10 h-10 rounded-full hidden md:block"
                    src={user?.profilepic}
                    alt={user?.name}
                    width={40}
                    height={40}
                  />
                ) : (
                  <img src={profileicon} alt="" width={40} height={40} />
                )}
              </div>
              }
              
              {
                menuDisplay && (
                  <div className="absolute bg-white bottom-0 top-10 h-fit p-3 shadow-lg rounded ">
                    <nav>
                      {
                        user?.role === ROLE.ADMIN && (
                          <Link
                            to={"/admin-panel/all-products"}
                            className="whitespace-nowrap hover:bg-slate-100 p-2"
                            onClick={() => setMenuDisplay((preve) => !preve)}
                          >
                            Admin Panel
                          </Link>
                        )
                      }                    
                    </nav>
                  </div>
                )
              }
            </div>
            

              {
                user?._id && (
                  <Link to={"/cart"} className="text-2xl relative">
                    <span>
                      <img src={cartlogo} alt="" width={42} height={42} />
                    </span>
                    <div className="bg-red-600 text-white w-4 h-4 rounded-full p-1 flex items-center justify-center absolute top-1 -right-0">
                      <p className="text-sm">{context?.cartProductCount}</p>
                    </div>
                  </Link>
                )
              }
            <div>
              {user?._id ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-1 font-semibold rounded-full bg-red-600 text-white hover:bg-red-700"
                >
                  Logout
                </button>
              ) : (
                <Link to={"/login"}>
                  <button className="px-4 py-1 font-semibold rounded-full bg-red-600 text-white hover:bg-red-700"
                  >
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
