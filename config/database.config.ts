export const databaseConfig = {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/nestjs-books',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };