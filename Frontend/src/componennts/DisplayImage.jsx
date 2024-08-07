import React from "react";
import deleterole from "../assest/banner/deleterole.svg";


const DisplayImage = ({imgUrl, onClose}) => {
    console.log("FDF",imgUrl)
  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center">
        <div className="bg-white  shadow rounded max-w-5xl mx-auto p-4 ">
        <div className='cursor-pointer flex justify-end ' onClick={onClose}>
                        <img className='object-cover filter transition duration-100 hover:filter-red transform hover:scale-100' src={deleterole} alt="" width={15} height={15} />
                    </div>
        <div className="flex justify-center p-4 max-w-[70vh] max-h-[80vh] ">
      <img src={imgUrl} alt="" className="w-full h-full" />
      
    </div>
        </div>
    </div>
  );
};

export default DisplayImage;
