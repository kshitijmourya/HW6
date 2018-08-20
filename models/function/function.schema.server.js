const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ParameterSchema = require('../parameter/parameter.schema.server');

const FunctionSchema = Schema({
    name: String,
    parameters: [ParameterSchema]
},{collection: 'function'});

module.exports = FunctionSchema;
