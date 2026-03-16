const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://diwakarsingh1805:Diwakar1234@diwakar.4bzkxmy.mongodb.net/paytmData');

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = {
	User
};