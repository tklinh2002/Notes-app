import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
// mã hóa mật khẩu trước khi lưu
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const crypto = await import("crypto");
  this.password = crypto
    .createHash("sha256")
    .update(this.password)
    .digest("hex");
  next();
});
// phương thức so sánh mật khẩu
userSchema.methods.comparePassword = async function (candidatePassword) {
  const crypto = await import("crypto");
  const hashedPassword = crypto
    .createHash("sha256")
    .update(candidatePassword)
    .digest("hex");
  return this.password === hashedPassword;
};
const User = mongoose.model("User", userSchema);

export default User;
