const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
    // If already connected, return
    if (isConnected) {
        console.log('✅ Using existing MongoDB connection');
        return;
    }

    try {
        const options = {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };

        // Only add TLS bypass for development
        if (process.env.NODE_ENV !== 'production') {
            options.tls = true;
            options.tlsAllowInvalidCertificates = true;
        }

        await mongoose.connect(process.env.MONGO_URI, options);
        isConnected = true;
        console.log('✅ MongoDB Connected Successfully');
    } catch (error) {
        console.error('❌ MongoDB Connection Failed:', error.message);
        throw error;
    }
};

module.exports = connectDB;
