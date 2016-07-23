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
        "http://comics-online.ru/main/" + comixUrl + ".html",
        ["http://code.jquery.com/jquery.js"],
        function (err, window) {
            var $ = window.$;
            var numbers = [];
            var arr = $("#dle-content").find("div p a").filter(function (i, html) {
                if(!$(html).prop("target").localeCompare("_blank") )return false;
                return true;

            })
            var length = arr.length;
            arr.each(function (i, html) {
                numbers.push({
                    id: length - i,
                    name: $(html).text(),
                    url: $(html).prop("href")
                })
            });

            var com = {
                title: $("#dle-content").find('div h2').text(),
                coverUrl: $("#dle-content").find('div img').prop("src"),
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
    jsdom.env(
        "http://comics-online.ru/main/" + req.params.id + ".html",
        ["http://code.jquery.com/jquery.js"],
        function (err, window) {
            var $ = window.$;
            var numbers = [];
            var arr = $("#dle-content").find("div p a").filter(function (i, html) {
                if(!$(html).prop("target").localeCompare("_blank") )return false;
                return true;

            })
            var length = arr.length;
            arr.each(function (i, html) {
                    numbers.push({
                        id: length - i,
                        name: $(html).text(),
                        url: $(html).prop("href")
                    })
            });

            var com = {
                title: $("#dle-content").find('div h2').text(),
                coverUrl: $("#dle-content").find('div img').prop("src"),
                numbers: numbers
            };
            Comix.create(com, function (err, post) {
                if (err) return next(err);
                res.json(post);
            });

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