
import mongoose from "mongoose";

let mongoServer;

const connectDB = async () => {
    try {
        let mongoUri = process.env.MONGO_URI;

        // If no MONGO_URI is provided, spin up an in-memory MongoDB for local development/demo
        if (!mongoUri) {
            // dynamic import so this only runs when needed
            const { MongoMemoryServer } = await import("mongodb-memory-server");
            mongoServer = await MongoMemoryServer.create();
            mongoUri = mongoServer.getUri();
            console.log("Using in-memory MongoDB for development (mongodb-memory-server)");
        }

        await mongoose.connect(mongoUri);
        console.log("MONGODB Connected");
    } catch (error) {
        console.error("MongoDB connection failed", error.message);
        process.exit(1);
    }
};

export default connectDB;