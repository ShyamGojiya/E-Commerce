import { useEffect, useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./componennts/Header";
import Footer from "./componennts/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SummaryApi from "../Common";
import axios from "axios";
import Context from "./Context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../Store/userSlice";


function App() {
  const dispatch = useDispatch();
  const [cartProductCount,setcartProductCount] = useState(0)

  const fetchUserDetails = async () => {
    //console.log("fetch started");
    const config = {
      // header:{"Content-Type":"application/json"},
      withCredentials: true,
      credentials: "include",
    };
    //console.log("fetch started 11");

    //const data = await axios.get(SummaryApi.current_user.url,config);
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      // Credentials: "include",
      withCredentials: true,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    //console.log("fetch half comp")
   // console.log("Come from App.jsx fetchuserDetaiils ::: ", dataApi);

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
    //console.log("data-user", dataApi);
  };

  const fetchUserAddToCart = async () => {
    const response = await fetch(SummaryApi.addToCartProductCount.url,{  
      method : SummaryApi.addToCartProductCount.method,
      credentials : 'include'
  })
    const dataApi = await response.json();
    // console.log("DataApi :::",dataApi)
    setcartProductCount(dataApi?.data?.count)
  
  }
  

  useEffect(() => {
    // User Details
    fetchUserDetails();
    // User Cart Product
    fetchUserAddToCart();
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, //User Details Fetch
          cartProductCount , //Current User Add To Cart Product Count
          fetchUserAddToCart
        }}>
        <ToastContainer 
        position="top-center"
        />
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
