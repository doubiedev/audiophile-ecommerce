import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        setupFiles: ["./src/__tests__/setup.ts"],
        fileParallelism: false,
        env: {
            JWT_SECRET: "test-secret-for-unit-tests",
            PLATFORM: "dev",
            PORT: "8000",
            DB_URL: "mongodb://localhost:27018/audiophile-test",
        },
        coverage: {
            exclude: ["**/node_modules/**", "**/dist/**"],
            provider: "v8",
            reporter: ["text", "lcov"],
        },
    },
});
