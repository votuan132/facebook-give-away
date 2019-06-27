const axios = require('axios');

async function getCmt(token, idPost, limit){
	return await axios.get('https://graph.facebook.com/'+idPost+'/comments?limit='+limit+'&access_token='+ token)
	.then(function(response){
		var dataReturn =  response.data.data;
		dataReturn.reverse();

		// if isset object => have tag
		var filterTag = dataReturn.filter(function(item){
			return typeof item.message_tags == 'object';
		});

		var OptimalArray = filterTag.map(function(item){
			return {
				id: item.from.id,
				name: item.from.name,
				message: item.message,
				tag: item.message_tags,
				id_cmt: item.id,
				time: item.created_time
			};
		})
		return OptimalArray;

	})
	.catch(function(error){
		return false;
	});

	

	// return OptimalArray;

}


module.exports = getCmt;