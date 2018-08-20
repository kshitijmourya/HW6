const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParameterSchema = Schema({
    name: String,
    parameterType: {
        type: String,
        enum: ['String', 'Number', 'Date']
    }
},{collection: 'parameter'});

module.exports = ParameterSchema;
