const IndexController = require('../controller/IndexController');
const AccountController = require('../controller/AccountController');
const UserController = require('../controller/UserController');

module.exports = [
    {url:'/',clz:IndexController,method:'index',template:'index.ejs'},
    {url:'/login/index',clz:IndexController,method:'index',template:'login.ejs'},
    {url:'/regist/index',clz:IndexController,method:'index',template:'regist.ejs'},
    {url:'/pay/index',clz:IndexController,method:'index',template:'pay.ejs',roles:'USER'},
    {url:'/adjustment/index',clz:IndexController,method:'index',template:'adjustment.ejs'},
    {url:'/login/go',clz:UserController,method:'login',template:'index.ejs'},
    {url:'/regist/go',clz:UserController,method:'regist',template:'index.ejs'},
    {url:'/pay/go',clz:AccountController,method:'pay',roles:'USER'},
    {url:'/adjustment/go',clz:AccountController,method:'adjustment'},

];

