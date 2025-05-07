function getNextUserID(){
    return data.users.length + 1;
}

class UserException{
    constructor(errorMessage){
        this.errorMessage = errorMessage;
    }
}

class User{
    #id;
    #name;
    #email;
    #password;
    #joined_at;

    constructor(name, email, password){
        this.#id = getNextUserID(); 
        this.name = name;
        this.email = email;
        this.password = password;
        this.#joined_at = new Date();
    }

    get id(){
        return this.#id;
    }
    set id(value){
        throw new UserException("IDs cannot be modified");
    }

    get name(){
        return this.#name;
    }
    set name(value){
        if(value === ""){
            throw new UserException("Name cannot be empty");
        }
        this.#name = value;
    }

    get email(){
        return this.#email;
    }
    set email(value){
        if(value === ""){
            throw new UserException("Email cannot be empty");
        }
        if (data.users.some(user => user.email === value)) {
            throw new UserException("Email already exists");
        }
        this.#email = value;
    }

    get password(){
        return this.#password;
    }
    set password(value){
        if(value === ""){
            throw new UserException("Password cannot be empty");
        }
        if(value.length < 8){
            throw new UserException("Password must be at least 8 characters long");
        }
        this.#password = value;
    }

    get joined_at(){
        return this.#joined_at;
    }
    set joined_at(value){
        throw new UserException("Joined_at cannot be modified");
    }
}