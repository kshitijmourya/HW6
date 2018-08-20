const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = Schema({
    name: String
},{collection: 'service'});

module.exports = ServiceSchema;
