var sqlMap = {
    //用户
    user:{
        add:'INSERT INTO user(name,age) VALUES(?,?)',
        find:'SELECT*FROM user',
    },
    index:{
        total:'SELECT COUNT(*) as num FROM websites',
        list:'SELECT*FROM websites',
        // list:'SELECT * FROM websites limit',//分页
        // select * from table limit (page_num-1)*page_size,page_size;
        menu_list:'SELECT*FROM menu_list',
        sql_menu_chilren:'SELECT*FROM menu_chilren',
        // search:'SELECT * FROM `websites` WHERE name LIKE '陈%''
    }

}

module.exports = sqlMap;