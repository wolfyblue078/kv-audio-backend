import mongoose from "mongoose";


const userSchema = mongoose.Schema({
  firstName : {
    type : String,
    required : true,
  },
  lastName : {
    type : String,
    required : true
  },
  username : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true,
    unique : true,
    lowercase: true
  },
  password : {
    type : String,
    required : true,
  },
  role: {
    type : String,
    required : true,
    enum: ["user", "admin"],
    default : "user"
  },
  address: {
    type : String,
    required : true,
  },
  phone : {
    type : String,
    required : true,
  },
  image : {
    type : String,
  }
});

const User = mongoose.model("User", userSchema);
export default User; 


/*
  "email": "himantha@gmail.com",
  "password": "123",
  "role": "admin"


  "email": "sajini@gmail.com",
  "password": "123",
  "role": "user"
*/