const { json } = require('express/lib/response');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
//mysql connections pool
const mysql_pool = mysql.createPool({
    connectionLimit:100,
    host           : process.env.DB_HOST,
    user           : process.env.DB_USER,
    password       : process.env.DB_PASS,
    database       : process.env.DB_NAME
});

//get all user posts
exports.addUser = (req,res) => {

    let user_name         =  undefined !== req.body.username ? req.body.username : res.send("please provide proper  value for user name");
    let userpassword      =  undefined !== req.body.userpassword ? req.body.userpassword : res.send("please provide password");
    let email             =  undefined !== req.body.email ? req.body.email : res.send("please provide email");
    //Connect to DB
    mysql_pool.getConnection((err,connection) => {
        if(err) throw err; 
        connection.query('INSERT INTO  users SET USER_NAME =?,PASSWORD=?,EMAIL =?', [ user_name, userpassword , email ] ,(err,rows)=>{
        connection.release();
        if(!err){
            res.send('user created');
        }else{
           res.send(err);
        }
        });
    });
}
//get all user posts
exports.loginUser = (req,res) => {
    let user_name         =  undefined !== req.body.username ? req.body.username : res.send("please provide proper  value for user name");
    let userpassword      =  undefined !== req.body.userpassword ? req.body.userpassword : res.send("please provide password");
    //Connect to DB
    mysql_pool.getConnection((err,connection) => {
        if(err) throw err; 
        connection.query('SELECT * FROM users where USER_NAME =? AND PASSWORD =?', [ user_name, userpassword ] ,(err,rows)=>{
        connection.release();
        if(!err){
            if(rows.length >0){

                jwt.sign({rows}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
                    res.send(token);
                    }
                );

            }else{
                res.send('No user exist');
            }

        }else{
           res.send(err);
        }
        });
    });
}
