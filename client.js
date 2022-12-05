const userManager = require ('./UserManager.js');
const axios = require ('axios');
const instance = axios.create ({
    baseURL: 'http://localhost:8000/',
});

console.log ('Tentative de login...');

let refreshToken;

//Requête de connexion
instance.post ('/createUser', {
    nickname: 'Orion',
    password: 'supermdp',
}).then ((response) => {
    console.log ('Authentification réussie !\n');

    instance.defaults.headers.common ['authorization'] = `Bearer ${response.data.accessToken}`;
    refreshToken = response.data.refreshToken;
    loadUserInfos ();
}).catch ((err) => {
    console.log ('Authentification échouée');
    console.log (err.response.status);
});

//Chargement des infos d'un user
function loadUserInfos () {
    instance.get ('/posts').then((response) => {
        console.log (response.data);
    }).catch((err) => {
            console.log (err.reason);
    });
}

//Récupération de la réponse de l'instance
instance.interceptors.response.use ((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if (error.config.url !== '/refreshToken' && error.response.status === 401 && originalRequest._retry !== true) {
        originalRequest._retry = true;
        if (refreshToken && refreshToken !== '') {
            instance.defaults.headers.common ['authorization'] = `Bearer ${refreshToken}`;
            //console.log ('refresh token');
            await instance.post ('/refreshToken').then ((response) => {
                instance.defaults.headers.common ['authorization'] = `Bearer ${response.data.accessToken}`;
                originalRequest.headers ['authorization'] = `Bearer ${response.data.accessToken}`;
            }).catch ((error) => {
                console.log (error.response.status);
                refreshToken = null;
            });
            return instance (originalRequest);
        }
    }
});