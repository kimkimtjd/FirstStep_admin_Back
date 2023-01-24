var express = require('express');
const app = express();
var router = express.Router();
var bodyParser = require('body-parser');
const cors = require('cors');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
// const { SolapiMessageService } = require('solapi');
// const messageService = new SolapiMessageService("NCSRT12VP7YRWOVF", "RN3FKGEIEFERFGPKHJUSASD7CQ2YKG87");

// db를 사용
var db = require('../config/db')

// 컨설팅 리스트
router.get('/Consulting/list',cors() , urlencodedParser  , function (req, res) {
    db.mysql.query(
        'SELECT a.id,a.Name,a.User,a.Entertime,a.Approve, b.Phone FROM Consulting AS a LEFT JOIN User AS b  ON a.User = b.email', (error, rows, fields) => {
             res.json(rows)
    });
});

// 클래스 리스트
router.get('/Class/list',cors() , urlencodedParser  , function (req, res) {
    db.mysql.query(
        'SELECT a.id,a.Name,a.User,a.Entertime,a.Approve, b.Phone FROM Tutoring AS a LEFT JOIN User AS b  ON a.User = b.email', (error, rows, fields) => {
             res.json(rows)
    });

});




module.exports = router;