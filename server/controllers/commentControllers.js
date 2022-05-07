const mysql = require('mysql');
const jwt = require('jsonwebtoken');
//mysql connections pool
const mysql_pool = mysql.createPool({
    connectionLimit:100,
    host           :process.env.DB_HOST,
    user           : process.env.DB_USER,
    password       : process.env.DB_PASS,
    database       : process.env.DB_NAME
});

//get post all  comments
exports.getComments = (req,res) => {
    let token = verifyToken(req);
    if( 403 !== token){
        jwt.verify(token, 'secretkey', (err, authData) => {
            if(err) {
              res.send("unauthorize access");
            }
        });
    }
    let post_id =  undefined !== req.body.postid ? req.body.postid : res.send("please provide proper numeric value for post id");
    //Connect to DB
    mysql_pool.getConnection((err,connection) => {
        if(err) throw err; 
        connection.query('SELECT * FROM post_comments where POST_ID =?', [ post_id ] ,(err,rows)=>{
            connection.release();
            if(!err){
                res.send(rows);
            }else{
                res.send(err);
            }
        })
    });
}
//add comment
exports.addComment = (req,res) => {
    let token = verifyToken(req);
    if( 403 !== token){
        jwt.verify(token, 'secretkey', (err, authData) => {
            if(err) {
              res.send("unauthorize access");
            }
        });
    }
    let post_id =  undefined !== req.body.postid ? req.body.postid : res.send("please provide proper numeric value for post id");
    let comment_content    =  undefined !== req.body.commentcontent ? req.body.commentcontent : res.send("please provide comment content");
    
    //Connect to DB
    mysql_pool.getConnection((err,connection) => {
        if(err) throw err; 
        connection.query('INSERT INTO  post_comments SET POST_ID =?,COMMENT_CONTENT=?', [ post_id,comment_content ] ,(err,rows)=>{
        connection.release();
        if(!err){
            res.send('comment created');
        }else{
           res.send(err);
        }
        });
    });
}
//delete comment
exports.deleteComment = (req,res) => {
    let token = verifyToken(req);
    if( 403 !== token){
        jwt.verify(token, 'secretkey', (err, authData) => {
            if(err) {
              res.send("unauthorize access");
            }
        });
    }
    let comment_id         =  undefined !== req.body.commentid ? req.body.commentid : res.send("please provide proper numeric value for comment id");

    //Connect to DB
    mysql_pool.getConnection((err,connection) => {
        if(err) throw err; 
        connection.query('DELETE from  post_comments  where ID =?', [ comment_id ] ,(err,rows)=>{
        connection.release();
        if(!err){
            res.send('Comment Deleted');
        }else{
           res.send(err);
        }
        });
    });
}
//edit comment
exports.editComment = (req,res) => {
    let token = verifyToken(req);
    if( 403 !== token){
        jwt.verify(token, 'secretkey', (err, authData) => {
            if(err) {
              res.send("unauthorize access");
            }
        });
    }
    let comment_id         =  undefined !== req.body.commentid ? req.body.commentid : res.send("please provide proper numeric value for comment id");
    let post_id         =  undefined !== req.body.postid ? req.body.postid : res.send("please provide proper numeric value for post id");
    let comment_content    =  undefined !== req.body.commentcontent ? req.body.commentcontent : res.send("please provide comment content");
    //Connect to DB
    mysql_pool.getConnection((err,connection) => {
        if(err) throw err; 
        connection.query('UPDATE  post_comments  SET POST_ID =?,COMMENT_CONTENT=? where ID =?', [ post_id, comment_content ,comment_id ] ,(err,rows)=>{
        connection.release();
        if(!err){
            res.send('Comment Updated');
        }else{
           res.send(err);
        }
        });
    });
}

function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
}