'use strict'

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
import React from 'react';
const ReactDOMServer = require('react-dom/server');

const logUtil = require('./util/LogUtil');
const logger = logUtil.createLogger('server.js');
const apiRouter = require('./routers/ApiRouter');
import Main from './components/Main';
const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views').set("view engine", "ejs");
app.engine('ejs', require('ejs').renderFile);
app.use('/api',apiRouter);

app.get('/', (req ,res)=>{
    const componentString = ReactDOMServer.renderToString( <Main/>);
    res.render("index",{title:"Test Title",component:componentString,scriptArray:["/assets/jquery.min.js","/assets/materialize/js/materialize.js"]});
});



app.get('*', (req ,res)=>{
    let Page404 = `
        <div style="text-align:center">
            <h3 style="width: 25%;font-size: 12rem;color: #409eff;margin: 0 auto;margin-top: 10%;">404</h3>
            <div style="font-size: 15px;color: #878d99;">太调皮辣，不过我喜欢...哼哼 😏👽 &nbsp;<a href="/">返回首页</a></div>
        </div>
    `
    res.send(Page404)

});

app.listen(7000, () => {
    logger.info(`server started at localhost:${7000} ` + new Date().toLocaleString());
})
