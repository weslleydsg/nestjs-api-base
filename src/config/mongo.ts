import { MongooseModuleOptions } from '@nestjs/mongoose';

interface MongoConfigs {
  uri: string;
  options?: MongooseModuleOptions;
}

const mongoAuth = process.env.MONGO_DB_USER
  ? `${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@`
  : '';

const mongoConfigs: MongoConfigs = {
  uri: `mongodb://${mongoAuth}${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`,
  options: {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
};

export default mongoConfigs;
