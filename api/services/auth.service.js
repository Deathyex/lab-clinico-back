const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Importa la configuración desde el archivo correspondiente
const { config } = require('../config/config');

// Importa el servicio de usuario
const UserService  = require('./user.service');
const service = new UserService();

class AuthService {
  // Método para obtener un usuario por email y contraseña
  async getUser(email, password) {
    const user = await service.findByEmail(email);

    // Si el usuario no existe, lanza un error de no autorizado
    if (!user) {
      throw boom.unauthorized();
    }

    // Compara la contraseña proporcionada con la almacenada en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);

    // Si no hay coincidencia, lanza un error de no autorizado
    if (!isMatch) {
      throw boom.unauthorized();
    }

    // Elimina la contraseña del objeto de usuario antes de devolverlo
    delete user.dataValues.password;
    return user;
  }

  // Método para firmar un token JWT
  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    }

    const token = jwt.sign(payload, config.jwtsecret);

    return {
      user,
      token
    };
  }

  // Método para enviar un correo de recuperación de contraseña
  async sendResetPassword(email) {
    const user = await service.findByEmail(email);

    // Si el usuario no existe, lanza un error de no autorizado
    if (!user) {
      throw boom.unauthorized();
    }

    // Genera un token de recuperación de contraseña que caduca en 15 minutos
    const payload = {
      sub: user.id
    };
    const token = jwt.sign(payload, config.jwtsecret, {expiresIn: '15min'});
    const link = `http://myfrontend.com/recuperar?token=${token}`;

    // Actualiza el campo de recuperación de token en la base de datos
    await service.update(user.id, {recoveryToken: token});
    const mail = {
      from: 'fabiolabclinico@gmail.com', // sender address
      to: `${user.email}`, // list of receivers
      subject: "Lab clinico - Recuperacion de contraseña", // Subject line
      text: "Has solicitado recuperacion de contraseña, por medio de este correo podras guardar una nueva clave de acceso.", // plain text body
      html: `<style type="text/css">
      @media only screen and (min-width: 620px) {
  .u-row {
    width: 600px !important;
  }
  .u-row .u-col {
    vertical-align: top;
  }

  .u-row .u-col-100 {
    width: 600px !important;
  }

}

@media (max-width: 620px) {
  .u-row-container {
    max-width: 100% !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .u-row .u-col {
    min-width: 320px !important;
    max-width: 100% !important;
    display: block !important;
  }
  .u-row {
    width: 100% !important;
  }
  .u-col {
    width: 100% !important;
  }
  .u-col > div {
    margin: 0 auto;
  }
}
body {
  margin: 0;
  padding: 0;
}

table,
tr,
td {
  vertical-align: top;
  border-collapse: collapse;
}

p {
  margin: 0;
}

.ie-container table,
.mso-container table {
  table-layout: fixed;
}

* {
  line-height: inherit;
}

a[x-apple-data-detectors='true'] {
  color: inherit !important;
  text-decoration: none !important;
}

table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_content_text_1 .v-container-padding-padding { padding: 5px 20px 0px !important; } #u_content_image_1 .v-src-width { width: auto !important; } #u_content_image_1 .v-src-max-width { max-width: 85% !important; } #u_content_heading_14 .v-container-padding-padding { padding: 10px 20px !important; } #u_content_heading_11 .v-container-padding-padding { padding: 10px 20px 0px !important; } #u_content_heading_12 .v-container-padding-padding { padding: 10px 20px !important; } #u_content_heading_17 .v-container-padding-padding { padding: 10px 20px 0px !important; } #u_content_heading_18 .v-container-padding-padding { padding: 10px 20px !important; } #u_content_heading_16 .v-container-padding-padding { padding: 10px 20px !important; } #u_content_heading_8 .v-container-padding-padding { padding: 10px 20px 0px !important; } #u_content_heading_9 .v-container-padding-padding { padding: 10px 20px !important; } #u_column_6 .v-col-background-color { background-color: #ffffff !important; } }
    </style>



<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->


<div class="u-row-container" style="padding: 0px;background-color: #C2EFFF">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #f6e3d2;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->

<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-background-color" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div class="v-col-background-color" style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->

<table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:50px 10px 0px;font-family:'Montserrat',sans-serif;" align="left">

  <h1 style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-family: 'Montserrat',sans-serif; font-size: 22px; ">Lab Clinico UIS</h1>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:'Montserrat',sans-serif;" align="left">

  <h1 style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-family: 'Montserrat',sans-serif; font-size: 36px; "><strong>Recuperacion de contraseña</strong></h1>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_text_1" style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:5px 40px 0px;font-family:'Montserrat',sans-serif;" align="left">

  <div style="line-height: 160%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 160%;">Hola ${user.name}, le hemos enviado este correo electrónico en respuesta a su solicitud de restablecer su contraseña en la aplicación de laboratorio clínico. Para restablecer su contraseña, por favor siga el siguiente enlace:</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;" align="left">

  <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
<div align="center">
  <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:37px; v-text-anchor:middle; width:194px;" arcsize="11%"  stroke="f" fillcolor="#3AAEE0"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Montserrat',sans-serif;"><![endif]-->
    <a href="${link}" target="${link}" class="v-button" style="box-sizing: border-box;display: inline-block;font-family:'Montserrat',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #3AAEE0; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
      <span style="display:block;padding:10px 20px;line-height:120%;"><span style="line-height: 16.8px;">Recuperar contraseña</span></span>
    </a>
  <!--[if mso]></center></v:roundrect><![endif]-->
</div>

      </td>
    </tr>
  </tbody>
</table> `, // html body
    }
    const rta = await this.sendMail(mail);
    return rta;
  }

  // Método para cambiar la contraseña
  async changePassword(token, newPassword) {
    try {
      // Verifica el token
      const payload = jwt.verify(token, config.jwtsecret);

      // Encuentra al usuario asociado al token
      const user = await service.findOne(payload.sub);

      // Si el token de recuperación no coincide, lanza un error de no autorizado
      if (user.recoveryToken !== token ) {
        throw boom.unauthorized();
      }

      // Encripta la nueva contraseña y actualiza en la base de datos
      const hash = await bcrypt.hash(newPassword, 777);
      await service.update(user.id, {recoveryToken: null, password: hash});

      return { message: "contraseña actualizada"};
    } catch (error) {
        throw boom.unauthorized();
    }
  }

  // Método para enviar un correo de notificación de nuevo resultado
  async sendNewResultado(userId) {
    console.log(userId)
    const user = await service.findOne(userId);

    // Si el usuario no existe, lanza un error de no autorizado
    if (!user) {
      throw boom.unauthorized();
    }
    const link =" http://myfrontend.com/recuperar";
    console.log(user.email)
    const mail = {
      from: 'fabiolabclinico@gmail.com', // sender address
      to: `${user.email}`, // list of receivers
      subject: "Lab clinico - Nuevo resultado disponible", // Subject line
      text: "Ya se encuentra disponible un nuevo resultado en Lab clinico, si desea visualizarlo puede entrar a la aplicacion.", // plain text body
      html: `<style type="text/css">
      @media only screen and (min-width: 620px) {
  .u-row {
    width: 600px !important;
  }
  .u-row .u-col {
    vertical-align: top;
  }

  .u-row .u-col-100 {
    width: 600px !important;
  }

}

@media (max-width: 620px) {
  .u-row-container {
    max-width: 100% !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .u-row .u-col {
    min-width: 320px !important;
    max-width: 100% !important;
    display: block !important;
  }
  .u-row {
    width: 100% !important;
  }
  .u-col {
    width: 100% !important;
  }
  .u-col > div {
    margin: 0 auto;
  }
}
body {
  margin: 0;
  padding: 0;
}

table,
tr,
td {
  vertical-align: top;
  border-collapse: collapse;
}

p {
  margin: 0;
}

.ie-container table,
.mso-container table {
  table-layout: fixed;
}

* {
  line-height: inherit;
}

a[x-apple-data-detectors='true'] {
  color: inherit !important;
  text-decoration: none !important;
}

table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_content_text_1 .v-container-padding-padding { padding: 5px 20px 0px !important; } #u_content_image_1 .v-src-width { width: auto !important; } #u_content_image_1 .v-src-max-width { max-width: 85% !important; } #u_content_heading_14 .v-container-padding-padding { padding: 10px 20px !important; } #u_content_heading_11 .v-container-padding-padding { padding: 10px 20px 0px !important; } #u_content_heading_12 .v-container-padding-padding { padding: 10px 20px !important; } #u_content_heading_17 .v-container-padding-padding { padding: 10px 20px 0px !important; } #u_content_heading_18 .v-container-padding-padding { padding: 10px 20px !important; } #u_content_heading_16 .v-container-padding-padding { padding: 10px 20px !important; } #u_content_heading_8 .v-container-padding-padding { padding: 10px 20px 0px !important; } #u_content_heading_9 .v-container-padding-padding { padding: 10px 20px !important; } #u_column_6 .v-col-background-color { background-color: #ffffff !important; } }
    </style>



<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->


<div class="u-row-container" style="padding: 0px;background-color: #C2EFFF">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #f6e3d2;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->

<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-background-color" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div class="v-col-background-color" style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->

<table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:50px 10px 0px;font-family:'Montserrat',sans-serif;" align="left">

  <h1 style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-family: 'Montserrat',sans-serif; font-size: 22px; ">Lab Clinico UIS</h1>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:'Montserrat',sans-serif;" align="left">

  <h1 style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-family: 'Montserrat',sans-serif; font-size: 36px; "><strong>Nuevo examen disponible</strong></h1>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_text_1" style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:5px 40px 0px;font-family:'Montserrat',sans-serif;" align="left">

  <div style="line-height: 160%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 160%;">Hola ${user.name}, ya se encuentra disponible el resultado de un examen que usted se realizo en Lab Clinico, si desea ver el resultado, por favor siga el siguiente enlace:</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;" align="left">

  <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
<div align="center">
  <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:37px; v-text-anchor:middle; width:194px;" arcsize="11%"  stroke="f" fillcolor="#3AAEE0"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Montserrat',sans-serif;"><![endif]-->
    <a href="${link}" target="${link}" class="v-button" style="box-sizing: border-box;display: inline-block;font-family:'Montserrat',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #3AAEE0; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
      <span style="display:block;padding:10px 20px;line-height:120%;"><span style="line-height: 16.8px;">Ver examen</span></span>
    </a>
  <!--[if mso]></center></v:roundrect><![endif]-->
</div>

      </td>
    </tr>
  </tbody>
</table> `, // html body
    }
    console.log(userId)
    const rta = await this.sendMail(mail);
    return rta;
  }

  // Método para enviar un correo electrónico usando nodemailer
  async sendMail(infomail) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
          user: 'fabiolabclinico@gmail.com',
          pass: 'lsxwsvadpfjxqjdy'
      }
    });


    // Envía el correo electrónico
    await transporter.sendMail(infomail);
    return { message: 'Correo enviado' };
  }
}

// Exporta la clase AuthService
module.exports = AuthService;
