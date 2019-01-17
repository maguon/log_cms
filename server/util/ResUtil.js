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


const resetMainPage = (res,title,cssArray,scriptArray,componentString)=>{

    res.render("index",{title:title,
        cssArray : cssArray,
        scriptArray : scriptArray,
        component:componentString
        //scriptArray:["/backend/lib/jquery.min.js","/backend/assets/plugins/materialize/js/materialize.js","/backend/assets/plugins/slider/ft-carousel.min.js"]
        }
    );
}


const resetErrorPage = (res ,error) => {
    let ErrorPage = `
        <div style="text-align:center">
            <h3 style="width: 25%;font-size: 12rem;color: #409eff;margin: 0 auto;margin-top: 10%;">500</h3>
            <span style="width: 25%;font-size: 1rem;color: #c00;margin: 0 auto;margin-top: 10%;"> ` +error.message +
        ` </span>
            <div style="font-size: 15px;color: #878d99;">出错了！！！😺😱 &nbsp;<a href="/">返回首页</a></div>
        </div>
    `
    res.send(ErrorPage)
}
const resetNotFoundPage = (res ) => {
    let NotFoundPage = `
        <div style="text-align:center">
            <h3 style="width: 25%;font-size: 12rem;color: #c00;margin: 0 auto;margin-top: 10%;">404</h3>
            <div style="font-size: 15px;color: #878d99;">太调皮辣，不过我喜欢...哼哼 😏👽 &nbsp;<a href="/">返回首页</a></div>
        </div>
    `
    res.send(NotFoundPage)
}
module.exports = { resetQueryRes,resetCreateRes,resetUpdateRes ,resetFailedRes ,resInternalError ,resetMainPage,resetErrorPage,resetNotFoundPage}