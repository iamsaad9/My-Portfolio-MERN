import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Use import since you are using ES Modules

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, select: false }, // 'select: false' protects the hash from accidental leaks
  googleId: { type: String },
  githubId: { type: String },
  avatar: { type: String },
  name: { type: String },
});

// Automatically hash password before saving to database
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", UserSchema);
export default User;
