'use strict'
;
var mongoose = require('mongoose');

var ComixNumberShema = new mongoose.Schema({

    id: String,
    numbers: Array
});

module.exports = mongoose.model('ComixNumber', ComixNumberShema);