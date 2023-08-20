import { Schema,model,models } from "mongoose";

const UserSchema = new Schema({
    email:{
        type: String,
        unique: [true,'Email already exist!'],
        required: [true,"email is required"]
    },
    username: {
        type: String,
        unique: [true,'Email already exist!'],
        // required: [true,"email is required"]
        match: [ /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._é]+(?<![_.])$/, 'Username invalid, it should contain 8-20 alphanumeric letters and be unique!',]
    },
    image:{
        type: String
    },
});

console.log("4566666666666666666662311111111213")

const User = models.User || model("User",UserSchema)

console.log(User);
export default User
