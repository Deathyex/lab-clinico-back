const nodemailer = require("nodemailer");
const { config } = require('./api/config/config');

async function sendMail(to, subject, text, html) {
  // Crear un objeto de transporte reusable usando SMTP
  let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false, // true para puerto 465, false para otros puertos
    auth: {
      user: config.emailUser,
      pass: config.emailPass,
    },
  });

  // Enviar correo con el objeto de transporte definido
  let info = await transporter.sendMail({
    from: '"Laboratorio Clínico" <aplicativolabclinico@outlook.com>', // Dirección del remitente
    to: to, // Lista de destinatarios
    subject: subject, // Línea de asunto
    text: text, // Cuerpo del correo en texto plano
    html: html, // Cuerpo del correo en HTML
  });

  console.log("Message sent: %s", info.messageId);
}

// Ejemplo de uso
sendMail('santiagoari0209@gmail.com', 'Primer Correo', 'Primer Correo Lab', '<p>Examen de sangre</p>');
