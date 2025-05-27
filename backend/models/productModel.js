import mongoose, { Schema } from 'mongoose';

const inTheBoxSchema = new Schema({
    quantity: { type: Number, required: true },
    item: { type: String, required: true }
}, { _id: false });

const imageSchema = new Schema({
    desktop: { type: String, required: true },
    tablet: { type: String, required: true },
    mobile: { type: String, required: true },
    showcases: [{ type: String, required: true }]
}, { _id: false });

const productSchema = new Schema({
    category: { type: String, required: true },
    isNewProduct: { type: Boolean, default: false },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    features: [{ type: String, required: true }],
    inTheBox: [inTheBoxSchema],
    recommended: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    url: { type: String, required: true },
    image: { type: imageSchema, required: true }
}, {
    timestamps: true
});

export default mongoose.model('Product', productSchema);

