"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleMailOptions = exports.mailTemplateOptions = exports.transport = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
exports.transport = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "pedrogks1@gmail.com",
        pass: "crvgpedro1",
    },
});
const handlebarOption = {
    viewEngine: {
        partialsDir: path_1.default.resolve(__dirname, "..", "templates"),
        defaultLayout: undefined,
    },
    viewPath: path_1.default.resolve(__dirname, "..", "templates"),
};
exports.transport.use("compile", (0, nodemailer_express_handlebars_1.default)(handlebarOption));
const mailTemplateOptions = (to, subject, template, context) => {
    return {
        from: "pedrogks1@gmail.com",
        to,
        subject,
        template,
        context,
    };
};
exports.mailTemplateOptions = mailTemplateOptions;
const simpleMailOptions = (from, to, subject, context) => {
    return {
        from,
        to,
        subject,
        template: "email",
        context
    };
};
exports.simpleMailOptions = simpleMailOptions;
