import app from "#app.js";
import Product from "#models/product.model.js";
import User from "#models/user.model.js";
import { hashPassword } from "#services/auth.service.js";
import mongoose from "mongoose";
import supertest from "supertest";
import { beforeEach, describe, expect, it } from "vitest";

const request = supertest(app);

const getValidNonExistentObjectId = () => new mongoose.Types.ObjectId().toString();

const TEST_ADMIN = {
    email: "admin-test-products@test.com",
    name: "Admin Test",
    password: "password123",
};

const TEST_USER = {
    email: "user-test-products@test.com",
    name: "User Test",
    password: "password123",
};

const TEST_PRODUCT = {
    category: "Speakers",
    description: "The best headphone",
    features: ["Feature 1", "Feature 2"],
    imageUrl: {
        desktop: "https://example.com/desktop.jpg",
        mobile: "https://example.com/mobile.jpg",
        showcases: ["https://example.com/showcase1.jpg"],
        tablet: "https://example.com/tablet.jpg",
    },
    inTheBox: [{ item: "Box", quantity: 1 }],
    isNewProduct: true,
    name: "XX99 Mark II",
    price: 2999,
    url: "https://example.com/product",
};

async function createAdminUser() {
    const hashedPassword = await hashPassword(TEST_ADMIN.password);
    const user = await User.create({
        email: TEST_ADMIN.email,
        hashedPassword,
        name: TEST_ADMIN.name,
        role: "admin",
    });
    const res = await request.post("/api/auth/login").send({
        email: TEST_ADMIN.email,
        password: TEST_ADMIN.password,
    });
    return { ...res.body, role: user.role } as {
        email: string;
        id: string;
        role: string;
        token: string;
    };
}

async function createProduct(data = TEST_PRODUCT, token: string) {
    const res = await request
        .post("/api/products")
        .set("Authorization", `Bearer ${token}`)
        .send(data);
    return res.body as { id: string };
}

async function createRegularUser() {
    const hashedPassword = await hashPassword(TEST_USER.password);
    await User.create({
        email: TEST_USER.email,
        hashedPassword,
        name: TEST_USER.name,
        role: "user",
    });
    const res = await request.post("/api/auth/login").send({
        email: TEST_USER.email,
        password: TEST_USER.password,
    });
    return res.body as { id: string; token: string };
}

async function loginAdminUser() {
    const res = await request.post("/api/auth/login").send({
        email: TEST_ADMIN.email,
        password: TEST_ADMIN.password,
    });
    return res.body as { id: string; token: string };
}

beforeEach(async () => {
    await Product.deleteMany({});
    await User.deleteMany({});
});

describe("POST /api/products", () => {
    it("should return 401 for unauthenticated request", async () => {
        const res = await request.post("/api/products").send(TEST_PRODUCT);
        expect(res.status).toBe(401);
    });

    it("should return 403 for non-admin user", async () => {
        const { token } = await createRegularUser();
        const res = await request
            .post("/api/products")
            .set("Authorization", `Bearer ${token}`)
            .send(TEST_PRODUCT);
        expect(res.status).toBe(403);
    });

    it("should return 201 with product data for valid input as admin", async () => {
        await createAdminUser();
        const { token } = await loginAdminUser();
        const res = await request
            .post("/api/products")
            .set("Authorization", `Bearer ${token}`)
            .send(TEST_PRODUCT);
        expect(res.status).toBe(201);
        expect(res.body).toMatchObject({
            category: TEST_PRODUCT.category,
            description: TEST_PRODUCT.description,
            name: TEST_PRODUCT.name,
            price: TEST_PRODUCT.price,
        });
    });

    it("should return 400 for missing required fields", async () => {
        await createAdminUser();
        const { token } = await loginAdminUser();
        const res = await request
            .post("/api/products")
            .set("Authorization", `Bearer ${token}`)
            .send({ name: "Test" });
        expect(res.status).toBe(400);
    });

    it("should return 400 for invalid category type", async () => {
        await createAdminUser();
        const { token } = await loginAdminUser();
        const res = await request
            .post("/api/products")
            .set("Authorization", `Bearer ${token}`)
            .send({ ...TEST_PRODUCT, category: 123 });
        expect(res.status).toBe(400);
    });

    it("should return 400 for invalid price (negative)", async () => {
        await createAdminUser();
        const { token } = await loginAdminUser();
        const res = await request
            .post("/api/products")
            .set("Authorization", `Bearer ${token}`)
            .send({ ...TEST_PRODUCT, price: -10 });
        expect(res.status).toBe(400);
    });

    it("should return 409 for duplicate url", async () => {
        await createAdminUser();
        const { token } = await loginAdminUser();
        await request
            .post("/api/products")
            .set("Authorization", `Bearer ${token}`)
            .send(TEST_PRODUCT);
        const res = await request
            .post("/api/products")
            .set("Authorization", `Bearer ${token}`)
            .send(TEST_PRODUCT);
        expect(res.status).toBe(409);
    });
});

describe("GET /api/products", () => {
    it("should return 401 for unauthenticated request", async () => {
        const res = await request.get("/api/products");
        expect(res.status).toBe(401);
    });

    it("should return 403 for non-admin user", async () => {
        const { token } = await createRegularUser();
        const res = await request.get("/api/products").set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(403);
    });

    it("should return 200 with products for admin", async () => {
        await createAdminUser();
        const { token } = await loginAdminUser();
        await createProduct(TEST_PRODUCT, token);
        const res = await request.get("/api/products").set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("products");
        expect(res.body).toHaveProperty("page");
        expect(res.body).toHaveProperty("pages");
    });

    it("should return 200 with empty products array when none exist", async () => {
        await createAdminUser();
        const { token } = await loginAdminUser();
        const res = await request.get("/api/products").set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect((res.body as { products: unknown[] }).products).toHaveLength(0);
    });
});

describe("GET /api/products/:id", () => {
    it("should return 400 for invalid id format", async () => {
        const res = await request.get("/api/products/invalid-id");
        expect(res.status).toBe(400);
    });

    it("should return 404 for non-existent product", async () => {
        const res = await request.get(`/api/products/${getValidNonExistentObjectId()}`);
        expect(res.status).toBe(404);
    });

    it("should return 200 with product data for valid id", async () => {
        await createAdminUser();
        const { token } = await loginAdminUser();
        const { id } = await createProduct(TEST_PRODUCT, token);
        const res = await request.get(`/api/products/${id}`);
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            category: TEST_PRODUCT.category,
            id,
            name: TEST_PRODUCT.name,
        });
    });
});

describe("PATCH /api/products/:id", () => {
    it("should return 400 for invalid id format", async () => {
        await createAdminUser();
        const { token } = await loginAdminUser();
        const res = await request
            .patch("/api/products/invalid-id")
            .set("Authorization", `Bearer ${token}`)
            .send({ name: "New Name" });
        expect(res.status).toBe(400);
    });

    it("should return 401 for unauthenticated request", async () => {
        const res = await request
            .patch(`/api/products/${getValidNonExistentObjectId()}`)
            .send({ name: "New Name" });
        expect(res.status).toBe(401);
    });

    it("should return 403 for non-admin user", async () => {
        const { token } = await createRegularUser();
        const res = await request
            .patch(`/api/products/${getValidNonExistentObjectId()}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ name: "New Name" });
        expect(res.status).toBe(403);
    });

    it("should return 404 for non-existent product", async () => {
        await createAdminUser();
        const { token } = await loginAdminUser();
        const res = await request
            .patch(`/api/products/${getValidNonExistentObjectId()}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ name: "New Name" });
        expect(res.status).toBe(404);
    });

    it("should return 200 for admin updating product", async () => {
        await createAdminUser();
        const { token } = await loginAdminUser();
        const { id } = await createProduct(TEST_PRODUCT, token);
        const res = await request
            .patch(`/api/products/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ name: "Updated Name" });
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            id,
            name: "Updated Name",
        });
    });

    it("should return 200 for admin updating category", async () => {
        await createAdminUser();
        const { token } = await loginAdminUser();
        const { id } = await createProduct(TEST_PRODUCT, token);
        const res = await request
            .patch(`/api/products/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ category: "Headphones" });
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            category: "Headphones",
            id,
        });
    });

    it("should return 200 for admin updating price", async () => {
        await createAdminUser();
        const { token } = await loginAdminUser();
        const { id } = await createProduct(TEST_PRODUCT, token);
        const res = await request
            .patch(`/api/products/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ price: 3999 });
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            id,
            price: 3999,
        });
    });

    it("should return 400 for invalid price (negative)", async () => {
        await createAdminUser();
        const { token } = await loginAdminUser();
        const { id } = await createProduct(TEST_PRODUCT, token);
        const res = await request
            .patch(`/api/products/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ price: -100 });
        expect(res.status).toBe(400);
    });
});

describe("DELETE /api/products/:id", () => {
    it("should return 400 for invalid id format", async () => {
        await createAdminUser();
        const { token } = await loginAdminUser();
        const res = await request
            .delete("/api/products/invalid-id")
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(400);
    });

    it("should return 401 for unauthenticated request", async () => {
        const res = await request.delete(`/api/products/${getValidNonExistentObjectId()}`);
        expect(res.status).toBe(401);
    });

    it("should return 403 for non-admin user", async () => {
        const { token } = await createRegularUser();
        const res = await request
            .delete(`/api/products/${getValidNonExistentObjectId()}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(403);
    });

    it("should return 404 for non-existent product", async () => {
        await createAdminUser();
        const { token } = await loginAdminUser();
        const res = await request
            .delete(`/api/products/${getValidNonExistentObjectId()}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(404);
    });

    it("should return 204 for admin deleting product", async () => {
        await createAdminUser();
        const { token } = await loginAdminUser();
        const { id } = await createProduct(TEST_PRODUCT, token);
        const res = await request
            .delete(`/api/products/${id}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(204);

        const verifyRes = await request.get(`/api/products/${id}`);
        expect(verifyRes.status).toBe(404);
    });
});
