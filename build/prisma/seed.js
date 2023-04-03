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
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const password = yield bcrypt_1.default.hash('password', 10);
        const pavel = yield prisma.user.create({
            data: {
                email: 'popa@poteryana.net',
                userName: 'Pavel',
                password: password,
            },
        });
        const svyat = yield prisma.user.create({
            data: {
                email: 'zabral@ochko.da',
                userName: 'Svyat',
                password: password,
            },
        });
        const game = yield prisma.game.create({
            data: {
                name: 'Game 1',
                userId: pavel.id,
                categories: {
                    create: [
                        {
                            name: 'Category 1',
                            questions: {
                                create: [
                                    {
                                        text: 'Question 1',
                                        answer: 'Answer 1',
                                        score: 100,
                                    },
                                    {
                                        text: 'Question 2',
                                        answer: 'Answer 2',
                                        score: 200,
                                    },
                                    {
                                        text: 'Question 3',
                                        answer: 'Answer 3',
                                        score: 300,
                                    },
                                    {
                                        text: 'Question 4',
                                        answer: 'Answer 4',
                                        score: 400,
                                    },
                                    {
                                        text: 'Question 5',
                                        answer: 'Answer 5',
                                        score: 500,
                                    },
                                ],
                            },
                        },
                        {
                            name: 'Category 2',
                            questions: {
                                create: [
                                    {
                                        text: 'Question 1',
                                        answer: 'Answer 1',
                                        score: 100,
                                    },
                                    {
                                        text: 'Question 2',
                                        answer: 'Answer 2',
                                        score: 200,
                                    },
                                    {
                                        text: 'Question 3',
                                        answer: 'Answer 3',
                                        score: 300,
                                    },
                                    {
                                        text: 'Question 4',
                                        answer: 'Answer 4',
                                        score: 400,
                                    },
                                    {
                                        text: 'Question 5',
                                        answer: 'Answer 5',
                                        score: 500,
                                    },
                                ],
                            },
                        },
                        {
                            name: 'Category 3',
                            questions: {
                                create: [
                                    {
                                        text: 'Question 1',
                                        answer: 'Answer 1',
                                        score: 100,
                                    },
                                    {
                                        text: 'Question 2',
                                        answer: 'Answer 2',
                                        score: 200,
                                    },
                                    {
                                        text: 'Question 3',
                                        answer: 'Answer 3',
                                        score: 300,
                                    },
                                    {
                                        text: 'Question 4',
                                        answer: 'Answer 4',
                                        score: 400,
                                    },
                                ],
                            },
                        },
                    ],
                },
            },
        });
        const statistics = yield prisma.statistics.create({
            data: {
                userId: svyat.id,
                gameId: game.id,
                score: 1000,
            },
        });
        console.log({ pavel, svyat });
        console.log({ game });
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
