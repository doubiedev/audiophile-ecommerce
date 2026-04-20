import app from "#app.js";
import User from "#models/user.model.js";
import { hashPassword } from "#services/auth.service.js";
import mongoose from "mongoose";
import supertest from "supertest";
import { describe, expect, it } from "vitest";

const request = supertest(app);

const getValidNonExistentObjectId = () => new mongoose.Types.ObjectId().toString();

const TEST_USER = {
    email: "user-test@test.com",
    name: "User Test",
    password: "password123",
};

const TEST_ADMIN = {
    email: "admin-test@test.com",
    name: "Admin Test",
    password: "password123",
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

async function createUser(data = TEST_USER) {
    const res = await request.post("/api/users").send(data);
    return res.body as { email: string; id: string; name: string; role: string };
}

async function loginAdminUser() {
    const res = await request.post("/api/auth/login").send({
        email: TEST_ADMIN.email,
        password: TEST_ADMIN.password,
    });
    return res.body as { id: string; token: string };
}

async function loginUser(data = TEST_USER) {
    await createUser(data);
    const res = await request.post("/api/auth/login").send({
        email: data.email,
        password: data.password,
    });
    return res.body as { id: string; token: string };
}

describe("POST /api/users", () => {
    it("should return 201 with user data for valid input", async () => {
        const res = await request.post("/api/users").send(TEST_USER);
        expect(res.status).toBe(201);
        expect(res.body).toMatchObject({
            email: TEST_USER.email,
            name: TEST_USER.name,
        });
        expect(res.body).not.toHaveProperty("hashedPassword");
    });

    it("should return 400 for missing email", async () => {
        const res = await request.post("/api/users").send({
            name: "Test",
            password: "password123",
        });
        expect(res.status).toBe(400);
    });

    it("should return 400 for invalid email", async () => {
        const res = await request.post("/api/users").send({
            email: "not-an-email",
            name: "Test",
            password: "password123",
        });
        expect(res.status).toBe(400);
    });

    it("should return 400 for missing name", async () => {
        const res = await request.post("/api/users").send({
            email: "test@test.com",
            password: "password123",
        });
        expect(res.status).toBe(400);
    });

    it("should return 400 for missing password", async () => {
        const res = await request.post("/api/users").send({
            email: "test@test.com",
            name: "Test",
        });
        expect(res.status).toBe(400);
    });

    it("should return 409 for duplicate email", async () => {
        await request.post("/api/users").send(TEST_USER);
        const res = await request.post("/api/users").send(TEST_USER);
        expect(res.status).toBe(409);
    });
});

describe("GET /api/users", () => {
    it("should return 401 for unauthenticated request", async () => {
        const res = await request.get("/api/users");
        expect(res.status).toBe(401);
    });

    it("should return 403 for non-admin user", async () => {
        const { token } = await loginUser();
        const res = await request.get("/api/users").set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(403);
    });

    it("should return 200 with users for admin", async () => {
        await createAdminUser();
        const { token } = await loginAdminUser();
        const res = await request.get("/api/users").set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("users");
        expect(res.body).toHaveProperty("page");
        expect(res.body).toHaveProperty("pages");
    });
});

describe("GET /api/users/:id", () => {
    it("should return 400 for invalid id format (validation runs before auth)", async () => {
        const res = await request.get("/api/users/someid");
        expect(res.status).toBe(400);
    });

    it("should return 401 for unauthenticated request with valid id format", async () => {
        const res = await request.get(`/api/users/${getValidNonExistentObjectId()}`);
        expect(res.status).toBe(401);
    });

    it("should return 400 for invalid id format with auth", async () => {
        const { token } = await loginUser();
        const res = await request
            .get("/api/users/invalid-id")
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(400);
    });

    it("should return 200 for owner accessing own profile", async () => {
        const { id, token } = await loginUser();
        const res = await request.get(`/api/users/${id}`).set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            email: TEST_USER.email,
            id,
            name: TEST_USER.name,
        });
    });

    it("should return 403 for non-owner accessing other user profile", async () => {
        await loginUser();
        const otherUser = await createUser({
            email: "other@test.com",
            name: "Other",
            password: "password123",
        });
        const { token } = await loginUser({
            email: "self@test.com",
            name: "Self",
            password: "password123",
        });
        const res = await request
            .get(`/api/users/${otherUser.id}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(403);
    });

    it("should return 200 for admin accessing any user profile", async () => {
        await createAdminUser();
        const { id } = await createUser();
        const { token } = await loginAdminUser();
        const res = await request.get(`/api/users/${id}`).set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    it("should return 403 for non-owner with valid id (404 handled after auth check)", async () => {
        const { token } = await loginUser();
        const res = await request
            .get(`/api/users/${getValidNonExistentObjectId()}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(403);
    });
});

describe("PATCH /api/users/:id", () => {
    it("should return 400 for invalid id format (validation runs before auth)", async () => {
        const res = await request.patch("/api/users/someid").send({ name: "New Name" });
        expect(res.status).toBe(400);
    });

    it("should return 400 for invalid id format with auth", async () => {
        const { token } = await loginUser();
        const res = await request
            .patch("/api/users/invalid-id")
            .set("Authorization", `Bearer ${token}`)
            .send({ name: "New Name" });
        expect(res.status).toBe(400);
    });

    it("should return 200 for owner updating own profile", async () => {
        const { id, token } = await loginUser();
        const res = await request
            .patch(`/api/users/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Updated Name",
            });
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            id,
            name: "Updated Name",
        });
    });

    it("should return 200 for owner updating email", async () => {
        const { id, token } = await loginUser();
        const res = await request
            .patch(`/api/users/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                email: "updated@test.com",
            });
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            email: "updated@test.com",
            id,
        });
    });

    it("should return 200 for owner updating password", async () => {
        const { id, token } = await loginUser();
        const res = await request
            .patch(`/api/users/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                password: "newpassword123",
            });
        expect(res.status).toBe(200);
    });

    it("should return 400 for invalid email in update", async () => {
        const { id, token } = await loginUser();
        const res = await request
            .patch(`/api/users/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                email: "not-an-email",
            });
        expect(res.status).toBe(400);
    });

    it("should return 403 for non-owner updating other user profile", async () => {
        await loginUser();
        const otherUser = await createUser({
            email: "other@test.com",
            name: "Other",
            password: "password123",
        });
        const { token } = await loginUser({
            email: "self@test.com",
            name: "Self",
            password: "password123",
        });
        const res = await request
            .patch(`/api/users/${otherUser.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Hacked Name",
            });
        expect(res.status).toBe(403);
    });

    it("should return 200 for admin updating any user profile", async () => {
        await createAdminUser();
        const { id } = await createUser();
        const { token } = await loginAdminUser();
        const res = await request
            .patch(`/api/users/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Admin Updated Name",
            });
        expect(res.status).toBe(200);
    });
});

describe("DELETE /api/users/:id", () => {
    it("should return 400 for invalid id format (validation runs before auth)", async () => {
        const res = await request.delete("/api/users/someid");
        expect(res.status).toBe(400);
    });

    it("should return 400 for invalid id format with auth", async () => {
        const { token } = await loginUser();
        const res = await request
            .delete("/api/users/invalid-id")
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(400);
    });

    it("should return 204 for owner deleting own profile", async () => {
        const { id, token } = await loginUser();
        const res = await request
            .delete(`/api/users/${id}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(204);
    });

    it("should return 403 for non-owner deleting other user profile", async () => {
        await loginUser();
        const otherUser = await createUser({
            email: "other@test.com",
            name: "Other",
            password: "password123",
        });
        const { token } = await loginUser({
            email: "self@test.com",
            name: "Self",
            password: "password123",
        });
        const res = await request
            .delete(`/api/users/${otherUser.id}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(403);
    });

    it("should return 204 for admin deleting any user profile", async () => {
        await createAdminUser();
        const { id } = await createUser();
        const { token } = await loginAdminUser();
        const res = await request
            .delete(`/api/users/${id}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(204);
    });

    it("should return 403 for non-owner with valid id (404 handled after auth check)", async () => {
        const { token } = await loginUser();
        const res = await request
            .delete(`/api/users/${getValidNonExistentObjectId()}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(403);
    });
});
