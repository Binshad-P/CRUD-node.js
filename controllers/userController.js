const User=require("../models/userModels")
const jwt=require("jsonwebtoken")


//middleware







const registerUser=async(req,res)=>{
    console.log(req.body);
    const{username,email,password,confirmpassword}=req.body
    if(!username || !email || !password || !confirmpassword){
        res.status(404)
        throw new Error("all feild are mandatory");
    }
const existingUser=await User.findOne({email})
if(existingUser){
    res.status(404)
    throw new Error("user already exist")
}   
if(password!==confirmpassword){
    res.status(404)
    throw new Error("password not match")
}
const user=new User({username,email,password,confirmpassword})
await user.save()
res.redirect('/log-in')
}



const loginUser=async(req,res)=>{
    const{email,password}=req.body
    if(!email||!password){
        res.status(404)
        throw new Error("all feild are mandatory")
    }
    const existingUser=await User.findOne({email})
    if(!existingUser){
        res.status(404)
        throw new Error("pls enter correct email")
    }   
    if(password!== existingUser.password){
        res.status(404)
        throw new Error("password not match")
    }else{
    // res.redirect('/')
    let resp={
        id:existingUser.id,
    }
    let token=jwt.sign(resp,"secret",{expiresIn:'60d'})
    res.cookie('token',token)
    res.redirect('/')

    }
    //middleware
  
}

module.exports={registerUser,loginUser}