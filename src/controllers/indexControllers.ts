import { Request, Response } from "express";

const welcome = (req:Request, res:Response):void => {
    res.status(200).json({
        message: "Hola desde mi REST API con Typescript 2023"
    });
}

const nuevo = ()=>{

}

export default {
    welcome,
    nuevo
}