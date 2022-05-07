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
exports.getPosts = (req,res) => {
    let token = verifyToken(req);
    if( 403 !== token){
        jwt.verify(token, 'secretkey', (err, authData) => {
            if(err) {
                res.send("unauthorize access");
            }
        });
    } 

    let user_id =  undefined !== req.body.userid ? req.body.userid : res.send("please provide proper numeric value for user id");
    //Connect to DB
    mysql_pool.getConnection((err,connection) => {
        if(err) throw err; 
        connection.query('SELECT * FROM user_posts where USER_ID =?', [ user_id ] ,(err,rows)=>{
            connection.release();
            if(!err){
                res.send(rows);
            }else{
                res.send(err);
            }
        })
    });
}
//add posts
exports.addPost = (req,res) => {
    let token = verifyToken(req);
    if( 403 !== token){
        jwt.verify(token, 'secretkey', (err, authData) => {
            if(err) {
              res.send("unauthorize access");
            }
        });
    }
    let user_id         =  undefined !== req.body.userid ? req.body.userid : res.send("please provide proper numeric value for user id");
    let post_content    =  undefined !== req.body.postcontent ? req.body.postcontent : res.send("please provide post content");
    let post_image_url  =  undefined !== req.body.postimageurl ? req.body.postimageurl : res.send("please provide post image url");
    let comment         = '';
    //Connect to DB
    mysql_pool.getConnection((err,connection) => {
        if(err) throw err; 
        connection.query('INSERT INTO  user_posts SET USER_ID =?,POST_CONTENT=?,POST_IMAGE_URL =?,POST_COMMENT_IDS =?', [ user_id, post_content , post_image_url ,comment ] ,(err,rows)=>{
        connection.release();
        if(!err){
            res.send('Post created');
        }else{
           res.send(err);
        }
        });
    });
}
//delete posts
exports.deletePost = (req,res) => {
    let token = verifyToken(req);
    if( 403 !== token){
        jwt.verify(token, 'secretkey', (err, authData) => {
            if(err) {
              res.send("unauthorize access");
            }
        });
    }
    let post_id         =  undefined !== req.body.postid ? req.body.postid : res.send("please provide proper numeric value for post id");

    //Connect to DB
    mysql_pool.getConnection((err,connection) => {
        if(err) throw err; 
        connection.query('DELETE from  user_posts  where ID =?', [ post_id ] ,(err,rows)=>{
        connection.release();
        if(!err){
            res.send('Post Deleted');
        }else{
           res.send(err);
        }
        });
    });
}
//edit posts
exports.editPost = (req,res) => {  
    let token = verifyToken(req);
    if( 403 !== token){
        jwt.verify(token, 'secretkey', (err, authData) => {
            if(err) {
                res.send("unauthorize access");
            }
        });
    }
    let user_id         =  undefined !== req.body.userid ? req.body.userid : res.send("please provide proper numeric value for user id");
    let post_id         =  undefined !== req.body.postid ? req.body.postid : res.send("please provide proper numeric value for post id");
    let post_content    =  undefined !== req.body.postcontent ? req.body.postcontent : res.send("please provide post content");
    let post_image_url  =  undefined !== req.body.postimageurl ? req.body.postimageurl : res.send("please provide post image url");
    let comment         =  undefined !== req.body.comment ? req.body.comment : res.send("please provide post image url");
    //Connect to DB
    mysql_pool.getConnection((err,connection) => {
        if(err) throw err; 
        connection.query('UPDATE  user_posts  SET USER_ID =?,POST_CONTENT=?,POST_IMAGE_URL =?,POST_COMMENT_IDS =? where ID =?', [ user_id, post_content , post_image_url ,comment,post_id ] ,(err,rows)=>{
        connection.release();
        if(!err){
            res.send('Post Updated');
        }else{
           res.send(err);
        }
        });
    });
}

function verifyToken(req) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
       return bearerToken;
    } else {
      // Forbidden
      return 403;
    }
}