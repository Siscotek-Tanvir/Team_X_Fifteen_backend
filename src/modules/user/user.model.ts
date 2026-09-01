import { Schema, model } from "mongoose";
import { hashPassword } from "../auth/auth.utils";
import { IUser, IUserModel } from "./user.interface";

const UserSchema = new Schema<IUser, IUserModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "user", "moderator"],
      default: "user",
      index: true,
    },
    status: {
      type: String,
      enum: ["active", "blocked", "inactive"],
      default: "active",
      index: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    department: {
      type: String,
      trim: true,
    },
    studentId: {
      type: String,
      trim: true,
    },
    avatarUrl: {
      type: String,
    },
    bio: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
  }
);

// Hash password before saving if modified
UserSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    this.password = hashPassword(this.password);
  }
  next();
});

UserSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await this.findOne({ email: email.toLowerCase() }).select("+password");
};

export const UserModel = model<IUser, IUserModel>("User", UserSchema);
