const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const VariableSchema = require('../Variable/variable.schema.server');

const ControllerSchema = Schema({
    name: String,
    handler: [{ type: Schema.Types.ObjectId, ref: 'Handler' }],
    variables: [VariableSchema],
    services: [{ type: Schema.Types.ObjectId, ref: 'Service'}]
},{collection: 'controller'});

module.exports = ControllerSchema;
