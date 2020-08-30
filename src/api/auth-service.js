import 'dotenv/config.js';
const axios = require('axios');
const accessToken = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;
const config = {
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
};

class ApiClient {
	searchRecipes(query) {
		return axios.get(
			API_URL +
				`recipes/complexSearch?query=${query}&addRecipeInformation=true&apiKey=${accessToken}`,
			config,
		);
	}
	// searchRecipesForPrepTime(query) {
	// 	return axios.get(
	// 		API_URL + `recipes/search?query=${query}&apiKey=${accessToken}`,
	// 		config,
	// 	);
	// }
	autoCompleteSearch(query) {
		return axios.get(
			API_URL +
				`recipes/autocomplete?number=10&query=${query}&apiKey=${accessToken}`,
			config,
		);
	}
	getRecipeInformation(id) {
		return axios.get(
			API_URL + `recipes/${id}/information?&apiKey=${accessToken}`,
			config,
		);
	}
	getSimilarRecipes(id) {
		return axios.get(
			API_URL + `recipes/${id}/similar?&apiKey=${accessToken}`,
			config,
		);
	}
}
export default new ApiClient();
