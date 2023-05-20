"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config/config"));
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./database"));
(0, database_1.default)();
app_1.default.listen(config_1.default.port, () => {
    console.log(`Server on port ${config_1.default.port}`);
});
//# sourceMappingURL=index.js.map