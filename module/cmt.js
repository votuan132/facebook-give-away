const axios = require('axios');

async function getCmt(token, idPost, limit, checkTag){
	return await axios.get('https://graph.facebook.com/'+idPost+'/comments?limit='+limit+'&access_token='+ token)
	.then(function(response){

		var dataReturn =  response.data.data;

		dataReturn.reverse();
		// đảo ngược mảng để xếp theo ngày tháng năm

		// if isset object => have tag
		if (checkTag) {
			var dataReturn = dataReturn.filter(function(item){
				return typeof item.message_tags == 'object';
			});
			// console.log('1111');
		}

		// console.log(dataReturn);

		return dataReturn.map(function(item){
			return {
				id: item.from.id,
				name: item.from.name,
				message: item.message,
				tag: item.message_tags,
				id_cmt: item.id,
				time: item.created_time
			};
		})
		// return filterTag;

	})
	.catch(function(error){
		return false;
	});

	

	// return OptimalArray;

}


module.exports = getCmt;