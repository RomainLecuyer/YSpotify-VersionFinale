class User {
    constructor(id, nickname, password, token, currentGroup, spotifyNickname) {
        this.id = id;
        this.nickname = nickname;
        this.password = password;
        this.token = token;
        this.currentGroup = currentGroup;
        this.spotifyNickname = spotifyNickname;
    }
    get isOwnerOfCurrentGroup() {
        return this.currentGroup.ownerId === this.id;
    }
}
module.exports = User;