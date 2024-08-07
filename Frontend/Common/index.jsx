const backendDomain = "http://localhost:8080";

const SummaryApi = {
    signUp :  {
        url : `${backendDomain}/api/signup`,
        method : "post"
    },
    signIn :  {
        url : `${backendDomain}/api/signin`,
        method : "POST"
    },
    current_user :  {
        url : `${backendDomain}/api/user-details`,
        method : "get"
    },
    logout_user :  {
        url : `${backendDomain}/api/userLogout`,
        method : "get"
    },
    alluser :  {
        url : `${backendDomain}/api/all-users`,
        method : "get"
    },
    updateUser :  {
        url : `${backendDomain}/api/update-user`,
        method : "post"
    },
    uploadProduct :  {
        url : `${backendDomain}/api/upload-product`,
        method : "post"
    },
    getProduct :  {
        url : `${backendDomain}/api/get-product`,
        method : "get"
    },
    updateProduct :  {
        url : `${backendDomain}/api/update-product`,
        method : "post"
    },
    categoryproduct :  {
        url : `${backendDomain}/api/get-categoryproduct`,
        method : "get"
    },
    categoryWiseProduct : {
        url : `${backendDomain}/api/category-product`,
        method : "post"
    },
    productDetails :  {
        url : `${backendDomain}/api/product-details`,
        method : "post"
    },
    addToCartProduct :  {
        url : `${backendDomain}/api/addtocart`,
        method : "post"
    },
    addToCartProductCount :  {
        url : `${backendDomain}/api/CountAddToCartProduct`,
        method : "get"
    },
    AddToCartViewProduct :  {
        url : `${backendDomain}/api/view-cart-product`,
        method : "get"
    },
    updateCartProductQuantity :  {
        url : `${backendDomain}/api/update-cart-product`,
        method : "post"
    },
    deleteCartProduct :  {
        url : `${backendDomain}/api/delete-cart-product`,
        method : "post"
    },
    searchProduct :  {
        url : `${backendDomain}/api/search`,
        method : "get"
    },
}

export default SummaryApi;
// http://localhost:8080/api/signin