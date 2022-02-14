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
exports.listAllBuys = exports.findOneBuy = exports.buy = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
const custom_error_1 = __importDefault(require("../errors/custom.error"));
const buy = (owner) => __awaiter(void 0, void 0, void 0, function* () {
    const cartRepository = (0, typeorm_1.getRepository)(entities_1.Cart);
    const userRepository = (0, typeorm_1.getRepository)(entities_1.User);
    const user = yield userRepository.findOne(owner);
    const carts = yield cartRepository.find({
        where: { owner: user === null || user === void 0 ? void 0 : user.id }
    });
    const cart = carts.find(item => !item.paid);
    const paid = yield cartRepository.save(Object.assign(Object.assign({}, cart), { paid: true }));
    const newCart = cartRepository.create({
        owner: user
    });
    yield cartRepository.save(newCart);
    return paid;
});
exports.buy = buy;
const findOneBuy = (cartId) => __awaiter(void 0, void 0, void 0, function* () {
    const cartRepository = (0, typeorm_1.getRepository)(entities_1.Cart);
    const buy = yield cartRepository.findOne(cartId);
    if (!(buy === null || buy === void 0 ? void 0 : buy.paid)) {
        throw new custom_error_1.default("this cart has not been paid", 409);
    }
    return buy;
});
exports.findOneBuy = findOneBuy;
const listAllBuys = () => __awaiter(void 0, void 0, void 0, function* () {
    const cartRepository = (0, typeorm_1.getRepository)(entities_1.Cart);
    const buys = yield cartRepository.find({
        where: { paid: true }
    });
    return buys;
});
exports.listAllBuys = listAllBuys;
