import app from "#app.js";
import { config } from "#config/config.js";
import connectDB from "#config/db.js";

try {
    await connectDB();
    app.listen(config.api.port, () => {
        console.log(`Server started on port ${config.api.port.toString()}`);
    });
} catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
}
