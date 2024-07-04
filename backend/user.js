import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    image: String,
    expires: String,
    access_token: String,
    provider: String,
    id_token: String,
    receipt_link: String,
    variant_id: String,
    user_status: { type: String, default: 'free' },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
