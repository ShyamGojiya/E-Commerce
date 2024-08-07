import React, { useState } from "react";
import ROLE from "../../Common/Role";
import deleterole from "../assest/banner/deleterole.svg";
import SummaryApi from "../../Common";
import { toast } from "react-toastify";

const ChangeUserRole = ({ userId, name, email, role, onClose, callFunc }) => {
  const [userRole, setUserRole] = useState(role);

  const handleSelect = (e) => {
    setUserRole(e.target.value);
    //console.log("e.target.value------------", e.target.value);
  };

  const UpdateUserRole = async () => {
    const fetchResponse = await fetch(SummaryApi.updateUser.url, {
      method: SummaryApi.updateUser.method,
      //Credentials: "include",
      // withCredentials: true,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });
    //console.log("URL ::::::::::::" ,userId)
    const responseData = await fetchResponse.json();
    //console.log("fetchResponse" ,responseData)
    //console.log("use Role : " ,role)

    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      callFunc();
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
        <button className="ml-auto block" onClick={onClose}>
          <img src={deleterole} alt="" width={15} height={15} />
        </button>
        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
        <p>Name : {name}</p>
        <p>Email : {email}</p>
        <div className="flex justify-between items-center my-4">
          <p>Role </p>

          {
            <select className="border px-4 py-1" onChange={handleSelect}>
              {role === "ADMIN" ? (
                <>
                  <option value="ADMIN">ADMIN</option>
                  <option value="GENERAL">GENERAL</option>
                </>
              ) : (
                <>
                  <option value="GENERAL">GENERAL</option>
                  <option value="ADMIN">ADMIN</option>
                </>
              )}

              {/* {
              Object.values(ROLE).map(el => {
                return (
                  <option value={el} key={el}>
                    {el}
                  </option>
                )
              })
            } */}
            </select>
          }
        </div>
        <button
          className="w-fit mx-auto block border px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-full"
          onClick={UpdateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
