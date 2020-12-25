const mongoose = require('mongoose');
const passwordSchema = new mongoose.Schema({
    password_category: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const passwordModel = new mongoose.model('password_categories', passwordSchema);
module.exports = passwordModel;