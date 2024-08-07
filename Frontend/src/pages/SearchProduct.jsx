import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../../Common';
import VerticalCard from '../componennts/VerticalCard';

const SearchProduct = () => {

    const query = useLocation();
    //console.log("Query ::: ",query.search);
    const [data,setData] = useState([])
    const [loading,setloading] = useState(false)

    const fetchProduct = async () => {
        setloading(true)
        const response = await fetch(SummaryApi.searchProduct.url+query.search)
        const dataResponse = await response.json()
        // setloading(false)

        setData(dataResponse.data)
        console.log("dataResponse",dataResponse.data)   
    }

    useEffect(() => {
        fetchProduct()
    },[query])

  return (
    <div className='container mx-auto p-4'>
        {
            loading && (
                <p className='text-lg text-center '>Loading ...</p>
            )
        }

        <p>Search Results : {data.length}</p>
        
        {
            data.length === 0 && !loading &&(
                <p className='bg-white text-lg text-center p-4'>No Data Found ...</p>
            )
        }

        {
            data.length !== 0 && !loading && (
               <VerticalCard loading={loading} data={product}/>
            )
        }
    </div>
  )
}

export default SearchProduct
