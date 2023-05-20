"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
//Import routes
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
/*const hospitalRoutes = require('./routes/hospitalRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const medicalSpecialityRoutes = require('./routes/medicalSpecialityRoutes');*/
//const subCategoriesRoutes = require('./routes/subCategoriesRoutes')
//CORS Configuration
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
//Middlerares
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
//Use routes
app.use('/api', indexRoutes_1.default);
//app.use('/api', hospitalRoutes);
//app.use('/api', serviceRoutes);
//app.use('/api', medicalSpecialityRoutes);
//app.use('/api', subCategoriesRoutes);
exports.default = app;
//# sourceMappingURL=app.js.map