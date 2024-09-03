function resultadoDisponible(name){
    return `<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #0077be;
            color: white;
            text-align: center;
            padding: 20px;
        }
        .content {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 0.8em;
            color: #666;
        }
        .button {
            display: inline-block;
            background-color: #0077be;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Notificación de Resultados</h1>
    </div>
    <div class="content">
        <p>Estimado/a ${name},</p>
        <p>Nos complace informarle que sus resultados médicos ya están disponibles para su revisión.</p>
        <p>Para acceder a sus resultados, por favor siga estos pasos:</p>
        <ol>
            <li>Inicie sesión en su cuenta del portal de pacientes</li>
            <li>Vaya a la sección "Mis Resultados"</li>
            <li>Seleccione la fecha de su última visita</li>
        </ol>
        <p>Si tiene alguna pregunta sobre sus resultados, no dude en contactar a su médico o a nuestro equipo de atención al paciente.</p>
        <a href="#" class="button">Acceder al Portal de Pacientes</a>
    </div>
    <div class="footer">
        <p>Este es un mensaje automático, por favor no responda a este correo.</p>
        <p>© 2023 Clínica Médica. Todos los derechos reservados.</p>
    </div>
</body>`
}

function nuevaCuenta(name){
    return `<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #0077be;
            color: white;
            text-align: center;
            padding: 20px;
        }
        .content {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 0.8em;
            color: #666;
        }
        .button {
            display: inline-block;
            background-color: #0077be;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Nueva cuenta creada</h1>
    </div>
    <div class="content">
        <p>Estimado/a ${name},</p>
        <p>Bienvenido a Lab. Clinico, nos complace informarle que su su cuenta ha sido registrada correctamente. Para ingresar a la plataforma puede usar el siguiente enlace:</p>
        <a href="#" class="button">Acceder al Portal de Pacientes</a>
    </div>
    <div class="footer">
        <p>Este es un mensaje automático, por favor no responda a este correo.</p>
        <p>© 2023 Clínica Médica. Todos los derechos reservados.</p>
    </div>
</body>`
}

function recuperarPassword(name){
    return `<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #0077be;
            color: white;
            text-align: center;
            padding: 20px;
        }
        .content {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 0.8em;
            color: #666;
        }
        .button {
            display: inline-block;
            background-color: #0077be;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Notificación de Resultados</h1>
    </div>
    <div class="content">
        <p>Estimado/a ${name},</p>
        <p>Para reestablecer su contraseña haga click en el siguiente enlace.</p>
        <a href="#" class="button">Acceder al Portal de Pacientes</a>
    </div>
    <div class="footer">
        <p>Este es un mensaje automático, por favor no responda a este correo.</p>
        <p>© 2023 Clínica Médica. Todos los derechos reservados.</p>
    </div>
</body>`
}

function htmlContent(type, name){
    let html = ''

    if(type=='newResult'){
        html = resultadoDisponible(name) 
      } 
      else if(type==='newAccount'){
        html = nuevaCuenta(name)
      }
      else if(type=='recovery'){
        html = recuperarPassword(name)
      }
      else{
        html = '<p>ERROR</P>'
      }

      return html
}

module.exports={htmlContent}