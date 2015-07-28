var mongoose = require('mongoose');

var appSchema = mongoose.Schema({
	name : {type : String},
	bio : {type : String},
	skills : {type : String},
	yearsOfExperience : {type : Number},
	why : {type : String}
});

var Applicant = mongoose.model('applicant', appSchema);

module.exports = Applicant;
