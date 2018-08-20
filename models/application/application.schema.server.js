const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RoutingSchema = require('../Routing/routing.schema.server');
const Component = require('../component/component.model.server');
const Service = require('../Service/service.schema.server');

const ApplicationSchema = mongoose.Schema({
    name: String,
    components: [{ type: Schema.Types.ObjectId, ref: 'Component' }],
    services: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    routings: [RoutingSchema]
},{collection: 'application'});

module.exports = ApplicationSchema;
