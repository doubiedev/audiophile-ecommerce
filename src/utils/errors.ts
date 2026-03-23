export class BadRequestError extends Error {
    readonly statusCode = 400;
    constructor(message: string) {
        super(message);
        this.name = "BadRequestError";
    }
}

export class NotFoundError extends Error {
    readonly statusCode = 404;
    constructor(message: string) {
        super(message);
        this.name = "NotFoundError";
    }
}

export class UserForbiddenError extends Error {
    readonly statusCode = 403;
    constructor(message: string) {
        super(message);
        this.name = "UserForbiddenError";
    }
}

export class UserNotAuthenticatedError extends Error {
    readonly statusCode = 401;
    constructor(message: string) {
        super(message);
        this.name = "UserNotAuthenticatedError";
    }
}
