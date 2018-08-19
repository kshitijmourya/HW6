var mongoose = require('mongoose');

var applicationSchema= mongoose.Schema({
username: String
}, { collection: 'developer' });


module.exports = applicationSchema;
