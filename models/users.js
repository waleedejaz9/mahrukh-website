import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password:{
    type: String,
    required:true,
  }

});

// Define a method to save a new form submission to the database
userSchema.statics.createUser = async function (user) {
  const User = new this(user);
  const savedUser = await User.save();
  return savedUser;
};

// find user by email
userSchema.statics.findByEmail = async function (email) {
  const  User= await this.findOne({email:email});
  return User;
};

export const User = mongoose.model("User", userSchema);