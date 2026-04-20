import {
    checkPasswordHash,
    hashPassword,
    makeJWT,
    makeRefreshToken,
    validateJWT,
} from "#services/auth.service.js";
import { UserNotAuthenticatedError } from "#utils/errors.js";
import jwt from "jsonwebtoken";
import { beforeAll, describe, expect, it } from "vitest";

const TEST_USER_ID = "q88rJnxdDPYYY7PsBGwCc6QpZ2X7Frvb";
const TEST_PASSWORD = "password123";
const ONE_HOUR = 60 * 60;

let TEST_HASH_1: string;
let TEST_HASH_2: string;

beforeAll(async () => {
    TEST_HASH_1 = await hashPassword(TEST_PASSWORD);
    TEST_HASH_2 = await hashPassword(TEST_PASSWORD);
});

describe("hashPassword", () => {
    it("should return a hash different from the input", () => {
        expect(TEST_HASH_1).not.toBe(TEST_PASSWORD);
    });
    it("should return a different hash each time for the same input", () => {
        expect(TEST_HASH_1).not.toBe(TEST_HASH_2);
    });
});

describe("checkPasswordHash", () => {
    it("should return true for a matching password", async () => {
        expect(await checkPasswordHash(TEST_PASSWORD, TEST_HASH_1)).toBe(true);
    });
    it("should return false for a non-matching password", async () => {
        expect(await checkPasswordHash("wrongpassword", TEST_HASH_1)).toBe(false);
    });
    it("should return false for an empty password", async () => {
        expect(await checkPasswordHash("", TEST_HASH_1)).toBe(false);
    });
});

describe("makeJWT", () => {
    it("should return a valid JWT string", () => {
        const token = makeJWT(TEST_USER_ID, ONE_HOUR);
        expect(token.split(".")).toHaveLength(3);
    });

    it("should expire after the given duration", () => {
        const token = makeJWT(TEST_USER_ID, ONE_HOUR);
        const decoded = jwt.decode(token) as { exp: number; iat: number };
        expect(decoded.exp - decoded.iat).toBe(ONE_HOUR);
    });

    it("should embed the correct user id", () => {
        const token = makeJWT(TEST_USER_ID, ONE_HOUR);
        const decoded = jwt.decode(token) as { sub: string };
        expect(decoded.sub).toBe(TEST_USER_ID);
    });
});

describe("validateJWT", () => {
    it("should return the user id for a valid token", () => {
        const token = makeJWT(TEST_USER_ID, ONE_HOUR);
        expect(validateJWT(token)).toBe(TEST_USER_ID);
    });

    it("should throw UserNotAuthenticatedError for an expired token", () => {
        const token = makeJWT(TEST_USER_ID, -1);
        expect(() => validateJWT(token)).toThrow(UserNotAuthenticatedError);
    });

    it("should throw UserNotAuthenticatedError for a tampered token", () => {
        const token = makeJWT(TEST_USER_ID, ONE_HOUR);
        const [header, payload, signature] = token.split(".");
        const tamperedToken = `${header}.${payload}.${signature}tampered`;
        expect(() => validateJWT(tamperedToken)).toThrow(UserNotAuthenticatedError);
    });

    it("should throw UserNotAuthenticatedError for wrong issuer", () => {
        const token = jwt.sign(
            { iss: "wrong-issuer", sub: TEST_USER_ID },
            process.env.JWT_SECRET ?? "test-secret",
            {
                algorithm: "HS256",
                expiresIn: ONE_HOUR,
            },
        );
        expect(() => validateJWT(token)).toThrow(UserNotAuthenticatedError);
    });
});

describe("makeRefreshToken", () => {
    it("should return a 64 character hex string", () => {
        const token = makeRefreshToken();
        expect(token).toHaveLength(64);
        expect(token).toMatch(/^[a-f0-9]+$/);
    });

    it("should return a different token each time", () => {
        const token1 = makeRefreshToken();
        const token2 = makeRefreshToken();
        expect(token1).not.toBe(token2);
    });
});
