const axios = require('axios');

async function getShare(token, idpost, limit){
	return await axios.get('https://graph.facebook.com/'+idpost+'/sharedposts?fields=from&limit='+limit+'&access_token='+token)
	.then(function(response){
		// console.log(response.data.data.length)
		if(response.data.data.length != 0){
			return response.data.data;
		}else{
			return false;
		}

	})
	.catch(function(error){
		return false;
	});
	
}	


module.exports = getShare;