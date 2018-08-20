const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WidgetSchema = Schema({
    name: String,
    type: String,
    width: Number,
    height: Number,
    size: Number,
    src: String,
    style: String,
    class: String
},{collection: 'widget'});

module.exports =WidgetSchema;
