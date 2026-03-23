import type { InferSchemaType } from "mongoose";

import mongoose, { Schema } from "mongoose";

const refreshTokenSchema = new Schema(
    {
        expiresAt: { required: true, type: Date },
        revokedAt: { default: null, type: Date },
        token: { maxLength: 256, required: true, type: String },
        userId: { ref: "User", required: true, type: Schema.Types.ObjectId },
    },
    {
        timestamps: true,
    },
);

// Index for query performance when looking up tokens by user
refreshTokenSchema.index({ userId: 1 });

export type NewRefreshToken = Omit<RefreshTokenType, "createdAt" | "updatedAt">;
export type RefreshTokenType = InferSchemaType<typeof refreshTokenSchema>;

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
export default RefreshToken;
