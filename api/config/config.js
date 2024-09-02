require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3777,
  dbUser:  process.env.DB_USER,
  dbPassword:  process.env.DB_PASSWORD,
  dbHost:  process.env.DB_HOST,
  dbName:  process.env.DB_NAME,
  dbPort:  process.env.DB_PORT,
  apiKey:  process.env.API_KEY,
  jwtsecret:  process.env.JWT_SECRET,
  aws_name: process.env.AWS_BUCKET_NAME,
  aws_region: process.env.AWS_BUCKET_REGION,
  aws_key: process.env.AWS_PUBLIC_KEY,
  aws_secret: process.env.AWS_SECRET_KEY="YG+VX9j2j4Y6a9wiwvy+9t93MuSoaozKG/sGf246",
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS
}

module.exports =  { config };
