import serverless from "serverless-http";
import app from "../Backend/src/app.js";

export default serverless(app);
