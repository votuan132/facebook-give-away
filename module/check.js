var getCmt = require('./cmt');
var getShare = require('./share');
const axios = require('axios');

function checkData(dataCheck){
	var accessToken = dataCheck.accessToken;
	var idPost = dataCheck.postId;
	var randomNumber = dataCheck.random;
	var checkTag = dataCheck.checkTag;

	var cmt = getCmt(accessToken, idPost, 10000000, checkTag);

	return cmt.then(function(data){
		if (data != false) {
			// console.log(data);
			var filterRandom = checkNumber(data, randomNumber);
			return filterRandom;
		}else{
			return false;
		}
	});
	

	
}

function checkNumber(number, random){
	
	var filter = number.filter(function(item){
		return item.message.indexOf(random) != -1;
	});
	return filter.map(function(item){
		return fillHtml(item, random);

	});

}

function fillHtml(data, number){
	var message = data.message.replace(number, "<b><font color='red'>" + number + "</font></b>");
	var html = '<li style="list-style-type: none; background: rgb(255, 255, 255); padding: 10px; border-radius: 25px; margin: 5px;">';
	html += '<p style="margin: 0px;"><img width="40px" height="40px" src="https://graph.facebook.com/'+data.id+'/picture/" class="rounded-circle avatar" style="margin-right: 8px;"><a target="_blank" href="https://www.facebook.com/'+data.id+'"><font color="blue">'+data.name+'</font></a>  : <span>'+ message+' </span>';
	html += '<a data-toggle="tooltip" title="Mở bình luận" target="_blank" href="https://www.facebook.com/'+data.id_cmt+'">';
	html += '<button class="btn btn-success"><i class="zmdi zmdi-facebook-box zmdi-hc-fw"></i></button>';
	html += '</a> <button id="add" id_user="'+data.id+'" name_user="'+data.name+'" id_post="'+data.id_cmt+'" data-toggle="tooltip" title="Copy tạm thời người này vào bộ nhớ đệm hệ thống (Refresh trang sẽ bị mất)" class="btn btn-warning"><i class="zmdi zmdi-share zmdi-hc-fw"></i></button>';
	html += '</p>';
	html += '</li>';

	return html;
}


module.exports = checkData;