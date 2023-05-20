"use strict";
module.exports = {
    port: process.env.PORT || 2000,
    //db: process.env.MONGODB || 'mongodb+srv://marketplace:marketplace@cluster0.ncz6anu.mongodb.net/?retryWrites=true&w=majority',
    db: process.env.MONGODB || 'mongodb://localhost:27017/clinic',
    SECRET_TOKEN: 'mysecret_token'
};
//# sourceMappingURL=config.js.map