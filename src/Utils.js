import request from 'superagent';

const URL = 'https://mood-park-be.herokuapp.com';

export async function login(email, password) {
    const response = await request
    .post(`${URL}/auth/signin`)
    .send ({email, password})
    
    return response.body;
}

//signup: 
export async function signUp(email, password) {
    const response = await request
    .post(`${URL}/auth/signup`)
    .send ({email, password})
    
    return response.body;
}

export async function isFavorite(park, favorites) {
    // take in park id, map through favorites id and see if there is a match with that park's id. If not, render normally. if is match, change render to?
    // for the park, grab the id
const baseParkId = park.parkCode;
// map through favorites ids and check each one against baseParkID
favorites.parkCode.map()
}