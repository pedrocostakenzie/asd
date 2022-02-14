import nodemailer from "nodemailer";
import path from "path";
import hbs, {
  NodemailerExpressHandlebarsOptions,
} from "nodemailer-express-handlebars";

export const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "pedrogks1@gmail.com",
    pass: "crvgpedro1",
  },
});

const handlebarOption: NodemailerExpressHandlebarsOptions = {
  viewEngine: {
    partialsDir: path.resolve(__dirname, "..", "templates"),
    defaultLayout: undefined,
  },
  viewPath: path.resolve(__dirname, "..", "templates"),
};

transport.use("compile", hbs(handlebarOption));

export const mailTemplateOptions = (
  to: string[] | any,
  subject: string,
  template: string,
  context: any
) => {
  return {
    from: "pedrogks1@gmail.com",
    to,
    subject,
    template,
    context,
  };
};

export const simpleMailOptions = (from?: string, to?: string[]|any, subject?: string, context?: any) => {
  return {
      from,
      to,
      subject,
      template: "email",
      context
  };
};

