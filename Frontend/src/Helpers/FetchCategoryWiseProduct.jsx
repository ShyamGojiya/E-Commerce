import SummaryApi from '../../Common'

const FetchCategoryWiseProduct = async(category) => {

    const response = await fetch(SummaryApi.categoryWiseProduct.url,{
        method : SummaryApi.categoryWiseProduct.method,
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            category : category
        })
    })
    // console.log("SummaryApi.categoryWiseProduct.url",SummaryApi.categoryWiseProduct.url)
    const dataResponse = (await response).json();

    return dataResponse;
}

export default FetchCategoryWiseProduct;