require('dotenv').config() // needs .env file

module.exports = {
  port: process.env.PORT,
  app: process.env.APP,
  env: process.env.NODE_ENV,
  secret: process.env.APP_SECRET,
  mongo: {
    uri: process.env.MONGOURI
  },
  sql: {
    connectionLimit: process.env.SQL_CONNECTIONS_LIMIT,
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    port: process.env.SQL_DATABASE_PORT
  },
  awsaccess: {
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    accessKeyId: process.env.ACCESS_KEY_ID,
    region: process.env.REGION
  },
  bucket: process.env.BUCKET
}
