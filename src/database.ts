import mongoose, {ConnectOptions} from "mongoose";
import config from './config/config';

async function connect(){
   try {
        await mongoose.connect(
            config.db, {
                useUnifiedTopology: true,
                useNewUrlParser: true
            } as ConnectOptions);
        console.log(`>>> Database connected`);
   } catch (error) {
        return console.log(`Error al conectar la base de datos: ${error}`);
   } 
}

export default connect;