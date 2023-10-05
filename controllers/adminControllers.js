const Admin=require('../models/adminModel')
const jwt=require("jsonwebtoken")





const registedAdmin=async(req,res)=>{
    console.log(req.body);
    const{username,email,password,confirmpassword,dob}=req.body
    console.log(req.body,5555555);
    if(!username || !email || !password || !confirmpassword || !dob){
        res.status(404)
        throw new Error("all feild are mandatory");
    }
const existingAdmin=await Admin.findOne({email})
if(existingAdmin){
    res.status(404)
    throw new Error("user already exist")
}   
if(password!==confirmpassword){
    res.status(404)
    throw new Error("password not match")
}
const admin=new Admin({username,email,password,confirmpassword,dob})
console.log(admin,11111);
await admin.save()
res.redirect('/admin-login')
}
const loginAdmin=async(req,res)=>{
    const{email,password}=req.body
    if(!email||!password){
        res.status(404)
        throw new Error("all feild are mandatory")
    }
    const existingAdmin=await Admin.findOne({email})
    if(!existingAdmin){
        res.status(404)
        throw new Error("pls enter correct email")
    }   
    if(password!== existingAdmin.password){
        res.status(404)
        throw new Error("password not match")
    }else{
    // res.redirect('/')
    let resp={
        id:existingAdmin.id,
    }
    let token=jwt.sign(resp,"secret",{expiresIn:'60d'})
    res.cookie('adminToken',token)
    res.redirect('/admin')

    }
   
  
}

module.exports={ loginAdmin,registedAdmin}