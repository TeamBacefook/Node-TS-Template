import joi from "joi";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../.env") });

const env = joi
  .object()
  .keys({
    NODE_ENV: joi.string().valid("production", "development").required(),
    PORT: joi.number().required(),
    JWT_SECRET: joi.string().required(),
    MONGO_URI: joi.string().required(),
  })
  .unknown();

const { value, error } = env.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
const vars = {
  env: value.NODE_ENV,
  port: value.PORT,
  jwt: {
    secret: value.JWT_SECRET,
  },
  mongo: {
    uri: value.MONGO_URI,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};

export default vars;
