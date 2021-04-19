'use strict'

import {MenuViewController} from './server/controller/view/'
const path = require('path');
const process = require('process');
const mod_getopt = require('posix-getopt');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const logUtil = require('./server/util/LogUtil');
const logger = logUtil.createLogger('server.js');
const apiRouter = require('./server/router/ApiRouter');
const viewRouter = require('./server/router/ViewRouter');
const system = require('./server/config/SystemConfig');
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

const  parser = new mod_getopt.BasicParser('p:(output)', process.argv);
let option = parser.getopt();
let port ;
while (option  !== undefined) {
    switch (option.option) {
        case 'p':
            port = process.argv[parser.optind()-1]
            break;
        default:
            break;
    }
    option = parser.getopt();

}

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



app.get('/', MenuViewController.getMenuView);

app.listen(port||8100, () => {
    logger.info(`server started at localhost:${port||8100} ` + new Date().toLocaleString());
})
