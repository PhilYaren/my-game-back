"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isAuth(req, res, next) {
    var _a;
    const user = (_a = req.session) === null || _a === void 0 ? void 0 : _a.user;
    console.log(user);
    if (user) {
        next();
        return;
    }
    res.status(401).json({ message: 'Unauthorized' });
}
exports.default = isAuth;
