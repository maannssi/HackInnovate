const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    artworks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artwork' }],
    cart: {type: Array}
});

module.exports = mongoose.model('User', userSchema);
