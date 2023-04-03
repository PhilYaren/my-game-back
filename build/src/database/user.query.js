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
exports.getUserByUsername = exports.createUser = exports.getUser = void 0;
const index_1 = __importDefault(require("./index"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return index_1.default.user.findFirst({
        where: {
            id: parseInt(id),
        },
        select: {
            id: true,
            userName: true,
            email: true,
            statistics: {
                select: {
                    id: true,
                    score: true,
                },
            },
        },
    });
});
exports.getUser = getUser;
const createUser = ({ email, userName, password, }) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    return index_1.default.user.create({
        data: {
            email: email,
            userName: userName,
            password: hashedPassword,
        },
    });
});
exports.createUser = createUser;
const getUserByUsername = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    return index_1.default.user.findFirst({
        where: {
            userName: userName,
        },
    });
});
exports.getUserByUsername = getUserByUsername;
