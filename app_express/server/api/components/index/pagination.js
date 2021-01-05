function Pagination(list,page,size,total,code,msg) { 
    var name = {}; 
    name.data = list;
    name.page = page;
    name.size = size;
    name.total = total[0].num;
    name.code = code;
    name.msg = msg;
    
    return name;

    // this.sayHello = function() { 
    //     console.log('Hello ' + name); 
    // }; 
}; 
module.exports = Pagination;

// var x = 5;
// var fn = function (value) {
//     return value + x;
// };
// global.warning = true;

// module.exports = fn;