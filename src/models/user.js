const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userStatus: {
      type: String,
      enum: ['manager', 'customer', 'worker'],
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    address: {
      type: String
      
    },
    contactNumber: {
      type: Number
      
    },
    dob: {
      type: Date
      
    },
    license: {
      type: String
      
    },
    licenseNo: {
      type: String
      
    },
    employedSince: {
      type: Date
      
    }
  });

const User = mongoose.model('User', UserSchema)

module.exports = User

/*
option1 
user{
    username, 
    password, 
    email
}
notes{
    title, 
    description, 
    ...
    username/user_id
}

option2 
user{
    username, 
    password, 
    email
    notes = [note_id, note_id, note_id]
}
notes{
    title, 
    description, 
    ...

}

*/