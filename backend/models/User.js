import mongoose from "mongoose";
// const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String }, // Optional for OAuth users
  googleId: { type: String },
  githubId: { type: String },
  avatar: { type: String },
  name: { type: String },
});

// UserSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

const User = mongoose.model("User", UserSchema);
export default User;
