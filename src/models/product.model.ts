import mongoose, { Schema } from "mongoose";
import { z } from "zod";

interface IProduct {
    category: string;
    createdAt: Date;
    description: string;
    features: string[];
    imageUrl: {
        desktop?: string;
        mobile?: string;
        showcases: string[];
        tablet?: string;
    };
    inTheBox: { item: string; quantity: number }[];
    isNewProduct: boolean;
    name: string;
    price: number;
    recommended: mongoose.Types.ObjectId[];
    updatedAt: Date;
    url: string;
}

const productSchema = new Schema<IProduct>(
    {
        category: {
            required: true,
            trim: true,
            type: String,
        },
        description: {
            required: true,
            type: String,
        },
        features: {
            default: [],
            type: [String],
        },
        imageUrl: {
            desktop: { trim: true, type: String },
            mobile: { trim: true, type: String },
            showcases: {
                default: [],
                trim: true,
                type: [String],
            },
            tablet: { trim: true, type: String },
        },
        inTheBox: [
            {
                item: {
                    required: true,
                    trim: true,
                    type: String,
                },
                quantity: {
                    min: 1,
                    required: true,
                    type: Number,
                },
            },
        ],
        isNewProduct: {
            default: false,
            required: true,
            type: Boolean,
        },
        name: {
            required: true,
            trim: true,
            type: String,
        },
        price: {
            min: 0,
            required: true,
            type: Number,
        },
        recommended: [
            {
                ref: "Product",
                type: Schema.Types.ObjectId,
            },
        ],
        url: {
            required: true,
            trim: true,
            type: String,
            unique: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            // TODO: global strip version and _id, and set virtuals: true for toJSON
            transform: (_doc, ret) => {
                const { __v, _id, ...rest } = ret;
                return rest;
            },
            virtuals: true,
        },
    },
);

const inTheBoxSchema = z.object({
    item: z.string().trim().min(1),
    quantity: z.number().int().min(1),
});

const imageUrlSchema = z.object({
    desktop: z.url().trim().optional(),
    mobile: z.url().trim().optional(),
    showcases: z.array(z.url().trim()).default([]),
    tablet: z.url().trim().optional(),
});

export const createProductSchema = z.object({
    category: z.string().min(1).max(256),
    description: z.string().min(1),
    features: z.array(z.string()).default([]),
    imageUrl: imageUrlSchema,
    inTheBox: z.array(inTheBoxSchema).default([]),
    isNewProduct: z.boolean().default(false),
    name: z.string().trim().min(1),
    price: z.number().min(0),
    recommended: z.array(z.string()).default([]),
    url: z.url().trim(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

export const updateProductSchema = z.object({
    category: z.string().min(1).max(256).optional(),
    description: z.string().min(1).optional(),
    features: z.array(z.string()).default([]).optional(),
    imageUrl: imageUrlSchema.optional(),
    inTheBox: z.array(inTheBoxSchema).default([]).optional(),
    isNewProduct: z.boolean().default(false).optional(),
    name: z.string().trim().min(1).optional(),
    price: z.number().min(0).optional(),
    recommended: z.array(z.string()).default([]).optional(),
    url: z.url().trim().optional(),
});

export type ProductResponse = IProduct & { id: string };

export type UpdateProductInput = z.infer<typeof updateProductSchema>;

const Product = mongoose.model("Product", productSchema);

export default Product;
