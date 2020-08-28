import 'dotenv/config.js';
const axios = require('axios');
const accessToken = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;
const config = {
    headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

class Service{
    searchRecipes(query){
        return axios.get(API_URL + `recipes/complexSearch?query=${query}&apiKey=${accessToken}`, config);
    }
    autoCompleteSearch(query){
        return axios.get(API_URL + `recipes/autocomplete?number=10&query=${query}&apiKey=${accessToken}`, config);
    }

    
}
export default new Service();
