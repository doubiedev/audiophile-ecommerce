import { type CreateProductInput, type UpdateProductInput } from "#models/product.model.js";
import {
    dbCreateProduct,
    dbDeleteProduct,
    dbGetAllProducts,
    dbGetProductById,
    dbUpdateProduct,
} from "#queries/product.queries.js";
import { NotFoundError } from "#utils/errors.js";

export async function createProduct(newProduct: CreateProductInput) {
    const product = await dbCreateProduct(newProduct);
    return product;
}

export async function deleteProduct(id: string) {
    const product = await dbDeleteProduct(id);
    if (!product) {
        throw new NotFoundError(`Product with id: ${id} not found`);
    }
}

export async function getAllProducts(page: number, pageSize: number) {
    const { count, products } = await dbGetAllProducts(page, pageSize);
    return {
        page,
        pages: Math.ceil(count / pageSize),
        products,
    };
}

export async function getProductById(id: string) {
    const product = await dbGetProductById(id);
    if (!product) {
        throw new NotFoundError(`Product with id: ${id} not found`);
    }
    return product;
}

export async function updateProduct(productId: string, updatedProduct: UpdateProductInput) {
    const product = await dbUpdateProduct(productId, updatedProduct);
    if (!product) {
        throw new NotFoundError(`Product with id: ${productId} not found`);
    }
    return product;
}
