const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;
const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/RecipeMaster';

module.exports = {
  env,
  port,
  mongodbUri
};
