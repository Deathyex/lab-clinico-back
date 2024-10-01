require('dotenv').config();

const config = {
	env: process.env.NODE_ENV || 'dev',
	port: process.env.PORT || 3777,
	dbUser: process.env.DB_USER,
	dbPassword: process.env.DB_PASSWORD,
	dbHost: process.env.DB_HOST,
	dbName: process.env.DB_NAME,
	dbPort: process.env.DB_PORT,
	apiKey: process.env.API_KEY,
	jwtsecret: process.env.JWT_SECRET,
	emailUser: process.env.EMAIL_USER,
	emailPass: process.env.EMAIL_PASS,
	connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING
};

module.exports = { config };
