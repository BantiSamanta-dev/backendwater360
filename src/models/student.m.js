import mongoose from "mongoose";

const Schema = mongoose.Schema()

const studentSchema = new Schema({
    name:{type:String, required:true},
    batch:{type:String, required:true},

})
