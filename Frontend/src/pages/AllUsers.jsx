import React, { useEffect, useState } from "react";
import SummaryApi from "../../Common";
import { toast } from "react-toastify";
import moment from 'moment';
import editicon from '../assest/banner/editicon.svg';
import ChangeUserRole from "../componennts/ChangeUserRole";

const AllUsers = () => {
  const [alluser, setAllUser] = useState([]);
  const [openUpdateRole, setopenUpdateRole] = useState(false);
  const [UpdateUSerDetails, setUpdateUSerDetails] = useState({
    email : "",
    name : "",
    role : "",
    _id : ""
  });

  const fetchAllUsers = async () => {
    //console.log("SummaryApi.alluser.url", SummaryApi.alluser.url);
    const fetchdata = await fetch(SummaryApi.alluser.url, {
      method: SummaryApi.alluser.method,
      credentials: "include",
    });
    //console.log("----------fetchdaata-------------", fetchdata);
    const dataResponse = await fetchdata.json();
    //console.log("-----------dataResponse------------", dataResponse);
    if (dataResponse.success) {
      setAllUser(dataResponse.data);
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="bg-white pb-4 ">
      <table className="w-full userTable">
        <thead>
          <tr className="bg-red-600 text-white">
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {alluser.map((el, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{el?.name}</td>
                <td>{el?.email}</td>
                <td>{el?.role}</td>
                <td>{moment(el?.createdAt).format("ll")}</td>
                <td>
                  <button className="bg-green-100 p-2 cursor-pointer rounded-full hover:bg-green-500 hover:text-red"
                  onClick={()=>{
                    setUpdateUSerDetails(el)
                    setopenUpdateRole(true)
                    //console.log("Role :",el?.role)
                    }}>
                    <img src={editicon} alt="" width={12} height={12}/>
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {
        openUpdateRole && (
          <ChangeUserRole 
            onClose={()=>setopenUpdateRole(false)}
            name={UpdateUSerDetails.name}
            email={UpdateUSerDetails.email}
            role={UpdateUSerDetails.role}
            userId={UpdateUSerDetails._id}
            callFunc={fetchAllUsers}           
          />
          )
        }
    </div>
  );
};

export default AllUsers;
