import mongoose, { InferSchemaType, Schema } from "mongoose";

interface IUser {
    createdAt: Date;
    email: string;
    hashedPassword: string;
    name: string;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        email: { maxLength: 256, required: true, type: String, unique: true },
        hashedPassword: { default: "unset", maxLength: 256, required: true, type: String },
        name: { required: true, type: String },

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

export type NewUser = Omit<UserType, "createdAt" | "updatedAt">;
export type UserResponse = Omit<UserType, "_id" | "hashedPassword"> & { createdAt: Date; id: string; updatedAt: Date };
export type UserType = InferSchemaType<typeof userSchema>;

const User = mongoose.model("User", userSchema);
export default User;
