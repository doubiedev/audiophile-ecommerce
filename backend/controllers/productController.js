import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Create product
// @route   POST /api/products
// @access  Private
const createProduct = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'create product' })
    // const { category, isNewProduct, name, description, price, features, inTheBox, recommended, url, image } = req.body;
    //
    // const product = await Product.create({
    //     category,
    //     isNewProduct,
    //     name,
    //     description,
    //     price,
    //     features,
    //     inTheBox,
    //     recommended,
    //     url,
    //     image,
    // });
    //
    // if (product) {
    //     res.status(201).json({
    //         _id: product._id,
    //         category: product.category,
    //         isNewProduct: product.isNewProduct,
    //         name: product.name,
    //         description: product.description,
    //         price: product.price,
    //         features: product.features,
    //         inTheBox: product.inTheBox,
    //         recommended: product.recommended,
    //         url: product.url,
    //         image: product.image,
    //     });
    // } else {
    //     res.status(400);
    //     throw new Error('Invalid product data');
    // }
})

// @desc    Get all products
// @route   GET /api/products
// @access  Private

const getAllProducts = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'get all products' })
    // const page = Number(req.query.page) || 1;
    // const pageSize = Number(req.query.pageSize) || 20;
    //
    // const count = await Product.countDocuments();
    // const products = await Product.find({})
    //     // .populate('recommended') -> might need to populate this when using object references to other products
    //     .limit(pageSize)
    //     .skip(pageSize * (page - 1));
    //
    // if (!products || products.length === 0) {
    //     res.status(404);
    //     throw new Error('No products found');
    // }
    //
    // res.status(200).json({
    //     products,
    //     page,
    //     pages: Math.ceil(count / pageSize),
    // });
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Private

const getProduct = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'get product' })
    // const { id } = req.params;
    // const product = await Product.findById(id); // might need to .populate('recommended') here
    //
    // if (!product) {
    //     res.status(404);
    //     throw new Error('Product not found');
    // }
    //
    // res.status(200).json(product);
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private

const updateProduct = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'update product' })
    // const product = await Product.findById(req.params.id);
    //
    // if (product) {
    //     product.category = req.body.category || product.category
    //     product.isNewProduct = req.body.isNewProduct || product.isNewProduct
    //     product.name = req.body.name || product.name
    //     product.description = req.body.description || product.description
    //     product.price = req.body.price || product.price
    //     product.features = req.body.features || product.features
    //     product.inTheBox = req.body.inTheBox || product.inTheBox
    //     product.recommended = req.body.recommended || product.recommended
    //     product.url = req.body.url || product.url
    //     product.image = req.body.image || product.image
    //
    //     await product.save();
    //
    //     res.status(201).json({
    //         _id: product._id,
    //         category: product.category,
    //         isNewProduct: product.isNewProduct,
    //         name: product.name,
    //         description: product.description,
    //         price: product.price,
    //         features: product.features,
    //         inTheBox: product.inTheBox,
    //         recommended: product.recommended,
    //         url: product.url,
    //         image: product.image,
    //     });
    // } else {
    //     res.status(404);
    //     throw new Error('Product not found');
    // }
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private

const deleteProduct = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'delete product' })
    // const product = await Product.findById(req.params.id);
    // if (product) {
    //     await Product.findByIdAndDelete(req.params.id);
    //
    //     res.status(200).json({ message: 'Product removed successfully' });
    // } else {
    //     res.status(404);
    //     throw new Error('Product not found');
    // }
});

export {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
};
