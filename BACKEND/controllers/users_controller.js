function createUser(name, email, password){
    let user = new User(name, email, password); 
    data.users.push(user);
}

function getUserById(id) {
    let user = data.users.find(user => user.id === id); 
    if (!user) {
        throw new UserException("404 - User not found");
    }
    return user;
}

function searchUsers(attribute, value) {
    if (!User.hasOwnProperty(attribute)) {
        throw new UserException("Attribute " + attribute + " does not exist");
    }

    return data.users.filter(user => {
        const userValue = user[attribute];

        if (typeof userValue === "string") {
            return userValue.includes(value);
        }

        if (attribute === "joined_at") {
            return new Date(userValue).toDateString() === new Date(value).toDateString();
        }

        return userValue === value;
    });
}

function getAllUsers(){
    return data.users;
}

function updateUser(id, obj_new_info) {
    const user = data.users.find(user => user.id === id);
    if (!user) {
        throw new UserException("User with ID " + id + " not found");
    }

    let updated = false;
    for (let key in obj_new_info) {
        if (key in user) {
            user[key] = obj_new_info[key]; 
            updated = true;
        }
    }
    
    if (!updated) {
        throw new UserException("No valid attributes");
    }
    return updated;
}

function deleteUser(id) {
    const userIndex = data.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
        throw new UserException("User with ID " + id + " not found");
    }
    data.users.splice(userIndex, 1);
}
