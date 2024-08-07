import React from 'react'

const Imgtobase = async (image) => {

    const reader = new FileReader();
    reader.readAsDataURL(image);

    const data = await new Promise((resolve,reject) => {
        reader.onload = () => resolve(reader.result);

        reader.onerror = error => PromiseRejectionEvent(error);
    });

    return data;
}

export default Imgtobase;