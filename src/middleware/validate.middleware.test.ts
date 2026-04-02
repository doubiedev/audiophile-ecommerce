import type { Request, Response } from "express";

import { describe, expect, it, vi } from "vitest";
import { z } from "zod";

import { validateBody, validateParams } from "./validate.middleware.js";

interface MockRequest extends Request {
    body: Record<string, unknown>;
    validated: Record<string, unknown>;
}

const mockRequest = (params: Record<string, string> = {}): MockRequest => {
    const req = {
        body: {},
        params,
        validated: {} as Record<string, unknown>,
    } as MockRequest;
    return req;
};

const mockResponse = (): Response => {
    return {} as Response;
};
const mockNext = vi.fn();
describe("validateParams", () => {
    it("should populate req.validated.params with validated params", () => {
        const schema = { id: z.string() };
        const req = mockRequest({ id: "123" });
        validateParams(schema)(req, mockResponse(), mockNext);
        expect((req.validated.params as Record<string, unknown>).id).toBe("123");
    });
    it("should throw ZodError for invalid params", () => {
        const schema = { id: z.string().length(24) };
        const req = mockRequest({ id: "short" });
        expect(() => {
            validateParams(schema)(req, mockResponse(), mockNext);
        }).toThrow();
    });
    it("should call next on success", () => {
        validateParams({ id: z.string() })(mockRequest({ id: "abc" }), mockResponse(), mockNext);
        expect(mockNext).toHaveBeenCalled();
    });
});

describe("validateBody", () => {
    it("should populate req.validated.body with validated body", () => {
        const schema = z.object({ email: z.email(), name: z.string() });
        const req = mockRequest();
        req.body = { email: "john@example.com", name: "John" };
        validateBody(schema)(req, mockResponse(), mockNext);
        expect(req.validated.body).toEqual({ email: "john@example.com", name: "John" });
    });

    it("should throw ZodError for invalid body", () => {
        const schema = z.object({ email: z.email() });
        const req = mockRequest();
        req.body = { email: "not-an-email" };
        expect(() => {
            validateBody(schema)(req, mockResponse(), mockNext);
        }).toThrow();
    });

    it("should call next on success", () => {
        const req = mockRequest();
        req.body = { name: "Jane" };
        validateBody(z.object({ name: z.string() }))(req, mockResponse(), mockNext);
        expect(mockNext).toHaveBeenCalled();
    });

    it("should reset validated object before populating body", () => {
        const schema = z.object({ id: z.number() });
        const req = mockRequest();
        req.validated = { body: undefined, params: { id: "123" }, query: undefined };
        req.body = { id: 42 };
        validateBody(schema)(req, mockResponse(), mockNext);
        expect(req.validated.body).toEqual({ id: 42 });
    });

    it("should preserve params when validateBody is called after validateParams", () => {
        const req = mockRequest({ id: "abc" });
        req.body = { name: "John" };
        validateParams({ id: z.string() })(req, mockResponse(), mockNext);
        validateBody(z.object({ name: z.string() }))(req, mockResponse(), mockNext);
        expect((req.validated.params as Record<string, unknown>).id).toBe("abc");
        expect(req.validated.body).toEqual({ name: "John" });
    });
});
