var response = [];


document.getElementById('submit').addEventListener('click', function(){
	var notice = document.getElementById('notice');
	notice.style.cssText = ""; 
	var dataList = document.getElementById('dataList');
	dataList.innerHTML = '';
	var min = document.getElementById('min').value;
	var max = document.getElementById('max').value;
	var postId = document.getElementById('idPost').value;
	var accessToken = document.getElementById('accessToken').value;
	var check = document.getElementById('switch1').checked;

	notice.innerHTML = 'Đang khởi tạo ...';

	var time = setInterval(function(){
		notice.innerHTML = 'Đang khởi tạo ...';
		var randomNumber  = random(parseInt(min), parseInt(max));

		document.getElementById('lucky_number').innerHTML = randomNumber;

		axios.post('/check', {
			random: randomNumber,
			postId: postId,
			accessToken: accessToken,
			type: check
		}).then(function(data){
			var data = data.data;

			if(!check | data.length != 0){
				clearInterval(time);
				if(data.length != 0){
					dataList.innerHTML = data.join('');
					notice.innerHTML = 'Đã tìm ra người may mắn';
					return false;
				}
				
			}
			notice.innerHTML = 'Chưa tìm ra người may mắn';

		});
	}, 2000);

	
	
});


$(document).on('click', '#add',function(){
	var id = $(this).attr('id_user');
	var name = $(this).attr('name_user');
	var post = $(this).attr('id_post');
	var data = {id: id, name: name, post: post};
	moveResponse(data);
});

function moveResponse(data){
	var list = '<li style="list-style-type: none;background:#fff;padding:10px;border-radius:25px;margin:5px;"" v-for="res in clipBoard"><p style="margin:0px"><img style="margin-right: 8px" width="40px" height="40px" class="rounded-circle avatar" src="https://graph.facebook.com/'+data.id+'/picture/"><a target="_blank" :href="https://www.facebook.com/'+data.id+'">'+data.name+'</a> : '+data.id+' <a data-toggle="tooltip" title="Mở bình luận" target="_blank" href="https://www.facebook.com/'+data.post+'"><button class="btn btn-success"><i class="zmdi zmdi-facebook-box zmdi-hc-fw"></i></button></li>'
	$('#response').append(list);
}

function random(a, b){
	return Math.floor(Math.random() * (b - a + 1)) + a;
}
