'use strict'

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const logUtil = require('./server/util/LogUtil');
const logger = logUtil.createLogger('server.js');
const apiRouter = require('./server/router/ApiRouter');
const viewRouter = require('./server/router/ViewRouter');
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('views', __dirname + '/client/views').set("view engine", "ejs");
app.engine('ejs', require('ejs').renderFile);
app.use('/api',apiRouter);
app.use('/view',viewRouter);



/*app.get('*', (req ,res)=>{
    console.log(req);
    let Page404 = `
        <div style="text-align:center">
            <h3 style="width: 25%;font-size: 12rem;color: #409eff;margin: 0 auto;margin-top: 10%;">404</h3>
            <div style="font-size: 15px;color: #878d99;">太调皮，不过我喜欢...哼哼 &nbsp;<a href="/">返回首页</a></div>
        </div>
    `
    res.send(Page404)

});*/

app.get('/', function (req, res) {
    res.sendFile(__dirname+ "/public/backend/index.html" )
});

app.get('/', function (req, res) {
    res.redirect('/view/');
});

app.listen(8100, () => {
    logger.info(`server started at localhost:${8100} ` + new Date().toLocaleString());
})
