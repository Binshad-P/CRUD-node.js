const express=require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const {loginAdmin,registedAdmin} =require('../controllers/adminControllers')
const { upload } = require('../upload');
const {verifyToken,adminToken}=require('../middleware/middleware')
const { productdetails, allProducts, getEditproduct, updateProduct ,deleteProduct,user} = require('../controllers/productController');
const router=express.Router()


router.get("/sign-up", (req, res) => {
    if(!req.cookies.token){
    res.render("signup");}
    else{
        res.redirect('/')
    } // Provide the file extension '.ejs'
});

router.post("/sign-up", registerUser);

router.get("/log-in", (req, res) => {
    if(!req.cookies.token){
        res.render('login')
      }else{
        res.redirect('/')
      }
});
router.post("/log-in",loginUser);

router.get("/add", adminToken,(req, res) => {
    res.render("add"); // Provide the file extension '.ejs'
});

router.post("/add",adminToken,upload.single('image'),productdetails);
router.get('/admin',adminToken,allProducts)
router.get('/delete/:id',adminToken,deleteProduct)

router.get('/update/:id',adminToken,getEditproduct)
router.post('/update/:id',adminToken,updateProduct)
router.get('/',verifyToken,user)

router.get("/admin-signup",(req,res)=>{
    if(!req.cookies.adminToken){
    res.render("admin-signup")
    }else{
        res.redirect('/admin')
    }
})
router.post("/adsign-up",registedAdmin)

router.get("/admin-login", (req, res) => {
    if(!req.cookies.adminToken){
        res.render('admin-login')
    }else{
        res.redirect('/admin')
    }
});
router.post("/admin-login",loginAdmin)

router.get('/logoutadmin', (req, res) => {
   
    // Clear the 'token' cookie by setting it to an empty string and expiring it immediately
    res.cookie('adminToken', '', { expires: new Date(0) });
    
    // Redirect the user to a different page, e.g., the login page or homepage
    res.redirect('/admin-login'); 
})
router.get('/logout', (req, res) => {
    console.log(4545);
    // Clear the 'token' cookie by setting it to an empty string and expiring it immediately
    res.cookie('token', '', { expires: new Date(0) });
    
    // Redirect the user to a different page, e.g., the login page or homepage
    res.redirect('/log-in'); 
})


module.exports=router