var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
	userId: String,
    userName: String,
    userAge: Number,
    userBirth: Date,
    adminYn: Boolean,
    flagList: Array
});

module.exports = mongoose.model('customer', customerSchema);