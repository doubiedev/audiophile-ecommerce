import mongoose, { Schema } from "mongoose";

interface IUser {
    createdAt: Date;
    email: string;
    hashedPassword: string;
    name: string;
    role: "admin" | "user";
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        email: { maxLength: 256, required: true, type: String, unique: true },
        hashedPassword: { maxLength: 256, required: true, type: String },
        name: { maxLength: 256, required: true, type: String },
        role: { default: "user", enum: ["admin", "user"], required: true, type: String },

        // TODO: add cart & cartschema to attach to users
        // cart: cartSchema,
    },
    {
        timestamps: true,
        toJSON: {
            transform: (_doc, ret) => {
                const { __v, _id, hashedPassword: _hashedPassword, ...rest } = ret;
                return rest;
            },
            virtuals: true,
        },
    },
);

export type NewUser = Omit<IUser, "createdAt" | "role" | "updatedAt">;
export type UserResponse = Omit<IUser, "hashedPassword"> & { id: string };

const User = mongoose.model("User", userSchema);
export default User;
