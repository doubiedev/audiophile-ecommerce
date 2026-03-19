export class BadRequestError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "BadRequestError";
    }
}

export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NotFoundError";
    }
}

export class UserForbiddenError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UserForbiddenError";
    }
}

export class UserNotAuthenticatedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UserNotAuthenticatedError";
    }
}
