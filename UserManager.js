const userList = [];
const json = require ('./database.json');
const jwt = require("jsonwebtoken");

function getUserById(id) {
    const objWithIdIndex = userList.findIndex((obj) => obj.id == id);
    if(objWithIdIndex === -1) {
        return "404 not found";
    }
    return userList[objWithIdIndex];
}

function getUserByNickname(nickname) {
    const objWithIdIndex = userList.findIndex((obj) => obj.nickname == nickname);
    if(objWithIdIndex === -1) {
        return "404 not found";
    }
    return userList[objWithIdIndex];
}

//Génération d'un access token
function generateAccessToken (user) {
    return jwt.sign (user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
}

//Refresh token
function generateRefreshToken (user) {
    return jwt.sign (user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1h'});
}

//Ajouter un nouvel utilisateur
function addUserWithNicknameAndPassword (newNickname, newPassword) {
    let newUser = {
        'nickname': newNickname,
        'password': newPassword,
        'access_token': null,
        'refresh_token': null,
        "currentGroup": null,
        "spotifyNickname": null
    }
    newUser["access_token"] = generateAccessToken (newUser);
    newUser["refresh_token"] = generateAccessToken (newUser);
    json.users.push (newUser);
    return newUser;
}

module.exports = {
    userList,
    getUserById,
    generateAccessToken,
    generateRefreshToken,
    addUserWithNicknameAndPassword,
    getUserByNickname,
};