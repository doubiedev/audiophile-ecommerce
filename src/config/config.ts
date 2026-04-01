interface APIConfig {
    nodeEnv: string;
    port: number;
}

interface Config {
    api: APIConfig;
    db: DBConfig;
    jwt: JWTConfig;
}

interface DBConfig {
    url: string;
}

interface JWTConfig {
    defaultDuration: number;
    issuer: string;
    refreshDuration: number;
    secret: string;
}

function envOrThrow(key: string) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Environment variable ${key} is not set`);
    }
    return value;
}

export const config: Config = {
    api: {
        nodeEnv: envOrThrow("NODE_ENV"),
        port: Number(envOrThrow("PORT")),
    },
    db: {
        url: envOrThrow("DB_URL"),
    },
    jwt: {
        defaultDuration: 60 * 60, // 1 hour in seconds (JWT Unix timestamp offset)
        issuer: "audiophile",
        refreshDuration: 60 * 60 * 24 * 60 * 1000, // 60 days in milliseconds (Date.now() offset)
        secret: envOrThrow("JWT_SECRET"),
    },
};
