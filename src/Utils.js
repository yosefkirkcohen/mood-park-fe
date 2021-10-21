import request from 'superagent';

const URL = 'https://mood-park-be.herokuapp.com';

export async function login(email, password) {
    try {
        const response = await request
            .post(`${URL}/auth/signin`)
            .send({ email, password })

        return response.body;
    } catch (e) {
        console.log(e);
        alert('Your email or password are incorrect.');
        return null;
    }
}

export async function signUp(email, password) {
    try {
        const response = await request
            .post(`${URL}/auth/signup`)
            .send({ email, password })

        return response.body.token;
    }
    catch (e) {
        console.log(e);
        alert('Email address associated with existing account');
        return null;
    }
}

export function isFavorite(park, favorites) {

    return !!favorites.find(favorite => {
        return favorite.parkcode === park.parkCode
    })
}

export async function removeFavorite(parkCode, token) {
    const response = await request.delete(`${URL}/api/favorites/${parkCode}`).set('Authorization', token)

    return response.body.data
}
