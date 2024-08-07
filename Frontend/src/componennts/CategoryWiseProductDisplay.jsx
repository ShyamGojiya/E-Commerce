import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import FetchCategoryWiseProduct from '../Helpers/FetchCategoryWiseProduct'
import Currency from '../Helpers/Currency'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import AddToCart from '../Helpers/AddToCart';
import { Link } from 'react-router-dom';
import Context from '../Context';
import ScrollTop from '../Helpers/ScrollTop';


    const CategoryWiseProductDisplay = ({category , heading}) => {

        const [data,setData] = useState([])
        const [loading,setLoading] = useState(true)
        const loadingList = new Array(13).fill(null)

        const { fetchUserAddToCart } = useContext(Context);

        const handleAddToCart =async(e,id) => {
           await AddToCart(e,id)
           fetchUserAddToCart()
        }


        const fetchData = async() => {
            setLoading(true)
            const categoryProduct = await FetchCategoryWiseProduct(category)
            setLoading(false)
            //console.log("categoryProduct",categoryProduct?.data)
            setData(categoryProduct?.data)
        }

        useEffect(()=>{
            fetchData() 
        },[])

    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
            
                <div className='grid grid-cols-[repeat(auto-fit,minmax(280px,300px))] justify-between md:gap-6 overflow-x-scroll scrollbar-none'>

                    {
                        loading ? (
                            loadingList.map((product,index)=>{
                                return(
                                    <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                                        <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                                            {/* <img src={product?.productImage[0]} className='h-full object-scale-down hover:scale-110 transition-all mix-blend-multiply'/> */}
                                        </div>
                                        <div className='p-4 grid gap-2 animate-pulse'>
                                            <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 p-1 py-2 bg-slate-200 rounded-full'></h2>
                                            <p className='capitalize text-slate-500 p-1 py-2 bg-slate-200 rounded-full'></p>
                                            <div className='flex gap-4'>
                                                <p className='text-red-600 font-medium p-2 py-2 w-full bg-slate-200 rounded-full'></p>
                                                <p className='text-slate-500 line-through p-1 py-2 w-full bg-slate-200 rounded-full'></p>
                                            </div>
                                            <button className='text-sm px-3 rounded-full py-2 text-white p-1 bg-slate-200'></button>
                                        </div>
                                    </div>
                                    )
                                })
                        ) : (
                            data.map((product,index)=>{
                        return(
                            <Link to={"/product/"+product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow' onClick={ScrollTop}>
                                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                    <img src={product?.productImage[0]} className='h-full object-scale-down hover:scale-110 transition-all mix-blend-multiply'/>
                                </div>
                                <div className='p-4 grid gap-2'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1'>{product?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.category}</p>
                                    <div className='flex gap-4'>
                                        <p className='text-red-600 font-medium'>{Currency(product?.sellingPrice)}</p>
                                        <p className='text-slate-500 line-through'>{Currency(product?.price)}</p>
                                    </div>
                                    <button className='text-sm bg-red-600 hover:bg-red-700 py-1 px-3 rounded-full text-white'  onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                                </div>
                            </Link>
                            )
                        })
                        )
                    
                    }
                </div>   
        </div>
    )
    }

    export default CategoryWiseProductDisplay;
