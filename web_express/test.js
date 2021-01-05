var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sys'
});

connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
// });

/////////////////////////////////////////////////////////
//查询
// var  sql = 'SELECT * FROM websites';
// //查
// connection.query(sql,function (err, result) {
//         if(err){
//           console.log('[SELECT ERROR] - ',err.message);
//           return;
//         }
 
//        console.log('--------------------------SELECT----------------------------');
//        console.log(result);
//        console.log('------------------------------------------------------------\n\n');  
// });
 
// connection.end();
//////////////////////////////////////////////////////////////////////////////////////
//添加
// var addsql = 'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
// var addSqlParams = ['菜鸟工具','https://c.runoob.com.com','23453','CN'];
// connection.query(addsql,addSqlParams,function(err,result){
//     if(err){
//         console.log('[INSTER ERROR] -',err.message);
//         return;
//     }

//     console.log('-------------------------INSTER------------');
//     console.log('INSTER ID',result);
//     console.log('-------------------------------------');

// });

// connection.end();

/////////////////////////////////////////////////////////////////////////////////
//更新
// var modsql = 'UPDATE websites SET name = ? ,url = ? WHERE Id = ?';
// var modSqlParams = ['菜鸟移动站','http://baidu.com','4'];

// connection.query(modsql,modSqlParams,function(err,result){
//     if(err){
//         console.log('错误日志：' ,err.message);
//         return
//     }

//     console.log('-----------------update----------');
//     console.log(result.affectedRows);
//     console.log('-----------------------------');

// })

// connection.end();

/////////////////////////////////////////////////////////////////////////////////
//删除
var delsql = 'DELETE FROM websites where id=4';
connection.query(delsql,function(err,result){
    if(err){
        console.log(err.message);
        return;
    }

    console.log(result);

})

connection.end();



