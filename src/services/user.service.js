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
exports.changePassword = exports.generateRecoveryToken = exports.login = exports.listAllUsers = exports.findOneUser = exports.createUser = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
const custom_error_1 = __importDefault(require("../errors/custom.error"));
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = body;
        const userRepository = (0, typeorm_1.getRepository)(entities_1.User);
        const cartRepository = (0, typeorm_1.getRepository)(entities_1.Cart);
        if (!body.isAdm) {
            body.isAdm = false;
        }
        const user = userRepository.create({
            email,
            password,
            name,
            isAdm: body.isAdm,
        });
        yield userRepository.save(user);
        const cart = cartRepository.create({
            owner: user
        });
        yield cartRepository.save(cart);
        return {
            email: user.email,
            name: user.name,
            id: user.id,
            isAdm: user.isAdm,
            cart: [cart.id]
        };
    }
    catch (error) {
        throw new custom_error_1.default(error.message, 400);
    }
});
exports.createUser = createUser;
const findOneUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getRepository)(entities_1.User);
    const cartRepository = (0, typeorm_1.getRepository)(entities_1.Cart);
    const user = yield userRepository.findOne(userId);
    const carts = yield cartRepository.find({
        where: { owner: user === null || user === void 0 ? void 0 : user.id }
    });
    const cartOpen = carts.filter(item => !item.paid).map(item => item.id)[0];
    const cartsClosed = carts.filter(item => item.paid).map(item => item.id);
    return Object.assign(Object.assign({}, user), { cartOpen, cartsClosed });
});
exports.findOneUser = findOneUser;
const listAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getRepository)(entities_1.User);
    const users = yield userRepository.find();
    return users;
});
exports.listAllUsers = listAllUsers;
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.default);
    const user = yield userRepository.findByEmail(email);
    if (!user || !bcrypt_1.default.compareSync(password, user.password)) {
        throw new custom_error_1.default("Wrong email/password", 401);
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.SECRET, { expiresIn: "1d" });
    return token;
});
exports.login = login;
const generateRecoveryToken = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.default);
    const user = yield userRepository.findByEmail(email);
    if (!user) {
        throw new custom_error_1.default("User not found", 404);
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.SECRET, { expiresIn: 300 });
    return token;
});
exports.generateRecoveryToken = generateRecoveryToken;
const changePassword = (email, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.default);
    const user = yield userRepository.findByEmail(email);
    if (!user) {
        throw new custom_error_1.default("User not found", 404);
    }
    newPassword = bcrypt_1.default.hashSync(newPassword, 10);
    yield userRepository.save(Object.assign(Object.assign({}, user), { password: newPassword }));
    return { "message": "your password has been changed" };
});
exports.changePassword = changePassword;
