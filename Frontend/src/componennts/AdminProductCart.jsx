import React, { useState } from 'react';
import editicon from '../assest/banner/editicon.svg';
import AdminEditProduct from './AdminEditProduct';
import Currency from '../Helpers/Currency';

const AdminProductCart = ({
data,
fetchData
}) => {
    const [editProduct,setEditProduct] = useState(false)

  return (
     <div className='bg-white p-4 rounded'>
        <div className='w-40'>
          <div className='w-32 h-32 ml-3 flex justify-center items-center overflow-hidden'>
          <img src={data?.productImage[0]}  alt="" className='object-cover h-full  mx-auto'/>

          </div>
            <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

            <div>
              {/* <p className='font-semibold line-through'>
                {
                  Currency(data?.price)
                }
              </p> */}
                <p className='font-semibold '>
                  {
                    
                    Currency(data.sellingPrice)
                  }
                  
                </p>
              <div className="bg-green-100 w-fit ml-auto p-2 cursor-pointer rounded-full hover:bg-green-600"
              onClick={()=>setEditProduct(true)}
              > 
                <img className='' src={editicon} alt="" width={12} height={12}/>
              </div>
            </div>
        </div>

        {
            editProduct && (
                <AdminEditProduct productData={data} onClose={()=> setEditProduct(false)} fetchData={fetchData}/>
            )
        }
    </div>
  )
}

export default AdminProductCart