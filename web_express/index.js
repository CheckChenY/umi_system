var express = require('express');
var app = express();
var fs = require('fs');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    port:'3306',
    database:'sys'
})

console.log(__dirname);
connection.connect();

var msg = {
    "statu":true,
    "msg":"成功"
}


//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/listuser', function (req, res) {
    //查询本地json数据
    // fs.readFile(__dirname + "/src/data/" + "users.json", "utf8", function (err, data) {
    //     if (err) {
    //         return console.log(err);
    //     }   
    //     console.log('请求数据成果');
    //     res.end(data);
    // })

    //查询本地数据库数据
    var sql = 'SELECT*FROM websites';
    connection.query(sql,function(err,result){
        if(err){
            console.log('查询数据库失败' + err);
            return;
        }

        // arr = result;
        // console.log(result);
        // arr.push(result);
        res.send(result);
    })
    
    // console.log('查询成功1:' + arr );
    // connection.end();

    
    // console.log('查询成功2:' + arr );

    // res.end(arr);


})

app.get('/menulist', function (req, res) {
    // fs.readFile(__dirname + "/src/data/" + "menu.json", "utf8", function (err, data) {
    //     if (err) {
    //         return console.log(err);
    //     }   

    //     console.log('请求数据成果');

    //     res.end(data);
    // })

    /////////////////////////
    var sql_menu_list = 'SELECT*FROM menu_list';
    var sql_menu_chilren = 'SELECT*FROM menu_chilren';

    connection.query(sql_menu_list,function(err,result){
        if(err){
            console.log('错误日志:' + err);
            return ;
        }

        connection.query(sql_menu_chilren,function(err,item){
            if(err){
                console.log('错误日志:' + err);
                return ;
            }

            result.map((data,i)=>{
                if(data.id === item[0].sign){
                    data.chilren = item
                }
            })

            // console.log(result);
    
            res.send(result);
        })

    })


})
// //添加的新用户数据


// //添加数据
app.get('/addlist', function (req, res) {

    // fs.readFile( __dirname + "/src/data/user.json", 'utf8', function (err, data) {
        
    //     data = JSON.parse( data );
    //     // console.log(data);
        
    //     var response = {
    //         "key" : data.length +1,
    //         "name":req.query.name,
    //         "age": req.query.age,
    //         "address":req.query.address,
    //     };
    //     data.push(response);

    //     res.end(JSON.stringify(msg));
    // });

        var addSqlParams = [
            req.query.name,req.query.url,req.query.alexa,req.query.country
        ];
        console.log(addSqlParams);

        var addsql = 'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';

        connection.query(addsql,addSqlParams,function(err,result){
            if(err){
                console.log('错误日志:' + err);
                return ;
            }

            res.send(JSON.stringify(msg));
        })



 })



//  app.get('/search', function (req, res) {
//     // 首先我们读取已存在的用户
//     fs.readFile( __dirname + "/src/data/users.json", 'utf8', function (err, data) {
//         data = JSON.parse(data);
//         var item;
//         console.log(req.query.name);
//         if(req.query.name){
//             console.log(111111);
//             data.forEach(res=>{
//                 if(req.query.name === res.key){
//                     item = res;
//                 }
//             })
//             res.end(JSON.stringify(item));
//         }else{
//             console.log(22222);
//             res.end(JSON.stringify(data));
//         }
//     });
//  })





var server = app.listen(8888, function () {
    var host = server.address().host;

    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port);
})