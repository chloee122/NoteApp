import mongoose from "mongoose";

interface IUser {
  username: string;
  name: string;
  email: string;
  passwordHash: string;
  refreshToken: string;
}

const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  refreshToken: String,
});

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
    delete returnedObject.refreshToken;
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
