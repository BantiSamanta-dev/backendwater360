import mongoose from "mongoose";



const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String , required: true },
  facebookid: { type: String },
  createdAt: { type: Date, default: Date.now },
});


const User = mongoose.model('User', userSchema);

export default User;
