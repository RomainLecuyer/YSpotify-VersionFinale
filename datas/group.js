class Group {
    constructor(id, name, memberList, ownerId) {
        this.id = id;
        this.name = name;
        this.memberList = memberList;
        this.ownerId = ownerId;
    }
    get MemberCount() {
        return this.memberList.length;
    }
}
module.exports = Group;