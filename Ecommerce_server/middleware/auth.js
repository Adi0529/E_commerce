const jwt = require("jsonwebtoken");

require("dotenv").config();


function auth(req,res,next){

    try{


        const authHeader = req.headers.authorization;


        if(!authHeader){

            return res.status(401).send({
                success:false,
                msg:"Please Login"
            });

        }
        // Bearer token
        const token = authHeader.split(" ")[1];


        if(!token){
            return res.status(401).send({success:false,msg:"Invalid Token"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);

        req.user={
            id:decoded.id,
            role:decoded.role
        };
        next();

    }
    catch(error){

        console.log(error);

        return res.status(401).send({

            success:false,

            msg:"Invalid or Expired Token"

        });

    }

}




function admin(req,res,next){


    if(req.user.role === "Admin"){

        next();

    }

    else{

        return res.status(403).send({

            success:false,

            msg:"Only Admin can access"

        });

    }


}



function Vendor(req,res,next){
    if(req.user.role === "Vendor"){
        next();
    }

    else{
        return res.status(403).send({success:false,msg:"Only Vendor can access"});
    }


}



module.exports={
    auth,
    admin,
    Vendor
};