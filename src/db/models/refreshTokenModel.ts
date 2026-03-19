import mongoose, { Schema } from "mongoose";

const refreshTokenSchema = new Schema(
    {
        expiresAt: { required: true, type: Date },
        revokedAt: { default: null, type: Date },
        token: { maxLength: 256, type: String },
        userId: { ref: "User", required: true, type: Schema.Types.ObjectId },
    },
    {
        timestamps: true,
    },
);

// Cascade delete — when a User is deleted, remove their tokens
refreshTokenSchema.index({ userId: 1 });

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
export default RefreshToken;
