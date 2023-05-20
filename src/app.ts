import express from 'express';
import morgan from 'morgan';
const app = express();

//Import routes
import indexRoutes from './routes/indexRoutes';
/*const hospitalRoutes = require('./routes/hospitalRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const medicalSpecialityRoutes = require('./routes/medicalSpecialityRoutes');*/

//const subCategoriesRoutes = require('./routes/subCategoriesRoutes')

//CORS Configuration
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Middlerares
app.use(morgan("dev"));

app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Use routes
app.use('/api', indexRoutes);
//app.use('/api', hospitalRoutes);
//app.use('/api', serviceRoutes);
//app.use('/api', medicalSpecialityRoutes);
//app.use('/api', subCategoriesRoutes);

export default app;