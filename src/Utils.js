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

export function isFavorite(park, favorites) {

return !!favorites.find( favorite => {
    return favorite.parkcode === park.parkCode
})
}