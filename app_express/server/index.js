const userApi = require('./api/router/userApi');
const indexApi = require('./api/router/index');

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//后端api路由
app.use('/user',userApi);
app.use('/index',indexApi);


//监听端口
app.listen(8038);

console.log('success listen at port:8038.......');