var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');
var mysql = require('mysql');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title : 'Express'});
});

router.get('/list', function(req, res, next) {
  var nodelist = new Array();
  var client = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'test'
  });
  client.connect();
  client.query('select * from school_camera order by sort asc',
               function(err, rows, fields) {
                 for (var i = 0; i < rows.length; i++) { //循环查找出学校
                   if (!rows[i].pid) {
                     nodelist.push({
                       id : rows[i].id,
                       pId : rows[i].pid,
                       name : rows[i].name,
                       icon : '/stylesheets/zTreeStyle/img/diy/1_open.png',
                       click : false
                     });
                   } else {
                     nodelist.push({
                       id : rows[i].id,
                       pId : rows[i].pid,
                       name : rows[i].name,
                       ip : rows[i].ip,
                       channel : rows[i].channel,
                       icon : '/images/Camera_1.png'
                     });
                   }
                 }

                 res.render('list', {
                   title : "西城区学校监控视频预览",
                   data : JSON.stringify(nodelist)

                 });
                 client.destroy();
               });
});

router.get('/news', function(req, res, next) {
  superagent.get('https://cnodejs.org/')
      .end(function(err, sres) {
        // 常规的错误处理
        if (err) {
          return next(err);
        }
        // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
        // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
        // 剩下就都是 jquery 的内容了
        var $ = cheerio.load(sres.text);
        var items = [];
        $('#topic_list .topic_title')
            .each(function(idx, element) {
              var $element = $(element);
              items.push({
                title : $element.attr('title'),
                href : $element.attr('href')
              });
            });

        res.send(items);
      });
});
router.post('/', function(req, res, next) { res.send('get a post request'); });

module.exports = router;
