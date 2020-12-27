const mongoose = require('mongoose');
const mongoosepaginate = require('mongoose-paginate');
const passSchema = new mongoose.Schema({
    password_category: {
        type: String,ref: "password_categories",
        required: true,
        index: {
            unique: true
        }
    },
    password_details: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }
});
passSchema.plugin(mongoosepaginate);

const passModel = new mongoose.model('password_detail', passSchema);
module.exports = passModel;