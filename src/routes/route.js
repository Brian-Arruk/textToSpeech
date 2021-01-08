const {getComments,postAudio,postComments} = require('../controllers/controller');
const {Router} = require('express');

let route = new Router();

route.get('/coments', getComments);

route.post('/coments', postComments);

route.post('/audio', postAudio);

module.exports = route;