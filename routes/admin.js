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


// 컨설팅 승인
router.post('/Consulting/Prove/:id',cors() , urlencodedParser  , function (req, res) {
    const id = req.params.id;

    db.mysql.query('SELECT * from Consulting WHERE id = ?', [id], (error, rows, fields) => {
        if (rows.length === 1) {
            db.mysql.query(" UPDATE Consulting SET Approve = ? WHERE id = ?",["Y", id] , function (err, result) {

                if (err) throw err;
                res.json({result: 'success'})            
            
              });
          
        }
        else {
            res.json({result: 'success'})            
        } 
    });

});


router.post('/Class/Prove/:id',cors() , urlencodedParser  , function (req, res) {
    const id = req.params.id;

    db.mysql.query('SELECT * from Tutoring WHERE id = ?', [id], (error, rows, fields) => {
        if (rows.length === 1) {
            db.mysql.query(" UPDATE Tutoring SET Approve = ? WHERE id = ?",["Y", id] , function (err, result) {

                if (err) throw err;
                res.json({result: 'success'})            
            
              });
          
        }
        else {
            res.json({result: 'success'})            
        } 
    });

});


module.exports = router;