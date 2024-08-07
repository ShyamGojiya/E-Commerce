import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import FetchCategoryWiseProduct from '../Helpers/FetchCategoryWiseProduct'
import Currency from '../Helpers/Currency';
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import AddToCart from '../Helpers/AddToCart';
import Context from '../Context';


    const HorizontalCardProduct = ({category , heading}) => {

        const [data,setData] = useState([])
        const [loading,setLoading] = useState(false)
        const loadingList = new Array(13).fill(null)
        const [scroll,setScroll] = useState(0)
        const scrollElement = useRef()

        const fetchData = async() => {
            setLoading(true)
            const categoryProduct = await FetchCategoryWiseProduct(category)
            setLoading(false)
            //console.log("categoryProduct",categoryProduct?.data)
            setData(categoryProduct?.data)
        }
        const { fetchUserAddToCart } = useContext(Context);

        const handleAddToCart =async  (e,id) => {
           await AddToCart(e,id)
           fetchUserAddToCart()
        }

        useEffect(()=>{
            fetchData() 
        },[])

        const scrollRight = () => {
            scrollElement.current.scrollLeft += 300
        }
        const scrollLeft = () => {
            scrollElement.current.scrollLeft -= 300
        }
    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
            
                <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none' ref={scrollElement}>

                <button className='bg-white rounded-full shadow-md p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft/></button>
                <button className='bg-white rounded-full shadow-md p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}><FaAngleRight/></button>
                    { 
                        loading ? (
                            loadingList.map((product,index)=>{
                                return(
                                    <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                                        <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>
                                            {/* <img src={product?.productImage[0]} className='h-full object-scale-down hover:scale-110 transition-all'/> */}
                                        </div>
                                        <div className='p-4 grid w-full gap-2 animate-pulse'>
                                            <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 p-1 bg-slate-200 rounded-full'></h2>
                                            <p className='capitalize text-slate-500 p-1 bg-slate-200 rounded-full'></p>
                                            <div className='flex gap-3 w-full'>
                                                <p className='text-red-600 font-medium p-1 bg-slate-200 w-full rounded-full'></p>
                                                <p className='text-slate-500 line-through p-1 bg-slate-200 w-full rounded-full'></p>
                                            </div>
                                            <button className='text-sm py-0.5 px-3 rounded-full text-white p-1 bg-slate-200'></button>
                                        </div>
                                    </div>
                                    )
                                })
                        ) : (
                            data.map((product,index)=>{
                                return(
                                    <Link to={"product/"+product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                                        <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] '>
                                            <img src={product?.productImage[0]} className='h-full object-scale-down hover:scale-110 transition-all'/>
                                        </div>
                                        <div className='p-4 grid'>
                                            <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1'>{product?.productName}</h2>
                                            <p className='capitalize text-slate-500'>{product?.category}</p>
                                            <div className='flex gap-4'>
                                                <p className='text-red-600 font-medium'>{Currency(product?.sellingPrice)}</p>
                                                <p className='text-slate-500 line-through'>{Currency(product?.price)}</p>
                                            </div>
                                            <button className='text-sm bg-red-600 hover:bg-red-700 py-0.5 px-3 rounded-full text-white' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
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

    export default HorizontalCardProduct;
