const jwt=require('../lib/jwt');


exports.auth=(req,res,next)=>{
    const token=req.header('X-Autorization');

    if(token){
        try {
            const decodetToken=jwt.verify(token, process.env.SECRET);
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