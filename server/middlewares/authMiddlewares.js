const jwt=require('../lib/jwt');
const {Secret}=require('../config/constants')


exports.auth=(req,res,next)=>{
    const token=req.header('X-Autorization');

    if(token){
        try {
            const decodetToken=jwt.verify(token, Secret);
            req.user=decodetToken;
            next()
        } catch (error) {
            res.status(401).json({
                message: error.message
            })
        }
    }else{
        next();
    }
}