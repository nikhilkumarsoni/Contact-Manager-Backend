const{constants}=require('../constants');
const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode?res.statusCode:500;

    switch(statusCode){
        case constants.VALIDATION_ERROR:
                res.json({
                    title:"Validation Issue",
                    message:err.message, 
                    stacTrace: err.stack
                });
        case constants.NOT_FOUND:
                res.json({
                    title:"Not Found Error",
                    message:err.message, 
                    stacTrace: err.stack
                });
        case constants.UNAUTHORIZED:
                res.json({
                    title:"Unathorized",
                    message:err.message, 
                    stacTrace: err.stack
                });
        case constants.FORBIDDEN:
                res.json({
                    title:"forbidden",
                    message:err.message, 
                    stacTrace: err.stack
                });
        case constants.SERVER_ERROR:
                res.json({
                    title:"Server Error",
                    message:err.message, 
                    stacTrace: err.stack
                });
        default:
            console.log("No Error, All good!");
            break;
    }

};
module.exports=errorHandler;