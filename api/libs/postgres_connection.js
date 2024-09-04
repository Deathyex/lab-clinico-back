const { Client } = require('pg');

async function getConnection() {
	const client = new Client({
		host: 'localhost',
		port: 5432,
		user: 'fabi',
		password: 'admin123',
		database: 'my_lab'
	});
	await client.connect();
	return client;
}

module.exports = getConnection;
