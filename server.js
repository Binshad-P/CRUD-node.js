const express=require("express")
const path = require('path')
const nocache = require("nocache");
const {connectDb} = require("./config/dbConnection");
const cookieParser = require('cookie-parser');




const app =express()
connectDb()
app.set('view engine', 'ejs');
app.use(nocache());
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,"public")))

// Routes for rendering views
app.use('/',require('./routes/routes'))

const port=2001
app.listen(port,()=>{
    console.log(`listing to the server on http://localhost:${port}`)
})


