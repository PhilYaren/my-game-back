"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const game_query_1 = require("../database/game.query");
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const router = express_1.default.Router();
router.get('/', isAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.session.user.id;
        const games = yield (0, game_query_1.getAllGames)(userId);
        res.json(games);
    }
    catch (e) {
        res.status(500).json({ message: 'Internal server error' });
    }
}));
router.get('/:id', isAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const game = yield (0, game_query_1.getGame)(id, req.session.user.id);
        res.json(game);
    }
    catch (e) {
        res.status(500).json({ message: 'Internal server error' });
    }
}));
exports.default = router;
