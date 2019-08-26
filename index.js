var checkData = require('./module/check');
var express = require('express');
var app = express();
var port = 8888;

app.use(express.static('public_html'));
app.use(express.json());

app.get('', function(req, res){

});




app.post('/check', function(req, res){
	checkData(req.body).then(function(data){
		res.send(data);
		// console.log(data);
	});
});



app.listen(port, function(){
	console.log('Listening  http://localhost:'+ port);
});
