import 'dotenv/config.js';
const axios = require('axios');
const accessToken = '3dc2ceeb2f754dcfb6bb000ebaddcd9e';
const API_URL = process.env.REACT_APP_API_URL;
const config = {
    headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

class Service{
    searchRecipes(query){
        return axios.get(API_URL + `search?query=${query}&apiKey=${accessToken}`, config);
    }
    autoCompleteSearch(query){
        return axios.get(API_URL + `autocomplete?number=10&query=${query}&apiKey=${accessToken}`, config);
    }

    
}
export default new Service();
