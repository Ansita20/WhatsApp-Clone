import mongoose from 'mongoose';

const connection = async () => {
    const url = 'mongodb+srv://ansita6050:47GU4CWkRP3CN6Mv@cluster0.tfsd7w4.mongodb.net/'
    try{
        await mongoose.connect(url,{ useUnifiedTopology: true});
        console.log('data connected successfully');
        
    }catch(error){
        console.log('error while connecting with the database', error.message);
        
    }
}

export default connection;