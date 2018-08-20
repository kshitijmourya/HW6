const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PathSchema = require('../Path/path.schema.server');

const RoutingSchema = Schema({
    name: String,
    path: PathSchema,
    component: { type: Schema.Types.ObjectId, ref: 'Component'}
},{collection: 'routing'});

module.exports = RoutingSchema;
