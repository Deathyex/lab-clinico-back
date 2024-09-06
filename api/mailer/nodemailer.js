const nodemailer = require('nodemailer');
const { config } = require('../config/config');
const { mailContent } = require('./emailTemplates');

// Crear un objeto de transporte reusable usando SMTP
let transporter = nodemailer.createTransport({
	host: 'smtp.office365.com',
	port: 587,
	secure: false, // true para puerto 465, false para otros puertos
	auth: {
		user: config.emailUser,
		pass: config.emailPass
	}
});

async function sendMail(user, type, recoveryURL) {
	try {
		recoveryURL = recoveryURL || '';
		const { subject, text, html } = mailContent(type, user.name, recoveryURL);

		// Enviar correo con el objeto de transporte definido
		let info = await transporter.sendMail({
			from: '"Laboratorio Clínico" <aplicativolabclinico@outlook.com>', // Dirección del remitente
			to: user.email, // Lista de destinatarios
			subject: subject, // Línea de asunto
			text: text, // Cuerpo del correo en texto plano
			html: html // Cuerpo del correo en HTML
		});

		console.log('Message sent: %s', info.messageId);
		return { status: 'ok', message: 'Correo enviado correctamente' };
	} catch (err) {
		return { status: 'error', message: `Error al enviar el correo: ${err}` };
	}
}

// Ejemplo de uso
/* sendMail(
	{ name: 'Santiago', email: 'santiagoari0209@gmail.com' },
	'Prueba html',
	'Correo Lab',
	'newAccount'
); */

module.exports = sendMail;
