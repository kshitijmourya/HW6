const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeveloperSchema = Schema({
    username: String,
    applications: [{ type: Schema.Types.ObjectId, ref: 'Application'}]
},{collection: 'developer'});

module.exports = DeveloperSchema;
