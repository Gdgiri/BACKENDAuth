import mongoose from "mongoose";

// userSchema => Schema Name
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

// Collection name
const user = mongoose.model("user", userSchema);

export default user;
