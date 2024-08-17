

const sessionIdToUserMap = new Map();

// funciton to set user and session id
function setUser(id, user){
    sessionIdToUserMap.set(id, user);
    console.log(sessionIdToUserMap);
}

// function to get user via session id from sessionIdToUserMap
function getUser(id){
    return sessionIdToUserMap.get(id);
}

module.exports = {
    setUser,
    getUser,
}