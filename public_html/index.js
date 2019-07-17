var notice;
var dataList;
var lucky_number;
var min;
var max;
var postId;
var accessToken;
var repeat;
var checkTag;

document.getElementById('submit').addEventListener('click', function(){
	notice = document.getElementById('notice');
	dataList = document.getElementById('dataList');
	lucky_number = document.getElementById('lucky_number');
	min = document.getElementById('min').value;
	max = document.getElementById('max').value;
	postId = document.getElementById('idPost').value;
	accessToken = document.getElementById('accessToken').value;

	var spin = document.getElementById('spin').checked;
	checkTag = document.getElementById('checkTag').checked;
	
	dataList.innerHTML = '';
	notice.style.cssText = ''; 

	notice.innerHTML = 'Đang khởi tạo ...';

	if(spin){
		repeat = setInterval(run, 2000);
	}else{
		run();
	}
	

	
	
});


$(document).on('click', '#add',function(){
	var id = $(this).attr('id_user');
	var name = $(this).attr('name_user');
	var post = $(this).attr('id_post');
	var data = {id: id, name: name, post: post};
	addResponse(data);
});

function run(){
	notice.innerHTML = 'Đang khởi tạo ...';
	var randomNumber  = random(parseInt(min), parseInt(max));

	lucky_number.innerHTML = randomNumber;

	axios.post('/check', {

		random: randomNumber,
		postId: postId,
		accessToken: accessToken,
		checkTag: checkTag
		
	}).then(function(data){
		var data = data.data;

		if(data != false){

			clearInterval(repeat);
			dataList.innerHTML = data.join('');
			notice.innerHTML = 'Đã tìm ra người may mắn';
			return false;
			
		}
		notice.innerHTML = 'Chưa tìm ra người may mắn';
		lucky_number.innerHTML = '';
	});
}

function addResponse(data){
	var list = '<li style="list-style-type: none;background:#fff;padding:10px;border-radius:25px;margin:5px;"" v-for="res in clipBoard"><p style="margin:0px"><img style="margin-right: 8px" width="40px" height="40px" class="rounded-circle avatar" src="https://graph.facebook.com/'+data.id+'/picture/"><a target="_blank" :href="https://www.facebook.com/'+data.id+'">'+data.name+'</a> : '+data.id+' <a data-toggle="tooltip" title="Mở bình luận" target="_blank" href="https://www.facebook.com/'+data.post+'"><button class="btn btn-success"><i class="zmdi zmdi-facebook-box zmdi-hc-fw"></i></button></li>'
	$('#response').append(list);
}

function random(a, b){
	return Math.floor(Math.random() * (b - a + 1)) + a;
}
