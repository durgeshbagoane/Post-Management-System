const express       = require ('express');
const port          = process.env.PORT || 5000;

//.env file setup
require('dotenv').config();

const app               = express();

//parsing application/json
app.use(express.urlencoded({ extended: true }));
// Parse application/json
app.use(express.json());

// routes setup
const post_routes       = require('./server/routes/post');
const comment_routes    = require('./server/routes/comment');
const user_routes       = require('./server/routes/users');

app.use('/post',post_routes);
app.use('/comment',comment_routes);
app.use('/user',user_routes);


app.listen(port,() => console.log(`listening on port ${port}`));