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
const user_query_1 = require("../database/user.query");
const bcrypt_1 = __importDefault(require("bcrypt"));
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const isUnLogged_1 = __importDefault(require("../middlewares/isUnLogged"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    var _a;
    const user = (_a = req.session) === null || _a === void 0 ? void 0 : _a.user;
    if (user) {
        res.json(user);
        return;
    }
    res.status(401).json({ message: 'Unauthorized' });
});
router.post('/register', isUnLogged_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, userName } = req.body;
    try {
        const user = yield (0, user_query_1.createUser)({ email, password, userName });
        if (user) {
            req.session.user = user;
            res.json(user);
            return;
        }
        res.status(400).json({ message: 'Bad request' });
    }
    catch (e) {
        res.status(500).json({ message: 'Internal server error' });
    }
}));
router.post('/login', isUnLogged_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = req.body;
    try {
        const user = yield (0, user_query_1.getUserByUsername)(userName);
        if (user) {
            const validPassword = yield bcrypt_1.default.compare(password, user.password);
            if (validPassword) {
                req.session.user = user;
                res.json(user);
                return;
            }
            res.status(403).json({ message: 'Invalid password' });
            return;
        }
        res.status(404).json({ message: 'Not found' });
    }
    catch (e) {
        res.status(500).json({ message: 'Internal server error' });
    }
}));
router.get('/logout', isAuth_1.default, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).json({ message: 'Internal server error' });
        }
        res.clearCookie('auth');
        res.json({ message: 'Logged out' });
    });
});
exports.default = router;
