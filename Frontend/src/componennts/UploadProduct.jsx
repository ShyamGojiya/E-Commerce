import { useEffect, useState } from 'react';
import deleterole from "../assest/banner/deleterole.svg";
import uploadicon from "../assest/banner/uploadicon.svg";
import ProductCategory from '../Helpers/ProductCategory';
import UploadImage from '../Helpers/UploadImage';
import DisplayImage from './DisplayImage';
import wrongdeleteicon from "../assest/banner/wrongdeleteicon.svg";
import SummaryApi from '../../Common';
import { toast } from "react-toastify";


const UploadProduct = ({onClose,fetchData}) => {
     
    const [data,setData] = useState({
        productName : "",
        brandName : "",
        category : "",
        productImage : [],
        description : "",
        price : "",
        sellingPrice : ""
    })
    const [openfullScreen,setopenFullScreen] = useState(false)
    const [fullImage,setFullImage] = useState("")
    // const [uploadProductImageInput,setuploadProductImageInput] = useState("")

    const HandleOnChange = (e) => {
        const {name,value} = e.target;

        setData((preve) => {
            return{
                ...preve,
                [name] : value
            }
        })
    }
    const HandleUploadProduct = async(e) => {
        const file = e.target.files[0]
        // setuploadProductImageInput(file.name)
        //console.log("file",file)

        const uploadImageCloud = await UploadImage(file);

        setData((preve) => {
            return{
                ...preve,
                productImage : [...preve.productImage , uploadImageCloud.url]
            }
        })
    }
        const HandleDeleteImage = async(index) => {
            console.log("key",index)
            const newProductImage = [...data.productImage]
            newProductImage.splice(index,1)

            setData((preve) => {
                return{
                    ...preve,
                    productImage : [...newProductImage]
                }
            })
        }
        //console.log("upload Image",uploadImageCloud.url)

        // Upload Product
        const HandleSubmit = async (e) => {
            e.preventDefault();
            // console.log("data",data);
            //console.log("SummaryApi.uploadProduct.url",SummaryApi.uploadProduct.url)
            const response = await fetch(SummaryApi.uploadProduct.url,{
                method : SummaryApi.uploadProduct.method,
                credentials : 'include',
                headers : {
                    "content-type" : "application/json",
                },
                body : JSON.stringify(data)
            })
            
            const responseData = await response.json();

            if(responseData.success){
                toast.success(responseData?.message)
                onClose()
                fetchData()
                // HandleSubmit
            }
            if(responseData.error){
                toast.error(responseData?.message)
            }
        }
        useEffect(() => {
            HandleSubmit()
        },[])
    
  return (
    <div className='fixed h-full w-full top-0 left-0 right-0 bottom-0 bg-slate-200 bg-opacity-35 flex justify-center items-center'>
        <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>    
            <div className='flex justify-between items-center pb-3'>
                <h2 className='font-bold text-lg'>Upload Product</h2>
                    <div className='cursor-pointer' onClick={onClose}>
                        <img className='object-cover filter transition duration-100 hover:filter-red transform hover:scale-100' src={deleterole} alt="" width={15} height={15} />
                    </div>
            </div>
            <form className='grid gap-3 p-4 overflow-y-scroll h-full pb-5' onSubmit={HandleSubmit}>
                <label htmlFor="productName">Product Name : </label>
                <input type="text" 
                id='productName' 
                name='productName'
                placeholder='Enter Product Name' 
                value={data.productName}
                onChange={HandleOnChange}
                className='bg-slate-100 p-2 border rounded'
                required
                />

                <label htmlFor="brandName" className='mt-3'>Brand Name : </label>
                <input type="text" 
                id='brandName'
                name='brandName' 
                placeholder='Enter Brand Name' 
                value={data.brandName}
                onChange={HandleOnChange}
                className='bg-slate-100 p-2 border rounded'
                required
                />

                <label htmlFor="category" className='mt-3'>Category : </label>
                <select 
                name="category"
                id='category'
                value={data.category} 
                onChange={HandleOnChange}
                required
                className='bg-slate-100 p-2 border rounded'>
                    <option value="">Select Category</option>
                    {
                        ProductCategory.map((el,index)=>{
                            return(
                                <option value={el.value} >{el.label}</option>
                                
                            )
                        })
                    }
                </select>

                <label htmlFor="productImage" className='mt-3'>Product Image : </label>
                    <label htmlFor='uploadImageInput' className='cursor-pointer'>
                        <div className='p-2 bg-slate-100 border rounded w-full h-32 flex justify-center items-center flex-col'>
                            <img src={uploadicon} width={60} height={60} className='opacity-50'/>
                            <p>Upload Product Image</p>
                            <input className='hidden' type="file" id='uploadImageInput' onChange={HandleUploadProduct}/>
                        </div>
                    </label>
                    <div>
                        {
                            data?.productImage[0] ? (     
                                <div className='flex items-center gap-2'>
                                    {
                                      data.productImage.map((el,index) => {
                                        return(
                                            <div className='relative group' key={index}>
                                                <img src={el} 
                                                alt={el} 
                                                width={90}
                                                height={90}
                                                value={data.productImage} 
                                                // onChange={HandleUploadProduct}
                                                className='bg-slate-100 border cursor-pointer'
                                                required
                                                onClick={()=> {setopenFullScreen(true)
                                                setFullImage(el)
                                                }}/>
                                                <div className='absolute bottom-0 right-0 p-1 cursor-pointer bg-red-500 rounded-full hover:bg-red-600 hidden group-hover:block' 
                                                onClick={()=>HandleDeleteImage(index)}>
                                                    <img className='' src={wrongdeleteicon} alt="" width={12} height={12}/>
                                                </div>
                                            </div>
                                        )
                                    })      
                                    }
                                </div>
                                
                            ) : (
                                <p className='text-red-600 text-xs'>*Please Upload Product Image</p>
                            )

                        }
                    </div>

                    <label htmlFor="price" className='mt-3'>Price : </label>
                    <input type="number" 
                    id='price'
                    name='price' 
                    placeholder='Enter Price' 
                    value={data.price}
                    onChange={HandleOnChange}
                    required
                    className='bg-slate-100 p-2 border rounded'
                    />

                    <label htmlFor="sellingPrice" className='mt-3'>Selling Price : </label>
                    <input type="number" 
                    id='sellingPrice'
                    name='sellingPrice' 
                    placeholder='Enter Price' 
                    value={data.sellingPrice}
                    onChange={HandleOnChange}
                    required
                    className='bg-slate-100 p-2 border rounded'
                    />

                    <label htmlFor="description" className='mt-3'>Description : </label>
                    <textarea
                    className='h-28 bg-slate-100 border p-1 resize-none'
                    placeholder='Enter Product Description'
                    name="description" 
                    id="description" 
                    value={data.description}
                    onChange={HandleOnChange}
                    required
                    rows={3}></textarea>

                    <button className='px-3 py-2  bg-red-600 text-white mb-6 hover:bg-red-700'>Upload Product</button>
            </form>
        </div>

        {
            openfullScreen && (

                <DisplayImage onClose={()=> setopenFullScreen(false)} imgUrl={fullImage}/>
            )
        }

    </div>
  )
 
}

export default UploadProduct