import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../../Common'
import Context from '../Context';
import Currency from '../Helpers/Currency';
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const Cart = () => {

    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const context = useContext(Context);
    const loadingCart = new Array(context.cartProductCount).fill(null)

    const fetchData = async () => {
        // setLoading(true)
        const response = await fetch(SummaryApi.AddToCartViewProduct.url,{  
          method : SummaryApi.AddToCartViewProduct.method,
          credentials : 'include',
          headers : {
            "content-type" : 'application/json'
          }
      })
        // setLoading(false)
        const responseData = await response.json();

        if(responseData.success){
            setData(responseData?.data)
        }
    }

    const handleLoading = async() => {
        await fetchData()
    }

        useEffect(() => {
            setLoading(true)
            fetchData()
            setLoading(false)
        },[])


        const increaseQty = async(id,qty) => {
            const response = await fetch(SummaryApi.updateCartProductQuantity.url,{  
                method : SummaryApi.updateCartProductQuantity.method,
                credentials : 'include',
                headers : {
                    "content-type" : 'application/json'
                },
                body : JSON.stringify(
                    {
                        _id : id,
                        quantity : qty + 1
                    }
                )
            })
              const responseData = await response.json();

              if(responseData.success){
                fetchData()
              }
        }

        const decreaseQty = async(id,qty) => {
            if(qty >= 2){
                const response = await fetch(SummaryApi.updateCartProductQuantity.url,{  
                    method : SummaryApi.updateCartProductQuantity.method,
                    credentials : 'include',
                    headers : {
                        "content-type" : 'application/json'
                    },
                    body : JSON.stringify(
                        {
                            _id : id,
                            quantity : qty - 1
                        }
                    )
                })
                  const responseData = await response.json();
    
                  if(responseData.success){
                    fetchData()
                  }
            }
        }

        const deleteProduct = async(id) => {
            
            const response = await fetch(SummaryApi.deleteCartProduct.url,{  
                method : SummaryApi.deleteCartProduct.method,
                credentials : 'include',
                headers : {
                    "content-type" : 'application/json'
                },
                body : JSON.stringify(
                    {
                        _id : id
                    }
                )
            })
              const responseData = await response.json();

              if(responseData.success){
                fetchData()
                context.fetchUserAddToCart()
                toast.success(responseData.message);
              }
        }
        //console.log("datattt..",data)

        const totalQty = data.reduce((previousValue,currentValue) => previousValue + currentValue.quantity,0)
        const totalPrice = data.reduce((preve,curr)=>preve + (curr.quantity * curr?.productId?.sellingPrice),0)

  return (
    <div className='container mx-auto '>
        <div className='text-center text-lg my-3'>
            {
                data.length === 0 && !loading && (
                    <p className='bg-white py-5 font-semibold'>No Data</p>
                )
            }
        </div>
        
        <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
             {/* View Product */}
        <div className='w-full max-w-3xl lg:ml-5 md:mx-auto'>
            {
                loading ? (
                    loadingCart.map((el,index) => {
                        return(
                            <div key={el+"Add To Cart Loding"+index} className='w-full bg-slate-200 h-32 my-1 border border-slate-300 animate-pulse'>
                        
                            </div>
                        )
                    })
                    
                ) : (
                    <div>
                        {
                            data.map((product,index) => {
                               return (<div key={product?._id+"Add To Cart Loding"} className='w-full gap-5 mt-3 bg-white h-32 my-1 border border-slate-300 rounded grid grid-cols-[100px,1fr]'>
                                    <div className='w-32 h-32 bg-slate-200'>
                                        <img src={product?.productId?.productImage[0]} className='h-full w-full object-scale-down mix-blend-multiply'/>
                                    </div>
                                    <div className='px-4 py-2 relative'>
                                        {/* Delete Product */}
                                        <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer text-1.5xl' onClick={()=>deleteProduct(product?._id)}>
                                                <MdDelete/>
                                        </div>
                                        <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.productId?.category}</p>
                                        <div className='flex items-center justify-between'>
                                            <p className='text-red-600 font-medium text-lg'>{Currency(product?.productId?.sellingPrice)}</p>
                                            <p className='text-slate-600 font-semibold text-lg'>{Currency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                        </div>
                                        <div className='flex items-center gap-3 mt-2'>
                                            <button className='flex justify-center items-center border border-red-600 text-red-600 w-6 h-6 rounded hover:bg-red-600 hover:text-white' onClick={()=>decreaseQty(product?._id,product?.quantity)}>-</button>
                                                <span>{product?.quantity}</span>
                                            <button className='flex justify-center items-center border border-red-600 text-red-600 w-6 h-6 rounded hover:bg-red-600 hover:text-white' onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
                                        </div>
                                    </div>
                                        
                                </div>
                               )
                            })
                        }
                    </div>
                )
            }
        </div>
        {/* Summary  Product*/}
            <div className='mt-5 lg:mt-5 w-full mr-5 max-w-sm'>
            {
                loading ? (
                    <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                        Total
                    </div>
                ) : (
                    <div className='h-36 bg-white'>
                        <h2 className='text-white bg-red-600 px-4 py-1 font-semibold text-center'>
                            Summary
                        </h2>
                        <div className='flex items-center justify-between px-4 font-semibold text-lg text-slate-600 gap-2'>
                            <p>Quantity : </p>
                            <p>{totalQty}</p>
                        </div>
                        <div className='flex items-center justify-between px-4 font-semibold text-lg text-slate-600 gap-2'>
                            <p>Total Price : </p>
                            <p>{Currency(totalPrice)}</p>
                        </div>

                        <button className='bg-blue-600 p-2 text-white w-full border border-blue-600 hover:bg-white font-semibold rounded hover:text-blue-600'>Payment</button>
                    </div>
                )
            }
            </div>
        </div>
            
    </div>
  )
}

export default Cart
