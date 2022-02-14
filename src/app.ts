import "reflect-metadata";
import express from "express";
import { initializerRouter } from "./routes";
import { errorHandler } from "./middlewares/error.middleware";
import swaggerUiExpress from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

const app = express();
app.use(express.json());

 app.use(
   "/api-documentation",
   swaggerUiExpress.serve,
   swaggerUiExpress.setup(swaggerDocument)
 );
 

initializerRouter(app);

app.use(errorHandler)

export default app;
