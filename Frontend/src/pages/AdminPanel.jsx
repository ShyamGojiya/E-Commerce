import React, { useEffect } from "react";

import profileicon from "../assest/banner/profileicon.jpg";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../../Common/Role";


const AdminPanel = () => {
    const user = useSelector((state) => state?.user?.user);
    const navigate = useNavigate();

    // useEffect(() => {
    //   if(user?.role !== ROLE.ADMIN){
    //     navigate("/")
    //   }
    // },[user])
  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden overflow-y-hidden">
      <aside className="bg-white min-h-full w-full max-w-60 customShadow">
        <div className="h-32 flex justify-center items-center flex-col">
        <div className="text-2xl cursor-pointer relative flex justify-center">
                {user?.profilepic ? (
                  <img
                    className="w-20 h-20 rounded-full"
                    src={user?.profilepic}
                    alt={user?.name}
                    
                  />
                ) : (
                  <img src={profileicon} className="w-20 h-20 rounded-full" alt=""  />
                )}
              </div>
              <p className="capitalize text-lg font-semibold">{user?.name}</p>
              <p className="text-sm">{user?.role}</p>
        </div>
    
        <div>
                <nav className="grid p-4">
                    <Link to={"all-users"} className="px-2 py-1 hover:bg-slate-100">All Users</Link>
                    <Link to={"all-products"} className="px-2 py-1 hover:bg-slate-100">All Products</Link>
                </nav>
        </div>
        </aside>
      <main className="w-full p-2.5 ">{<Outlet/>}</main>
    </div>
  );
};

export default AdminPanel;
