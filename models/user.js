const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        index:{
            unique:true
        }
    },
    email:{
        type:String,
        required:true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true,
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

const UserModel=new mongoose.model('users',userSchema);
module.exports=UserModel;