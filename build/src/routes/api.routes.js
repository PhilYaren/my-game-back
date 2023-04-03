"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const games_routes_1 = __importDefault(require("./games.routes"));
const users_routes_1 = __importDefault(require("./users.routes"));
const answ_questions_router_1 = __importDefault(require("./answ_questions.router"));
const router = express_1.default.Router();
router.use('/auth', auth_routes_1.default);
router.use('/users', users_routes_1.default);
router.use('/answers', answ_questions_router_1.default);
router.use('/games', games_routes_1.default);
exports.default = router;
