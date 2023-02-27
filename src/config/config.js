module.exports = {
    port: process.env.PORT || 2000,
    //db: process.env.MONGODB || 'mongodb+srv://marketplace:marketplace@cluster0.ncz6anu.mongodb.net/?retryWrites=true&w=majority',
	db: process.env.MONGODB || 'mongodb://localhost:27017/clinic',  //coneccion local a mongo db
    SECRET_TOKEN: 'mysecret_token'
}