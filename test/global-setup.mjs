import mongoose from 'mongoose';

// function to connect with mongodb database
// export async function mochaGlobalSetup(){
//     console.log('Global Setup: connecting to database');

//     // use environment variable for MongoDB connection URI
//     const mongoUri = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/FoodDelivery';
//     await mongoose.connect(mongoUri);
// }


// function to disconnect the database
export async function mochaGlobalTeardown(){

    console.log('Global Teardown: Disconnecting to database');
    await mongoose.disconnect();
}