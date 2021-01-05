var models = require('../../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../../sqlMap');

var Pagination = require('../components/index/pagination');

// console.log($sql);


//连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();


router.get('/listuser', function (req, res) {

    // console.log(req.query.page);
    // console.log(req.query.size);
    const page = req.query.page;
    const size = req.query.size;
    const params = [(parseInt(page) - 1) * parseInt(size), parseInt(size)]
    //查询本地数据库数据
    var sql_total = $sql.index.total;
    var sql = 'SELECT * FROM websites limit ?,?';
    // select * from table limit (page_num-1)*page_size,page_size;
    // console.log(sql);
    conn.query(sql_total,function(err,total){
        if(err){
            console.log('查询数据库失败' + err);
            return;
        }

        conn.query(sql,params,function(err,result){
            if(err){
                console.log('查询数据库失败' + err);
                return;
            }
            

            // var pagination = new Pagination();
            var data = Pagination(result,page,size,total,1,'操作成功');
            // console.log(data);
            // arr = result;
            // console.log(result);
            // arr.push(result);
            res.send(data);
        })
    })
})


router.get('/search', function (req, res) {

    // console.log(req.query.page);
    // console.log(req.query.size);
    const name = req.query.name;
    const page = req.query.page;
    const size = req.query.size;
    const params = [name + '%'];
    //查询本地数据库数据
    // var sql_total = $sql.index.total;
    // var sql = 'SELECT * FROM websites limit ?,?';
    var sql_total = 'SELECT COUNT(*) as num FROM `websites` WHERE name LIKE ?'
    var sql = 'SELECT * FROM `websites` WHERE name LIKE ?'
    // select * from table limit (page_num-1)*page_size,page_size;
    // console.log(sql);
    conn.query(sql_total,params,function(err,total){
        if(err){
            console.log('查询数据库失败' + err);
            return;
        }

        conn.query(sql,params,function(err,result){
            if(err){
                console.log('查询数据库失败' + err);
                return;
            }
            

            // var pagination = new Pagination();
            var data = Pagination(result,page,size,total,1,'操作成功');
            // console.log(data);
            // arr = result;
            // console.log(result);
            // arr.push(result);
            res.send(data);
        })
    })
})






router.get('/menulist', function (req, res) {

    var sql_menu_list = $sql.index.menu_list;
    var sql_menu_chilren =  $sql.index.sql_menu_chilren;

    conn.query(sql_menu_list,function(err,result){
        if(err){
            console.log('错误日志:' + err);
            return ;
        }

        conn.query(sql_menu_chilren,function(err,item){
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


module.exports = router;