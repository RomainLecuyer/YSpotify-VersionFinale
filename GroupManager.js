const userManager = require('./UserManager');
const Group = require('./datas/group')
const json = require("./database.json");
const groupList = [];

function addGroup(creatorId, groupName) {
    console.log("AddGroup")

        groupList.forEach((group) => {


            if (group.id+2 > groupList.length){

                const newGroup = new Group(group.id+1, groupName, [creatorId], creatorId);
                groupList.push(newGroup);

                let user = userManager.getUserById(creatorId);

                deleteUserToGroup(user.id, getGroupByID(user.currentGroup));

                user.currentGroup = group.id+1;

                console.log("Group créé pour " + user.nickname)

            }
        });

}

function deleteGroup(group) {
    console.log("DeleteGroup")

    const objWithIdIndex = groupList.findIndex((obj) => obj.id === group.id);
    groupList.splice(objWithIdIndex, 1);
}

function getGroupByID(id) {
    const objWithIdIndex = groupList.findIndex((obj) => obj.id == id);
    if(objWithIdIndex === -1) {
        return "404 not found";
    }
    return groupList[objWithIdIndex];
}


// Objet User ainsi qu'un objet group.
function joinGroup(userId, groupId) {

    console.log("JoinGroup")

    const User = userManager.getUserById(userId);
    const Group = getGroupByID(groupId);

    if(User.currentGroup == groupId) {
        console.log(User)
        console.log(groupId)
        console.log("Cannot join the group you already joined.");
    }

    if(User.currentGroup != groupId) {
        console.log("Delete old user group")
        console.log(User)
        deleteUserToGroup(User.id, getGroupByID(User.currentGroup));
        Group.memberList.push(User.id);
        User.currentGroup = groupId;
    }

}

function deleteUserToGroup(user, group) {

    console.log("DeleteUserToGroup")
console.log(group.memberList.length)
    const User = userManager.getUserById(user);

    const objWithIdIndex = group.memberList.findIndex((obj) => obj.id === user);
    group.memberList.splice(objWithIdIndex, 1);
    User.currentGroup = null;

    if(group.memberList.length == 0) {
        deleteGroup(group);
        console.log('Group' + group.name + " has been deleted.");
        return;
    }

    // Gestion groupe.
    if(group.ownerId === user) {
        if(group.memberList.length == 0) {
            deleteGroup(group);
            console.log('Group' + group.name + " has been deleted.");
        } else {
            const random = Math.floor(Math.random() * group.memberList.length);
            group.ownerId = group.memberList[random];
            console.log('Group' + group.name + " has now a new owner named : " + userManager.getUserById(group.ownerId).nickname);
        }
    }
}

module.exports = {
    groupList,
    addGroup,
    deleteGroup,
    joinGroup,
    deleteUserToGroup,
    getGroupByID,
};