import { config } from "#config/config.js";
import mongoose from "mongoose";
import { afterAll, afterEach, beforeAll } from "vitest";

beforeAll(async () => {
    await mongoose.connect(config.db.url);
});

afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
});

afterAll(async () => {
    await mongoose.disconnect();
});
