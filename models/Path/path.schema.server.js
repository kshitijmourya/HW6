const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ParameterSchema = require('../parameter/parameter.schema.server');

const PathSchema = Schema({
    name: String,
    path: String,
    pathParameters: [ParameterSchema]
},{collection: 'path'});

module.exports = PathSchema;
