var express = require('express');
var router = express.Router();
var jsdom = require('jsdom');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

var mongoose = require('mongoose');
var ComixNumber = require('../models/ComixNumber.js');


/* POST /todos */
/*router.post('/:id', function (req, res, next) {

    var comixId = req.params.id;
    var numberUrl = req.body.numberUrl;

    jsdom.env(
        numberUrl,
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

            var number = {
                comixId: comixId,
                numberName: n.name,
                pages: pages,
                id: n.id
            };



        });

});*/

/* GET /todos/id */
router.get('/:comixId/:numberId', function (req, res, next) {
    ComixNumber.findOne({'comixId': req.params.comixId, 'id': req.params.numberId}, function (err, number) {
        if (err) return next(err);
        res.json(number);
    });
});


/* GET /todos listing. */
router.get('/', function (req, res, next) {
    ComixNumber.find(function (err, comixes) {
        if (err) return next(err);
        res.json(comixes);
    });

});
module.exports = router;