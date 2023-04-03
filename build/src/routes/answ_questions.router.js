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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const answ_questions_query_1 = require("../database/answ_questions.query");
exports.router = express_1.default.Router();
exports.router.post('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { answer, gameId } = req.body;
    const id = parseInt(req.params.id);
    const playerId = req.session.user.id;
    let answered = false;
    try {
        const questionField = yield (0, answ_questions_query_1.correctAnswer)(id);
        answered = (questionField === null || questionField === void 0 ? void 0 : questionField.answer.toLowerCase()) === answer.toLowerCase();
        const result = yield (0, answ_questions_query_1.answQuest)(id, answered, gameId, playerId);
        res.json(result);
    }
    catch (err) {
        console.error(err);
    }
}));
exports.default = exports.router;
