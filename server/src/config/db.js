const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`-------------------------------------------------------------------`);
        console.error(`DATABASE CONNECTION ERROR: ${error.message}`);
        console.error(`-------------------------------------------------------------------`);
        console.error(`TIPS FOR ATLAS USERS:`);
        console.error(`1. Ensure your IP address is whitelisted in MongoDB Atlas.`);
        console.error(`2. Double check your MONGO_URI in the .env file.`);
        console.error(`3. Starting server in "Partial Mode" (API will work, but DB operations will fail).`);
        console.error(`-------------------------------------------------------------------`);
        // We do NOT call process.exit(1) here so the server stays up
    }
};

module.exports = connectDB;
