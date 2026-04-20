import Product, {
    type CreateProductInput,
    type UpdateProductInput,
} from "#models/product.model.js";

export async function dbCreateProduct(data: CreateProductInput) {
    return Product.create(data);
}

export async function dbDeleteProduct(id: string) {
    return Product.findByIdAndDelete(id);
}

export async function dbGetAllProducts(page: number, pageSize: number) {
    const [count, products] = await Promise.all([
        Product.countDocuments(),
        Product.find({})
            .limit(pageSize)
            .skip(pageSize * (page - 1)),
    ]);
    return { count, products };
}

export async function dbGetProductById(id: string) {
    return Product.findById(id);
}

export async function dbUpdateProduct(id: string, data: UpdateProductInput) {
    return Product.findByIdAndUpdate(id, data, { returnDocument: "after", runValidators: true });
}
