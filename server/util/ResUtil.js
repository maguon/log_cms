'use strict'


const resetQueryRes =(res,result,errMsg) => {
    res.status(200).send({success : true,result:result,msg:errMsg});
}

const resetCreateRes = (res,result,errMsg) => {
    if(result && result._id){
        res.status(200).send({success : true,id:result._id});
    }else{
        res.status(200).send({success : false,msg:errMsg});
    }
}

const resetUpdateRes = (res,result,errMsg) =>{
    //if(result && result.affectedRows>0){
    if(result && result !=null){
        res.status(200).send({success : true});
    }else{
        res.status(200).send({success : false,msg:errMsg});
    }
}

const resetFailedRes = (res,errMsg) => {
    res.status(200).send({success : false,msg:errMsg});
}

const resInternalError = (error , res ) =>{
    res.status(500).send({ msg: error.message });
}
module.exports = { resetQueryRes,resetCreateRes,resetUpdateRes ,resetFailedRes ,resInternalError }