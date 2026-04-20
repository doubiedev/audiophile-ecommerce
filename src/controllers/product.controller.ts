import type { CreateProductInput, UpdateProductInput } from "#models/product.model.js";
import type { ObjectId } from "#utils/validators.js";
import type { Request, Response } from "express";

import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct,
} from "#services/product.service.js";

export async function handlerCreateProduct(req: Request, res: Response) {
    const params = req.validated.body as CreateProductInput;
    const product = await createProduct(params);
    res.status(201).json(product);
}

export async function handlerDeleteProduct(req: Request, res: Response) {
    const { id } = req.validated.params as { id: ObjectId };
    await deleteProduct(id);
    res.status(204).send();
}

export async function handlerGetAllProducts(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 20;
    const result = await getAllProducts(page, pageSize);
    res.status(200).json(result);
}

export async function handlerGetProductById(req: Request, res: Response) {
    const { id } = req.validated.params as { id: ObjectId };
    const product = await getProductById(id);
    res.status(200).json(product);
}

export async function handlerUpdateProduct(req: Request, res: Response) {
    const { id } = req.validated.params as { id: ObjectId };
    const params = req.validated.body as UpdateProductInput;
    const product = await updateProduct(id, params);
    res.status(200).json(product);
}
