const asyncHandler = require('express-async-handler');
const {DeleteUser} = require('../services/userDelete.service');
const getDeleteUser = asyncHandler(async(req,res)=>{
    const serviceResult = await DeleteUser(req.params.id,req.body);
    if(serviceResult.error){
        return res.status(400).json({message: serviceResult.error });
    }

    console.log(serviceResult.result);
    res.status(200).json(serviceResult.result);    

})
module.exports = {getDeleteUser};


