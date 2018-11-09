'use strict'

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const logUtil = require('./server/util/LogUtil');
const logger = logUtil.createLogger('server.js');
const apiRouter = require('./server/api/Router');
const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('views', __dirname + '/views').set("view engine", "ejs");
app.engine('ejs', require('ejs').renderFile);
app.use('/api',apiRouter);

app.get('/', (req ,res)=>{
    let Page404 = `
        <div style="text-align:center">
            <h1>Welcome to homepage</h1>
        </div>
    `
    res.send(Page404)
});



app.get('*', (req ,res)=>{
    console.log(req);
    let Page404 = `
        <div style="text-align:center">
            <h3 style="width: 25%;font-size: 12rem;color: #409eff;margin: 0 auto;margin-top: 10%;">404</h3>
            <div style="font-size: 15px;color: #878d99;">太调皮，不过我喜欢...哼哼 &nbsp;<a href="/">返回首页</a></div>
        </div>
    `
    res.send(Page404)

});

app.listen(7000, () => {
    logger.info(`server started at localhost:${7000} ` + new Date().toLocaleString());
})