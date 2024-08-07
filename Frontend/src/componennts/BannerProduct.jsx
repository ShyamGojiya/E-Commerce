import React, { useEffect, useState } from 'react'
import image1 from '../assest/banner/img1.webp';
import image2 from '../assest/banner/img2.webp';
import image3 from '../assest/banner/img3.jpg';
import image4 from '../assest/banner/img4.jpg';
import image5 from '../assest/banner/img5.webp';
import image1Mobile from '../assest/banner/img1_mobile.jpg';
import image2Mobile from '../assest/banner/img2_mobile.webp';
import image3Mobile from '../assest/banner/img3_mobile.jpg';
import image4Mobile from '../assest/banner/img4_mobile.jpg';
import image5Mobile from '../assest/banner/img5_mobile.png';
import nextRight from '../assest/banner/nextRight.svg';
import nextLeft from '../assest/banner/nextLeft.svg';

const BannerProduct = () => {

  const [currentImage,setCurrentImage] = useState(0)

  const desktopImages = [
    image1,
    image2,
    image3,
    image4,
    image5,
  ]

  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ]

  const nextImage = () => {
    if(desktopImages.length - 1 > currentImage){
      setCurrentImage(preve => preve + 1)
    } 
  }
  const preveImage = () => {
    if(desktopImages.length != 0 > currentImage){
      setCurrentImage(preve => preve - 1)
    }
  }

  useEffect(() => {

    const interval = setInterval(() => {
      if(desktopImages.length - 1 > currentImage){
        nextImage()
      }else{
        setCurrentImage(0)
      }
    },4000)

    return () => clearInterval(interval)
  },[currentImage])

  return (
    <div className='container mx-auto px-4 rounded'>
      <div className='h-72 w-full bg-slate-200 relative'>
        <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
          <div className='flex justify-between w-full'>
            <button onClick={preveImage}><img src={nextLeft} alt="" height={25} width={25} className='rounded-full p-1'/></button>
            <button onClick={nextImage}><img src={nextRight} alt="" height={25} width={25} className='rounded-full p-1'/></button>
          </div>
        </div>
        
        {/* {Desktop & Tablet} */}
        <div className='hidden md:flex w-full h-full overflow-hidden'>
        {
          desktopImages.map((imageURL,index)=>{
            return(
              <div className='h-full w-full  min-w-full min-h-full' key={imageURL+index} style={{transform : `translateX(-${currentImage*100}%)`}}>
                <img src={imageURL} alt="" className='w-full h-full' />
              </div>
            )
          })
        }
        </div>

         {/* {Mobile} */}
         <div className='flex w-full h-full overflow-hidden md:hidden'>
        {
          mobileImages.map((imageURL,index)=>{
            return(
              <div className='h-full w-full  min-w-full min-h-full' key={imageURL+index} style={{transform : `translateX(-${currentImage*100}%)`}}>
                <img src={imageURL} alt="" className='w-full h-full' />
              </div>
            )
          })
        }
        </div>

        
       
    </div>
    </div>
  )
}

export default BannerProduct
