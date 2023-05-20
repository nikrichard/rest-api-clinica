"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const welcome = (req, res) => {
    res.status(200).json({
        message: "Hola desde mi REST API con Typescript 2023"
    });
};
const nuevo = () => {
};
exports.default = {
    welcome,
    nuevo
};
//# sourceMappingURL=indexControllers.js.map