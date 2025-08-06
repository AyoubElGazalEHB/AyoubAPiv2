const mongoose = require('mongoose');

/**
 * Database configuration and connection setup
 * Source: MongoDB official documentation - https://docs.mongodb.com/manual/
 * Source: Mongoose documentation - https://mongoosejs.com/docs/connections.html
 */

const connectDB = async () => {
    try {
        // MongoDB connection string - replace with your actual database URL
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ayoub_api_v2';
        
        const conn = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        
        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('⚠️ MongoDB disconnected');
        });

        // Graceful shutdown
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('🔒 MongoDB connection closed through app termination');
            process.exit(0);
        });

    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
