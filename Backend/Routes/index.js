const express = require('express'); 
const router = express.Router();

const SignUpController = require("../Controllers/SignUp")
const {SignInController} = require("../Controllers/SignIn");
const UserDetails = require('../Controllers/UserDetails');
const AuthToken = require('../Middleware/AuthToken');
const userLogout = require('../Controllers/Logout');
const AllUsers = require('../Controllers/AllUsers');
const UpdateUser = require('../Controllers/UpdateUser');
const UploadProduct = require('../Controllers/UploadProduct');
const GetProduct = require('../Controllers/GetProduct');
const UpdateProduct = require('../Controllers/UpdateProduct');
const getCategory = require('../Controllers/Product/GetCategoryProduct');
const GetCategoryWiseProduct = require('../Controllers/Product/GetCategoryWiseProduct');
const GetProductDetails = require('../Controllers/Product/GetProductDetails');
const AddToCart = require('../Controllers/User/AddToCart');
const CountAddToCartProduct = require('../Controllers/User/CountAddToCartProduct');
const AddToCartViewProduct = require('../Controllers/User/AddToCartViewProduct');
const UpdateQuantityProduct = require('../Controllers/User/UpdateQuantityProduct');
const DeleteAddToCartProduct = require('../Controllers/User/DeleteAddToCartProduct');
const SearchProduct = require('../Controllers/Product/SearchProduct');

router.post("/signup",SignUpController)
router.post("/signin",SignInController)
router.get("/user-details",AuthToken,UserDetails)
router.get("/userLogout",userLogout)

//Admin Panel
router.get("/all-users",AuthToken,AllUsers)
router.post("/update-user",AuthToken,UpdateUser)

//Upload Product
router.post("/upload-product",AuthToken,UploadProduct)
router.get("/get-product",GetProduct)
router.post("/update-product",AuthToken,UpdateProduct)
router.get("/get-categoryproduct",getCategory)
router.post("/category-product",GetCategoryWiseProduct)
router.post("/product-details",GetProductDetails)

//User Add To Cart
router.post("/addtocart",AuthToken,AddToCart)
router.get("/CountAddToCartProduct",AuthToken,CountAddToCartProduct)
router.get("/view-cart-product",AuthToken,AddToCartViewProduct)
router.post("/update-cart-product",AuthToken,UpdateQuantityProduct)
router.post("/delete-cart-product",AuthToken,DeleteAddToCartProduct)

//Search Product
router.get("/search",SearchProduct)


module.exports = router;