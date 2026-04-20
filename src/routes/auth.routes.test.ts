import app from "#app.js";
import supertest from "supertest";
import { describe, expect, it } from "vitest";

const request = supertest(app);

const TEST_USER = {
    email: "auth-test@test.com",
    name: "Auth Test User",
    password: "password123",
};

async function createAndLoginUser() {
    await request.post("/api/users").send(TEST_USER);
    const res = await request.post("/api/auth/login").send({
        email: TEST_USER.email,
        password: TEST_USER.password,
    });
    return res.body as { id: string; refreshToken: string; token: string };
}

describe("POST /api/auth/login", () => {
    it("should return 201 with token and refreshToken for valid credentials", async () => {
        await request.post("/api/users").send(TEST_USER);
        const res = await request.post("/api/auth/login").send({
            email: TEST_USER.email,
            password: TEST_USER.password,
        });
        expect(res.status).toBe(201);
        expect(res.body).toMatchObject({
            email: TEST_USER.email,
            name: TEST_USER.name,
        });
        expect(res.body).toHaveProperty("token");
        expect(res.body).toHaveProperty("refreshToken");
        expect(res.body).not.toHaveProperty("hashedPassword");
    });

    it("should return 401 for wrong password", async () => {
        await request.post("/api/users").send(TEST_USER);
        const res = await request.post("/api/auth/login").send({
            email: TEST_USER.email,
            password: "wrongpassword",
        });
        expect(res.status).toBe(401);
    });

    it("should return 401 for non-existent email", async () => {
        const res = await request.post("/api/auth/login").send({
            email: "nonexistent@test.com",
            password: TEST_USER.password,
        });
        expect(res.status).toBe(401);
    });

    it("should return 400 for invalid email", async () => {
        const res = await request.post("/api/auth/login").send({
            email: "not-an-email",
            password: TEST_USER.password,
        });
        expect(res.status).toBe(400);
    });
});

describe("POST /api/auth/refresh", () => {
    it("should return a new access token for a valid refresh token", async () => {
        const { refreshToken } = await createAndLoginUser();
        const res = await request
            .post("/api/auth/refresh")
            .set("Authorization", `Bearer ${refreshToken}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("token");
    });

    it("should return 401 for an invalid refresh token", async () => {
        const res = await request
            .post("/api/auth/refresh")
            .set("Authorization", "Bearer invalidtoken");
        expect(res.status).toBe(401);
    });

    it("should return 401 for a revoked refresh token", async () => {
        const { refreshToken } = await createAndLoginUser();
        await request.post("/api/auth/revoke").set("Authorization", `Bearer ${refreshToken}`);
        const res = await request
            .post("/api/auth/refresh")
            .set("Authorization", `Bearer ${refreshToken}`);
        expect(res.status).toBe(401);
    });

    it("should return 401 for missing authorization header", async () => {
        const res = await request.post("/api/auth/refresh");
        expect(res.status).toBe(401);
    });
});

describe("POST /api/auth/revoke", () => {
    it("should return 204 and revoke the token", async () => {
        const { refreshToken } = await createAndLoginUser();
        const res = await request
            .post("/api/auth/revoke")
            .set("Authorization", `Bearer ${refreshToken}`);
        expect(res.status).toBe(204);
    });

    it("should return 401 for missing authorization header", async () => {
        const res = await request.post("/api/auth/revoke");
        expect(res.status).toBe(401);
    });

    it("should return 401 for an invalid refresh token", async () => {
        const res = await request
            .post("/api/auth/revoke")
            .set("Authorization", "Bearer invalidtoken");
        expect(res.status).toBe(401);
    });
});
