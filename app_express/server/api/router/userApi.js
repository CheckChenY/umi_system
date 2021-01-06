var models = require('../../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../../sqlMap');

var code = require('../code/index');



//连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();

var jsonWrite = function(res,ret,num,status){
    if(typeof ret === 'undefined'){
        res.json({
            code:'0',
            msg:'操作失败'
        });
    }else{
        res.json({
            code:status,
            msg:code.err[num],
            data:ret
        });
    }
}



router.post('/addUser',(req,res)=>{
    let sql = $sql.user.add;
    let params = req.body;
    console.log(params);
    conn.query(sql,[params.name,params.age],function(err,result){
        if(err){
            console.log('失败:' + err);
            return;
        }

        if(result){
            res.send(jsonWrite(res,result));
        }
    })
});


router.post('/loginIn',(req,res)=>{
    let sql = $sql.user.find;
    let params = req.body;

    conn.query(sql,[params.name,params.password],function(err,result){
        if(err){
            console.log('失败:' + err);
            return;
        }

        // console.log(res.json);
        result.map((show,i)=>{
            if(show.name !== params.name){
                res.send(jsonWrite(res,'',10001,0));
                return;
            }
            if(show.password !== params.password){
                res.send(jsonWrite(res,'',10002,0));
                return;
            }
        })
        const data = result[0];
        delete data.password;
        
        res.cookie('userId', params.name, {
            // path: '/',
            maxAge: 1000 * 60 * 60 // 设置cookie时间
        });
        // console.log(result);
        
        res.send(jsonWrite(res,data,10000,1));

    })
})

module.exports = router;
