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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductInCart = exports.listAllCarts = exports.findOneCart = exports.addProduct = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
const addProduct = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const cartRepository = (0, typeorm_1.getRepository)(entities_1.Cart);
    const cartProductRepository = (0, typeorm_1.getRepository)(entities_1.CartProduct);
    const productRepository = (0, typeorm_1.getRepository)(entities_1.Product);
    let cartProduct;
    const product = yield productRepository.findOne(data.productId);
    const cart = yield cartRepository.findOneOrFail({
        where: { id: data.cartId },
    });
    const findCartProduct = cart.products.find((item) => item.productId === (product === null || product === void 0 ? void 0 : product.id));
    let newTotal = Number(cart === null || cart === void 0 ? void 0 : cart.total);
    if (findCartProduct) {
        const cp = yield cartProductRepository.findOneOrFail({
            where: { productId: product === null || product === void 0 ? void 0 : product.id },
        });
        const data = Object.assign({}, cp);
        data.quantity = data.quantity + 1;
        yield cartProductRepository.save(Object.assign({}, data));
        cartProduct = data;
        newTotal += Number(product === null || product === void 0 ? void 0 : product.price);
    }
    else {
        const cp = cartProductRepository.create({
            quantity: 1,
            productId: product === null || product === void 0 ? void 0 : product.id,
            cartId: cart.id
        });
        yield cartProductRepository.save(cp);
        cartProduct = cp;
        newTotal += Number(product === null || product === void 0 ? void 0 : product.price);
    }
    const serialize = {
        id: cart === null || cart === void 0 ? void 0 : cart.id,
        total: Number(newTotal.toFixed(2)),
        paid: cart === null || cart === void 0 ? void 0 : cart.paid,
        products: [...cart === null || cart === void 0 ? void 0 : cart.products, cartProduct],
    };
    yield cartRepository.save(Object.assign({}, serialize));
    return {
        cartId: cart.id,
        total: serialize.total,
        newProduct: cartProduct,
    };
});
exports.addProduct = addProduct;
const findOneCart = (cartId) => __awaiter(void 0, void 0, void 0, function* () {
    const cartRepository = (0, typeorm_1.getRepository)(entities_1.Cart);
    const cart = yield cartRepository.findOne(cartId);
    return cart;
});
exports.findOneCart = findOneCart;
const listAllCarts = () => __awaiter(void 0, void 0, void 0, function* () {
    const cartRepository = (0, typeorm_1.getRepository)(entities_1.Cart);
    const cart = yield cartRepository.find();
    return cart;
});
exports.listAllCarts = listAllCarts;
const deleteProductInCart = (productId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const cartProductRepository = (0, typeorm_1.getRepository)(entities_1.CartProduct);
    const cartRepository = (0, typeorm_1.getRepository)(entities_1.Cart);
    const cart = yield cartRepository.find({
        where: { owner: userId, paid: false }
    });
    const cartProduct = cart[0].products.find((item) => item.product.id === productId);
    if (cartProduct instanceof entities_1.CartProduct) {
        yield cartProductRepository.delete(cartProduct.id);
    }
    return "Product deleted";
});
exports.deleteProductInCart = deleteProductInCart;
