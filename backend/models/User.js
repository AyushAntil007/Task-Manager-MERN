const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required : true,
        unique: true
    },
    password: {
        type: String,
        required: true
   },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
  }
}, {timestamps : true});

module.exports = mongoose.model('User', userSchema)

// “Create a User model using this schema and connect it to the users collection in MongoDB”