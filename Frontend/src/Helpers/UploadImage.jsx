const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME_CLOUDINARY}/image/upload`
console.log("env--------",import.meta.env.VITE_CLOUD_NAME_CLOUDINARY);


const UploadImage = async(image) => {
    const formData = new FormData()
    formData.append("file",image)
    formData.append("upload_preset","mern_product")

    const dataResponse = await fetch(url,{
        method : "post",
        body : formData
    })
    return dataResponse.json()
}

export default UploadImage