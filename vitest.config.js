import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        env: {
            JWT_SECRET: "test-secret-for-unit-tests",
            PLATFORM: "dev",
            PORT: "8000",
            DB_URL: "mongodb://localhost:27018/audiophile-test",
        },
    },
});
