"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const session_file_store_1 = __importDefault(require("session-file-store"));
const api_routes_1 = __importDefault(require("./routes/api.routes"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
const FileStore = (0, session_file_store_1.default)(express_session_1.default);
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
};
const sessionConFig = {
    name: 'auth',
    store: new FileStore(),
    resave: false,
    secret: process.env.SECRET || 'secret',
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
    },
};
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)(sessionConFig));
app.use((0, cors_1.default)(corsOptions));
app.use('/api', api_routes_1.default);
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});
