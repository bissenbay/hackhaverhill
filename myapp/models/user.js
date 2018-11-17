// create schema
var userSchema = new mongoose.Schema({
    name: String,
    type: String
});

// create model
var User = mongoose.model('User', userSchema);

// allow others to use model
module.exports = User;