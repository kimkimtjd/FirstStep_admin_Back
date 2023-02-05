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

// 컨설팅 상세보기
router.get('/Consulting/detail/:id',cors() , urlencodedParser  , function (req, res) {

    const id = req.params.id;

    db.mysql.query(
        'SELECT * from Consulting WHERE id = ?',[id] , (error, rows, fields) => {
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

// 컨설팅 상세보기
router.get('/Class/detail/:id',cors() , urlencodedParser  , function (req, res) {

    const id = req.params.id;

    db.mysql.query(
        'SELECT * from Tutoring WHERE id = ?',[id] , (error, rows, fields) => {
             res.json(rows)
    });
});

// 컨설팅 승인 하기
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

// 클래스 승인 하기
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

/* -------------------------- 입금확인 ----------------------------- */

// 입금확인건 리스트
router.get('/pay/list',cors() , urlencodedParser  , function (req, res) {
    db.mysql.query(
        'SELECT a.Nickname,a.email,b.id,b.Pay,b.Category,c.User,b.pay_yn FROM User AS a RIGHT JOIN Consulting_Process AS b  ON a.email = b.mentIr_id LEFT JOIN User_add AS c ON SUBSTRING_INDEX(b.mentor_id, ",", 1) = c.User', (error, rows, fields) => {
             res.json(rows)
    });
});


module.exports = router;