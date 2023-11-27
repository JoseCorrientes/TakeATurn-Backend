import mongoose from "mongoose";

const {DB_URI} = process.env | 'mongodb+srv://josernestogarcia609:bWykW9cyzn7w7scI@cluster0.g4ycobq.mongodb.net/?retryWrites=true&w=majority';

export const connectDB = async ()=>{
        try {
            mongoose.set('strictQuery', false)
            await mongoose.connect(DB_URI);
            console.log('Se conecto correctamente a la DB.')

        }catch(e) {
            console.log('Error al conectar a la DB.')
        }


}