import mongoose, { Schema } from "mongoose";

export interface IUser {
  email: string;
  username: string;
  password: string;
  age: number;
  gender: "male" | "female";
  name: string;
  isAdmin: boolean;
}

const validateEmail = function (email: string) {
  var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate: validateEmail,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
