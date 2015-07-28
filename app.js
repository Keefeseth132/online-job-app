var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Applicant = require('./models/job-app.js');

mongoose.connect('mongodb://localhost/omega');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.get('/', function(req, res) {
	res.render('index');
});

// displays a list of applicants
app.get('/applicants', function(req, res){
	Applicant.find({}, function(err, documents){
		res.render('applicants', {applicants: documents})
	}) 
	
});

app.get('/Success!', function(req, res){
	res.send('hello world')
})

// creates and applicant
app.post('/applicant', function(req, res){
	var data = req.body

	var newApplicant = new Applicant({
		name : data.name,
		bio : data.bio,
		skills : data.skills,
		yearsOfExperience : data.yearsOfExperience,
		why : data.why
	})
	newApplicant.save()
	
	res.redirect('Success!');
});

app.get('/delete/:applicantID', function(req, res){
	Applicant.remove({_id : req.params.applicantID}, function(){
		res.redirect('/applicants')
	});
		
})

app.get('/applicants/:applicantID', function(req, res){
	Applicant.findOne({_id : req.params.applicantID}, function(err, docs){
		res.render('viewer', {applicant: docs})
	});
		
})

var server = app.listen(8441, function() {
	console.log('Express server listening on port ' + server.address().port);
});
