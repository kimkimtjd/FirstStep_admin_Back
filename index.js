const express = require("express");
const app = express();
var router = express.Router();
var bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// 유저관련
var Main = require('./routes/admin')
app.use('/api/admin', Main);


// app.use( express.static( path.join(__dirname, 'build') ) );

// app.get('/', function(request, response){
//   response.sendFile( path.join(__dirname, 'build/index.html') )
// });


app.listen(8000); // 80 => 3000번 포트로!
