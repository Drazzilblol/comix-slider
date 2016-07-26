var express = require('express');
var router = express.Router();
var jsdom = require('jsdom');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

var mongoose = require('mongoose');
var Comix = require('../models/Comix.js');


router.param(['id', 'page'], function (req, res, next, value) {
    console.log('CALLED ONLY ONCE with', value);
    next();
});

/* GET /todos listing. */
router.get('/', function (req, res, next) {

    Comix.find(function (err, comixes) {
        if (err) return next(err);
        res.json(comixes);
    });

});

/* POST /todos */
router.post('/', function (req, res, next) {
    var comixUrl = req.body.comixUrl;
    console.log(comixUrl);
    jsdom.env(
        comixUrl,
        ["http://code.jquery.com/jquery.js"],
        function (err, window) {
            var $ = window.$;
            var numbers = [];
            var arr = $(".MagListLine").find("a")
            var length = arr.length;
            console.log(length);

            arr.each(function (i, html) {
                numbers.push({
                    id: length - i,
                    name: $(html).text(),
                    url: $(html).prop("href")
                })
            });

            var com = {
                title: $(".ops").find('div p strong').first().text(),
                coverUrl: $(".ops").find('div img').last().prop("src"),
                numbers: numbers
            };
            Comix.create(com, function (err, post) {
                if (err) return next(err);
                res.json(post);
            });

        });
});

/* GET /todos/id */
router.get('/:id', function (req, res, next) {
    Comix.findOne({'_id': req.params.id}, function (err, comix) {
        if (err) return next(err);
        res.json(comix);
    });
});

/* PUT /todos/:id */
router.put('/:id', function (req, res, next) {
    Comix.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE /todos/:id */
router.delete('/:id', function (req, res, next) {
    Comix.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;