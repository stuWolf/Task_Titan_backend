class User {
    // Each of these properties represents a property stored in the database.
    constructor(username, email, password, firstName, lastName){
        this.username = username;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // This would be usable as "instance.fullName", 
    // just like "instance.username" or "instance.email"
    get fullName(){
        return `${this.firstName} ${this.lastName}`;
    }
}
