const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HandlerSchema = Schema({
    name: String,
    event: {
        type: String,
        enum: ['click', 'doubleclick', 'keypress', 'mousemove', 'mousewheel']
    },
    function: { type: Schema.Types.ObjectId, ref: 'Function' }
},{collection: 'handler'});

module.exports = HandlerSchema;
