import React, { useEffect, useState } from 'react'
import UploadProduct from '../componennts/UploadProduct'
import SummaryApi from '../../Common'
import AdminProductCart from '../componennts/AdminProductCart'

const AllProducts = (fetchData) => {

  const [openUpload,setOpenUpload] = useState(false)
  const [allProduct,setallProduct] = useState([])

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.getProduct.url,{method : 'get'})

    const responseData = await response.json()

    setallProduct(responseData?.data || [])
}

  useEffect(() => {
    fetchAllProduct()
  },[])
  

  return (
    <div>
      <div className='bg-white px-4 py-2 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Product</h2>
        <button className='border-2 border-red-600 py-1 px-3 transition-all rounded-full hover:bg-red-500 hover:text-white'
        onClick={() => {setOpenUpload(true)}}
        >Upload Product</button>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
          {
            allProduct.map((product,index)=>{
              return(
                <AdminProductCart data={product} key={index+"allproduct"} fetchData={fetchAllProduct} />
                
              )
            })
          }
      </div>

      {
        openUpload && (
          <UploadProduct onClose={() => {setOpenUpload(false)}} fetchData={fetchAllProduct}/>
        )
      }
    </div>
  )
}


export default AllProducts