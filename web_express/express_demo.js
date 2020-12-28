var express = require('express');
var app = express();

// app.get('/',function(req,res){
//     res.send('hello world');
// })

// var server = app.listen(8080,function(){

//     var host = server.address().address;
//     var port = server.address().port;

//     console.log('应用实例，访问的地址为 http://%s:%s',host,port);

// })

//////////////////////////////////////////////////////////////////////////////////
//取静态文件
// var express = require('express');
// var app = express();

// app.use('/public', express.static('public'));

// app.get('/', function (req, res) {
//     res.send('Hello World');
// })

// var server = app.listen(8888, function () {

//     var host = server.address().address
//     var port = server.address().port

//     console.log("应用实例，访问地址为 http://%s:%s", host, port)

// })

//////////////////////////////////////////////////////////////////////////////////
//get 请求
// app.use('/public', express.static('public'));

app.get('/index.html', function (req, res) {
    console.log(__dirname + '/' + 'index.html');
    res.sendFile(__dirname + '/' + 'index.html');

})

app.get('/process_get', function (req, res) {

    var response = {
        "username": req.query.username,
        'password': req.query.password
    }

    console.log(response);
    res.end(JSON.stringify(response));
})

var server = app.listen(8888, function () {

    var host = server.address().host;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})