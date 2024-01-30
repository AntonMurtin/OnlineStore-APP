const router=require('express').Router();
const userManager=require('../manager/userManager')
const {errorMessages} =require('../utils/errorHelper')


router.post('/register', async(req,res)=>{
    
    try {
       const result= await userManager.register(req.body);

        res.json(result)
    } catch (error) {
       res.status(400).json({
        message:errorMessages(error)
       })
    }
});

router.post('/login',async (req,res)=>{
   
    try {
         const result=await userManager.login(req.body);
         res.json(result);
    } catch (error) {
        res.status(400).json({
            message:errorMessages(error)
           })
    }
});

router.get('/logout', (req,res)=>{
    res.end()
})
module.exports=router;