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
exports.listAllProducts = exports.findOneProudct = exports.createProduct = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
const custom_error_1 = __importDefault(require("../errors/custom.error"));
const createProduct = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price } = body;
        const productRepository = (0, typeorm_1.getRepository)(entities_1.Product);
        const product = productRepository.create({
            name,
            description,
            price,
        });
        yield productRepository.save(product);
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
        };
    }
    catch (error) {
        throw new custom_error_1.default(error.message, 400);
    }
});
exports.createProduct = createProduct;
const findOneProudct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const productRepository = (0, typeorm_1.getRepository)(entities_1.Product);
    const product = yield productRepository.findOne(productId);
    return product;
});
exports.findOneProudct = findOneProudct;
const listAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const productRepository = (0, typeorm_1.getRepository)(entities_1.Product);
    const product = yield productRepository.find();
    return product;
});
exports.listAllProducts = listAllProducts;
