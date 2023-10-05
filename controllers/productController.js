const product = require("../models/productModel")
const Product=require("../models/productModel")
const fs=require('fs')

const productdetails= async (req, res) => {
    const{productname,description}=req.body
    const image=req.file.filename
    // const img = image.split()
    
    if(!productname || !image || !description){
        res.status(404)
        throw new Error("all feild are mandatory");
    }
    try {
  
      // Create a new product record with the image path
      const newProduct = new Product({
        productname,
        image, 
        description
        // Store the image path in the database
      });
  
      await newProduct.save();
      res.redirect("/admin")
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
    
  }
  const allProducts= async(req,res)=>{
    const products=await Product.find()
    res.render("admin",{products})
  }

  const getEditproduct =async (req,res)=>{
    const {id} = req.params
    const product = await Product.findById(id)
    
    res.render('edit-product',{product})
  }
  const updateProduct=async(req,res)=>{
    const{id}=req.params
  
    let new_image=""
  
    if(req.file){
      new_image=req.file.filename
     try {
      fs.unlinkSync('/uploads'+req.body.old_image)
     } catch (error) {
      console.log(error)
     } 
    }else{
      new_image=req.body.old_image
    }
   const product= await Product.findByIdAndUpdate(id,{
      productname:req.body.productname,
      image:new_image,
      description:req.body.description
    }
    )
    console.log(product,'product');
    if(product){
      res.redirect('/admin')
    }else{
      res.json({message:error.message,type:"danger"})
    }
  }
 
  const deleteProduct = async (req, res) => {
    console.log(req.params.id, 5454);
    const { id } = req.params;
    console.log(id, 11111111);
    const result = await Product.findByIdAndRemove(id);
    console.log(result, 'delproduct');

    if (result.image != "") {
        try {
            fs.unlinkSync('public/uploads/'+ result.image);
        } catch (error) {
            console.log(error);
        }
    }
    res.redirect('/admin'); // Make sure the redirect URL is correct
};
const user= async(req,res)=>{
  const products=await Product.find()
  console.log(products)
  
  res.render("user",{products})

}

module.exports={productdetails,allProducts,getEditproduct, updateProduct,deleteProduct,user}