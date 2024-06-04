import mongoose from "mongoose"

const connectDB = async()=>{
    try {
        mongoose.connect("mongodb://localhost:27017/water360")
        console.log("the database connected")
    } catch (error) {
        console.log("there is some error in the connection of the database")
    }
}
export default connectDB

