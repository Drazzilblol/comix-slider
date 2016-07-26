var express = require('express');
var router = express.Router();
var jsdom = require('jsdom');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

var mongoose = require('mongoose');
var ComixNumber = require('../models/ComixNumber.js');


/* GET /todos listing. */
router.get('/', function (req, res, next) {
    ComixNumber.find(function (err, comixes) {
        if (err) return next(err);
        res.json(comixes);
    });

});

/* POST /todos */
router.post('/', function (req, res, next) {
    var comixUrl = req.body.comixName;
    var numberUrl = req.body.numberName;
    console.log(comixUrl + "/" + numberUrl);
    jsdom.env(
        "http://readcomics.me/online-reading/comicsonline/" + comixUrl + "/" + numberUrl,
        ["http://code.jquery.com/jquery.js"],
        function (err, window) {
            var $ = window.$;

            var pageCount = $('.C').last().find(' option:last-child').val();
            var firstPage = $(".ForRead").find("a img").prop("src");
            firstPage = firstPage.slice(0, firstPage.indexOf(".png") - 1);


            var pages = [];
            for (var i = 1; i <= pageCount; i++) {

                pages.push(firstPage + i + ".png")
            }
            console.log(pages);

           /* var number = {
                pages: pages
            };
            Number.create(com, function (err, post) {
                if (err) return next(err);
                res.json(post);
            });*/
        });
});

/* GET /todos/id */
router.get('/:id', function (req, res, next) {
    Number.findOne({'id': req.params.id}, function (err, number) {
        if (err) return next(err);
        res.json(number);
    });
});


module.exports = router;