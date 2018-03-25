export default {
  port: 8000,
  host: 'localhost',
  db: process.env.MONGO_URL || 'mongodb://localhost:27017/amwest-db',
  tokenKey: 'secretKey'
}
