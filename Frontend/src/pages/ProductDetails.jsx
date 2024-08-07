import React, { useCallback,useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../../Common';
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import Currency from '../Helpers/Currency';
import VerticalCardProduct from '../componennts/VerticalCardProduct';
import CategoryWiseProductDisplay from '../componennts/CategoryWiseProductDisplay';
import AddToCart from '../Helpers/AddToCart';
import Context from '../Context';
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
    const [data,setData] = useState({
        productName : "",
        brandName : "",
        category : "",
        productImage : [],
        description : "",
        price : "",
        sellingPrice : "",
    })
    const params = useParams()
    const navigate = useNavigate();
    
    const [loading,setLoading] = useState(true)
    const productImageListLoading = new Array(4).fill(null)
    const [activeImage,setActiveImage] = useState("")

    const [zoomImageCoordinate,setzoomImageCoordinate] = useState({
        x : 0,
        y : 0
    })
    const [zoomImage,setzoomImage] = useState(false)
    const { fetchUserAddToCart } = useContext(Context);

    const fetchProductDetails = async() => {
        setLoading(true)
        const response = await fetch(SummaryApi.productDetails.url,{
            method : SummaryApi.productDetails.method,
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                productId : params?.id
            })
        })
        setLoading(false)
        const dataResponse = await response.json();
        setData(dataResponse?.data)
        setActiveImage(dataResponse?.data?.productImage[0])
        // console.log("Df",dataResponse?.data)
        
    }
        useEffect(()=> {
            fetchProductDetails()
        },[params])

        const handleMouseEnterProduct = (imageURL) =>{
            setActiveImage(imageURL)
        }
        const handleZoomImage = useCallback((e) => {
            setzoomImage(true)
            const {left,top,width,height} = e.target.getBoundingClientRect()

            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;

            setzoomImageCoordinate({
                x,
                y
            })
     
        },[zoomImageCoordinate])

        const handleLeaveZoomOutImage = () => {
            setzoomImage(false)
        }

        const handleAddToCart = async (e,id) => {
            await AddToCart(e,id)
            fetchUserAddToCart()
        }
        
        const handleBuyProduct = async (e,id) => {
            await AddToCart(e,id)
            fetchUserAddToCart()
            navigate("/cart")
        }
  return (
    <div className='container x-auto p-4'>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/* Product Images */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4 relative p-2'>
            <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200'>
                <img src={activeImage} alt="" className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveZoomOutImage}/>
            </div>

            {/* Product Zoom */}
            {
                zoomImage && (
                    <div className='hidden lg:block absolute min-w-[400px] min-h-[384px]  overflow-hidden bg-slate-200 p-1 -right-[420px] top-0'>
                        <div className='h-full w-full min-h-[400px] min-w-[400px] mix-blend-multiply scale-125'
                        style={{
                            backgroundImage : `url(${activeImage})`,
                            backgroundRepeat : 'no-repeat',
                            backgroundPosition : `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                        }}>                          
                        </div>
                    </div>
                )
            }
            


            <div className='h-full'>
                {
                    loading ? (
                        <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                            {
                                productImageListLoading.map((el,index)=>{
                                    return(
                                        <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingimage"+index}>

                                        </div>
                                    ) 
                                })
                            }
                        </div>
                        
                    ) : (
                        <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                            {
                                data?.productImage?.map((imgURL,index)=>{
                                    return(
                                        <div className='h-20 w-20 p-1 bg-slate-200 rounded' key={imgURL}>
                                            <img src={imgURL} alt="" className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={() => handleMouseEnterProduct(imgURL)} onClick={() => handleMouseEnterProduct(imgURL)}/>
                                        </div>
                                    ) 
                                })
                            }
                        </div>
                    )
                }
            </div>
        </div>
        {/* Product Details */}
        {
            loading ? 
            (
                <div className='grid gap-2 w-full'>
                    <p className='bg-slate-200 animate-pulse rounded-full h-6 lg:h-8 w-full inline-block'></p>
                    <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8 bg-slate-200 animate-pulse rounded-full w-full'></h2>
                    <p className='capitalize min-w-[100px] h-6 lg:h-8 bg-slate-200 animate-pulse rounded-full w-full'></p>

                    <div className='flex h-6 lg:h-8 bg-slate-200 animate-pulse rounded-full items-center gap-1 w-full'>
                    
                    </div>

                    <div className='flex items-center gap-2 text-2xl font-medium lg:text-3xl h-6 lg:h-8 animate-pulse w-full'>
                        <p className=' text-red-600 bg-slate-200 w-full'></p>
                        <p className='text-slate-400 line-through bg-slate-200 w-full'></p>
                    </div>

                    <div className='flex items-center gap-3 w-full my-2'>
                        <button className='h-6 lg:h-8 rounded-full bg-slate-200 animate-pulse w-full'></button>
                        <button className='h-6 lg:h-8 rounded-full bg-slate-200 animate-pulse w-full'></button>
                    </div>

                    <div className='w-full'>
                        <p className='h-6 lg:h-8 rounded-full bg-slate-200 animate-pulse'></p>
                        <p className='my-1 rounded-full lg:h-12 bg-slate-200 animate-pulse'></p>
                    </div>
                </div>
            ) :
             (
                <div className='flex flex-col gap-0 my-2'>
                    <p className='rounded-full bg-red-200 text-red-600 px-2 w-fit inline-block'>{data?.brandName}</p>
                    <h2 className='text-2xl lg:text-3xl font-medium'>{data?.productName}</h2>
                    <p className='capitalize text-slate-400'>{data?.category}</p>

                    <div className='flex text-red-600 items-center gap-1'>
                        <FaStar/>
                        <FaStar/>
                        <FaStar/>
                        <FaStar/>
                        <FaStarHalf/>
                    </div>

                    <div className='flex items-center gap-2 text-2xl font-medium lg:text-3xl'>
                        <p className=' text-red-600'>{Currency(data?.sellingPrice)}</p>
                        <p className='text-slate-400 line-through'>{Currency(data?.price)}</p>
                    </div>

                    <div className='flex items-center gap-3 w-full my-2'>
                        <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white' onClick={(e) =>handleBuyProduct(e,data?._id)}>Buy</button>
                        <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] bg-red-600 text-white font-medium hover:bg-white hover:text-red-600'  onClick={(e) =>handleAddToCart(e,data?._id)}>Add to Cart</button>
                    </div>

                    <div>
                        <p className='text-slate-400 font-medium my-1'>Description : </p>
                        <p className='text-slate-600 font-medium my-1'>{data?.description}</p>
                    </div>
                </div>
            )
                }
        </div>
            {
                data.category && (
                    <CategoryWiseProductDisplay category={data.category} heading={"Recommended Products"}/>
                )
            }
            
        </div>
  )

}

export default ProductDetails
