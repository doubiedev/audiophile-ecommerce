import "express";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role: string;
            };
            validated: {
                body?: unknown;
                params?: unknown;
                query?: unknown;
            };
        }
    }
}

export {};
