'use strict';

//Verificar la cantidad de carácteres que admite MONGODB/ObjectID
function verifyIdLength(id){
    const largeId = id.length
    if(largeId !== 24){
        return false
    }else{
        return true
    }
}

module.exports = {
    verifyIdLength
}