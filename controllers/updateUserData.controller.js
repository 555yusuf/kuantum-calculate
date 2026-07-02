const asyncHandler = require("express-async-handler");
const {getUpdatePassword} = require('../services/updateUser.service')
const updateUser = asyncHandler(async(req,res)=>{

    const serviceResult = await  getUpdatePassword(req.params.id,req.body);
    
    if(serviceResult.error){
        return res.status(400).json({ message: serviceResult.error });
    }

    console.log(serviceResult.result);
    
    res.status(200).json(serviceResult.result);
})

module.exports = {updateUser};