export class User{
    user_id;
    name;
    surname;
    login;
    password;
    isActive;
    constructor(user_id,name,surname,login,password,isActive){
        this.user_id=user_id;
        this.name=name;
        this.surname=surname;
        this.login=login;
        this.password=password;
        this.isActive=isActive;
    }
} 