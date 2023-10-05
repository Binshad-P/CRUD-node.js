const jwt=require('jsonwebtoken')


function verifyToken(req,res,next){
    let authHeader = req.cookies.token
    if(authHeader==undefined){
        res.redirect('/log-in')
    }
    let token=authHeader.split(" ").pop()
    jwt.verify(token,"secret",function(err,decode){
        if(err){
            res.redirect('/log-in')
        }else{
          next()
        }

    })

}
function adminToken(req,res,next){
    let authHeaderAdmin=req.cookies.adminToken
    if(authHeaderAdmin==undefined){
        res.redirect('/admin-login')
    }
    let token=authHeaderAdmin.split(" ").pop()
    jwt.verify(token,"secret",function(err,decode){
        if(err){
            res.redirect('/admin-login')
        }else{








            
          next()
        }

    })

}

module.exports={verifyToken,adminToken}