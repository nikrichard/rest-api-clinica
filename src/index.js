'use strict'
const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');

mongoose.connect(
    config.db,
    {
        useUnifiedTopology: true,
		useNewUrlParser: true,
    }, (err,res)=>{
        if(err){
            return console.log(`Error al conectar la base de datos: ${err}`);
        }
        console.log(`Conexión a la base de datos exitosa`);

        app.listen(config.port, ()=>{
            console.log(`Server on port ${config.port}`);
        })

    }
);