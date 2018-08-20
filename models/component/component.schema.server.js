const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComponentSchema = Schema({
    name: String,
    controller: { type: Schema.Types.ObjectId, ref: 'Controller' },
    view: { type: Schema.Types.ObjectId, ref: 'View' }
},{collection: 'component'});

module.exports = ComponentSchema;
