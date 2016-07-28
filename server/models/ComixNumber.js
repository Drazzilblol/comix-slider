'use strict'
;
var mongoose = require('mongoose');

var ComixNumberShema = new mongoose.Schema({
    id: String,
    comixId: String,
    numberName: String,
    pages: Array
});

module.exports = mongoose.model('ComixNumber', ComixNumberShema);