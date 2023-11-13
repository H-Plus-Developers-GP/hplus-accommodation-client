import mongoose from "mongoose"

let isConnected = false;

export const connectDB = async () => {
    mongoose.set("strictQuery", true);

    if (isConnected) {
        console.log('DB ALREADY CONNECTED')
        return;
    }

    try {
        await mongoose.connect(process.env.MONDODB_URI as string, {
            dbName: "hplus-accommodation-db",
        })
        isConnected = true;
        console.log('DB CONNECTED')
    } catch (error) {
        console.log(error);
    }
}

const something = "new";