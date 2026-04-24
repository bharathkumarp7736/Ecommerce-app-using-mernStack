import app from './app.js';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js'
dotenv.config({path:'backend/config.env'});
const PORT=process.env.PORT || 3000;


connectDB();
import {v2 as cloudinary} from 'cloudinary';
// Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

//uncaught Exception Handler
process.on("uncaughtException",(err)=>{
    console.log(`Error :${err.message}`);
    console.log(`Server is Shutting down, due to uncaught Exception `);
        process.exit(1);
});

const server=app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

//unhandled Rejection Handler/server
process.on("unhandledRejection",(err)=>{
    console.log(`Error :${err.message}`);
    console.log(`Server is Shutting down, due to unhandled rejection `);
    server.close(()=>{
        process.exit(1);
    });
});

