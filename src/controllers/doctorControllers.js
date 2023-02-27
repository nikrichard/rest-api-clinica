'use strict'
//Import Models
const Hospital = require('../models/hospitalModel');
const bcrypt = require("bcryptjs");
const service = require("../services/JWTService");

//Método para registro de hospital
async function doctorSignup(req,res){
    const name = req.body.name;
    const cellphone = req.body.cellphone;
    const email = req.body.email;
    const address = req.body.address;
    const city = req.body.city;
    const country = req.body.country;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;
    const role = req.body.role;

    if(password !== passwordConfirm) {
        res.status(400).json({ 
            success: false, 
            messge: 'Las contraseñas no coinciden.' 
        });
        return;
    }

    try {
        const emailSearch = await Hospital.findOne({email: email});
        if(!emailSearch){
            const hospital = new Hospital({
                name: name,
                cellphone: cellphone,
                email: email,
                address: address,
                city: city,
                country: country,
                password: password,
                role: role
            })
            hospital.password = await hospital.encryptPassword(password)
            await hospital.save((err)=>{
                if(err){
                    res.status(500).json({
                        success: false,
                        message: `Error al registrarte; comunicate con el área de soporte`
                    })
                }
                res.status(200).json({
                    success: true,
                    message: 'Te registraste con éxito' 
                })
            })
        }else{
            res.status(401).json({ emailexist: true, message: "El email ya está en uso" });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error al realizar alguna petición, por favor comunicarse con soporte`
        })
        console.log(error);
    }
}

//Método para inicio de sesión de hospital
async function hospitalSignin(req,res){
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await Hospital.findOne({email: email});
        if(!user){
            res.status(401).json({ success: false, message: "Email o contraseña incorrecta" });
        }else{
            bcrypt.compare(password, user.password, (err,isMatch)=>{
                if(err){
                    res.status(500).json({ 
                        success: false,
                        message: `Error al realizar alguna petición, por favor comunicarse con soporte` 
                    });
                }if(!isMatch){
                    res.status(400).json({ 
                        success: false,
                        message: `Contraseña incorrecta`
                    });
                }else{
                    const token = service.createToken(user);
                    res.status(200).json({
                        success: true,
                        user:{
                            id: user._id,
                            token: "bearer " + token,
                            message: "Te has logueado correctamente"
                        }
                    })
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error al realizar alguna petición, por favor comunicarse con soporte`
        })
        console.log(error);
    }
}

//Método para confirmar registro de hospital
function accountConfirmation(){

}

module.exports = {
    hospitalSignup,
    hospitalSignin,
    accountConfirmation
}

/*'use strict'
//Import Model
const Category = require('../models/categoryModel');

Métodos CRUD para el módulo de categorias 

//Función para verificar la cantidad de caracteres que admite MONGODB en ObjectID
function verifyIdLength(id){
    const largeId = id.length
    if(largeId !== 24){
        return false
    }else{
        return true
    }
}

//Método para crear una categoría
async function createCategory(req,res){
    const nameCategory = req.body.name
    const icon = req.body.icon

    try {
        const category = new Category({
            name: nameCategory,
            icon: 'null'
        })
        await category.save()
        res.status(200).json({success: true, message: "Categoria creada con éxito"});
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: "Error al realizar alguna petición"})
    }
    
}

//Mostrar categorias
async function getAllCategories(req,res){
    try {
        const categories = await Category.find({});
        res.status(200).json({success: true, categories: categories})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: "Error al realizar alguna petición"})
    }
}

//Método para mostrar categorias
/*async function getAllCategories(req,res){
    let expectedQuery = req.query
    let numberNameFrom = "from" //nombre de la query que debemos de recibir
    let from = Number(expectedQuery.from); //variable para responder la busqueda desde un número determinado

    if(Object.entries(expectedQuery).length === 0){ //Verificamos si se envía o no una query
        res.status(409).json({success: false, message: "Error al realizar la petición"});
    }else{
        if(!expectedQuery.hasOwnProperty(numberNameFrom)){ //Verificamos si en la query existe la key "from"
            res.status(409).json({success: false, message: "Error al realizar la petició1"});
        }else{
            try {
                const categories = await Category.find(
                    {},
                    {
                        name: 1,
                        registrationDate: 1
                    }
                )
                .skip(from)
                .limit(10)
                .sort({id: -1}); //-1 para descendente y 1 para ascendente
                const countCategories = await Category.countDocuments() //Devolvemos la cantidad de documentos en la colección
                return res.status(200).json({success: true, categories: categories, total: countCategories})//, total: countBranchs});
            
            } catch (error) {
                console.log(error)
                res.status(500).json({success: false, message: "Error al realizar alguna petición"})
            }      

        }
    }
}

//Método para mostrar una categoría
async function getCategory(req,res){
    const categoryId = req.params.categoryId;
    
    try {
        const categoryLength = verifyIdLength(categoryId);
        if(!categoryLength){
            res.status(409).json({success: false, message: "Error al realizar la petición"});
        }else{
            const categorySearch = await Category.findOne({_id: categoryId}).exec();
            if(!categorySearch){
                res.status(404).json({success: false, message: "Información no encontrada"})
            }else{
                res.status(200).json({success: true, category: categorySearch})
            }
        }
    } catch (errors) {
        res.status(500).json({success: false, message: "Error al realizar alguna petición"})
    }
}

//Método para actualizar una categoría
async function updateCategory(req,res){
    const categoryId = req.params.id
    const name = req.body.name;
    
    const update = {
        name : name
    }
    
    const verify = verifyIdLength(categoryId);
    if(!verify){
        res.status(409).json({success: false, message: "Error al realizar la petición"});
    }else{
        try {
            const categorySearch = await Category.findOne({_id: categoryId});
            if(!categorySearch){
                res.status(404).json({success: false, message: "Información no encontrada"})
            }else{
                await Category.findByIdAndUpdate({_id: categoryId}, update, {new: true});
                return res.status(200).json({success: true, message: "Información actualizada con éxito"})
            }
        } catch (error) {
            res.status(500).json({success: false, message: "Error al realizar alguna petición"})            
        }
    }
}

//Método para eliminar una categoría
async function deleteCategory(req,res){
    const categoryId = req.params.id
    try{
        const verify = verifyIdLength(categoryId);
        if(!verify){
            res.status(409).json({success: false, message: "Error al realizar la petición"});
        }else{
            const categorySearch = await Category.findOne({_id: categoryId});
            if(!categorySearch){
                res.status(404).json({success: false, message: "Información no encontrada"})
            }else{
                await Category.findOneAndDelete({_id: categoryId});
                return res.status(200).json({success: true, message: "Información eliminada correctamente"})
            }
        }
    }catch(errors){
        res.status(500).json({success: false, message: "Error al realizar alguna petición"})
    }
}

module.exports = {
    createCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory
}*/