import mongoose, { Schema, Document } from "mongoose";



const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        
        required: [true, 'Email is required'],
        unique: true,
        match: [/.+\@.+\..+/, 'Please use a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    avatar: {
        public_id: {
            type: String,
        },
        secure_url: {
            type: String,
        },
    }
})


const UserModel = (mongoose.models.User) || mongoose.model('User', UserSchema)

export default UserModel