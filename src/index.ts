import config from './config/config';
import app from './app';
import database from './database';

database();        
app.listen(config.port, ()=>{
    console.log(`Server on port ${config.port}`);
})