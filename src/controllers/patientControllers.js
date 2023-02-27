'use strict'
//Import Model
const Category = require('../models/categoryModel');
const SubCategory = require('../models/subCategoryModel');

/**Métodos CRUD para el módulo de categorias */

//Función para verificar la cantidad de caracteres que admite MONGODB en ObjectID
function verifyIdLength(id){
    const largeId = id.length
    if(largeId !== 24){
        return false
    }else{
        return true
    }
}

//Método para crear una subcategoría
async function createSubCategory(req,res){
    const categoryId = req.body.categoryId
    const nameCategory = req.body.name
    try {
        const subCategory = new SubCategory({
            categoryId: categoryId,
            name: nameCategory
        })
        const verifyId = verifyIdLength(categoryId);
        if(!verifyId){
            res.status(409).json({success: false, message: "Error al realizar alguna petición"});
        }else{
            //Buscamos si existe o no una categoria con el _id: categoryId
            const categorySearch = await Category.findOne({_id: categoryId}).exec();
            if(!categorySearch){
                res.status(409).json({success: false, message: "Error al realizar alguna petición"})
            }else{
                await subCategory.save()
                res.status(200).json({success: true, message: "Información registrada con éxito"});
            } 
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: "Error al realizar alguna petición"})
    }
}

//Método para mostrar subcategorias
async function getAllSubCategories(req,res){
    let expectedQuery = req.query
    let numberNameFrom = "from" //nombre de la query que debemos de recibir
    let from = Number(expectedQuery.from); //variable para responder la busqueda desde un número determinado

    if(Object.entries(expectedQuery).length === 0){ //Verificamos si se envía o no una query
        res.status(409).json({success: false, message: "Error al realizar la petición"});
    }else{
        if(!expectedQuery.hasOwnProperty(numberNameFrom)){ //Verificamos si en la query existe la key "from"
            res.status(409).json({success: false, message: "Error al realizar la petició"});
        }else{
            try {
                const subCategories = await SubCategory.find(
                    {},
                    {
                        categoryId: 1,
                        name: 1,
                        registrationDate: 1
                    }
                )
                .skip(from)
                .limit(10)
                .sort({id: -1}); //-1 para descendente y 1 para ascendente
                const countSubCategories = await SubCategory.countDocuments() //Devolvemos la cantidad de documentos en la colección
                return res.status(200).json({success: true, subCategories: subCategories, total: countSubCategories})//, total: countBranchs});
            
            } catch (error) {
                console.log(error)
                res.status(500).json({success: false, message: "Error al realizar alguna petición"})
            }      

        }
    }
}

//Método para mostrar una subcategoría
async function getSubCategory(req,res){
    const subCategoryId = req.params.subCategoryId;
    try {
        const verifyId = verifyIdLength(subCategoryId);
        if(!verifyId){
            res.status(409).json({success: false, message: "Error al realizar la petición"});
        }else{
            const subCategorySearch = await SubCategory.findOne({_id: subCategoryId}).exec();
            if(!subCategorySearch){
                res.status(404).json({success: false, message: "Información no encontrada"})
            }else{
                res.status(200).json({success: true, subCategory: subCategorySearch})
            }
        }
    } catch (errors) {
        res.status(500).json({success: false, message: "Error al realizar alguna petición"})
    }
}

//Método para actualizar una subcategoría
async function updateSubCategory(req,res){
    const subCategoryId = req.params.id
    const categoryId = req.body.categoryId;
    const name = req.body.name
    
    const update = {
        categoryId: categoryId,
        name : name
    }
    
    const verifyId = verifyIdLength(subCategoryId);
    if(!verifyId){
        res.status(409).json({success: false, message: "Error al realizar la petición"});
    }else{   
        try {
            const subCategorySearch = await SubCategory.findOne({_id: subCategoryId}).exec(); //Verificamos si existe sub categoria
            if(!subCategorySearch){
                res.status(409).json({success: false, message: "Error al realizar la petición1"});
            }else{
                if(!verifyIdLength(categoryId)){
                    res.status(409).json({success: false, message: "Error al realizar la petición2"});
                }else{
                    const categorySearch = await Category.findOne({_id: categoryId}); //Verificamos si existe categoria       
                    if(!categorySearch){
                        res.status(404).json({success: false, message: "Información no encontrada3"})
                    }else{
                        await SubCategory.findByIdAndUpdate({_id: subCategoryId}, update, {new: true});
                        return res.status(200).json({success: true, message: "Información actualizada con éxito"})
                    }
                }
            }
        } catch (error) {
            res.status(500).json({success: false, message: "Error al realizar alguna petición"})            
        }
    }
}

//Método para eliminar una subcategoría
async function deleteSubCategory(req,res){
    const subCategoryId = req.params.id
    try{
        const verifyId = verifyIdLength(subCategoryId);
        if(!verifyId){
            res.status(409).json({success: false, message: "Error al realizar la petición"});
        }else{
            const subCategorySearch = await SubCategory.findOne({_id: subCategoryId});
            if(!subCategorySearch){
                res.status(404).json({success: false, message: "Información no encontrada"})
            }else{
                await SubCategory.findOneAndDelete({_id: subCategoryId});
                return res.status(200).json({success: true, message: "Información eliminada correctamente"})
            }
        }
    }catch(errors){
        res.status(500).json({success: false, message: "Error al realizar alguna petición"})
    }
}

module.exports = {
    createSubCategory,
    getAllSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory
}