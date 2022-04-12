const SuccessResponse = (res,statusCode,message,data)=>{
    return res.status(statusCode).json({
        success:true,
        error:message,
        data:data
    });
}

module.exports = SuccessResponse;