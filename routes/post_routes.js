
const express = require('express');
const routApp = express.Router()
routApp.use(express.json(()=>{}))
const {Post} = require('../model/post')

const postform = require('./../controllers/postController')



var bodyParser = require('body-parser');

routApp.use(bodyParser.json());
routApp.use(bodyParser.urlencoded({ extended: true }));

routApp.get('/post/newpost', postform.get_new_postform )

//  post publishing and redirecting home
routApp.post('/post/newpost', postform.post_new );

// request post
routApp.get('/post', postform.request_post);

routApp.get('/post/read/:id', postform.queryby_ID)
// get post for updating
routApp.get('/post/updatepost/:id', postform.get_4_update)
// Post updating
routApp.post('/post/updatepost/:id',postform.post_update )

// Delete post
routApp.delete('/post/deletepost/:id', postform.deletePost)
module.exports = {routApp}
