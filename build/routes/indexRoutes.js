"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router = express_1.default.Router();
//Import Controllers
const indexControllers_1 = __importDefault(require("../controllers/indexControllers"));
//indexRoutes
router.get('/', (0, cors_1.default)(), indexControllers_1.default.welcome);
exports.default = router;
//# sourceMappingURL=indexRoutes.js.map