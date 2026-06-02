import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();
const connectionDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDb Connected: ${connect.connection.host} `);

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
    
}

export default connectionDb