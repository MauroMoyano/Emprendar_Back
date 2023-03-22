const nodemailer = require("nodemailer");

const emailRegistration = async (datos) => {
  const { email, name, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  //informacion del email

  const info = await transport.sendMail({
    from: '"Emprendar" <cuentas@emprendar.com> ',
    to: email,
    subject: "Emprendar - Confirma tu cuenta",
    text: "Confirma tu cuenta en Emprendar",
    html: ` 
        <table style="width: 720px; margin: 0 auto;">
                    
                    <tr style="display: flex; width: 720px; justify-content: center;">
                        <hr />
                        <img src="https://res.cloudinary.com/nachito02/image/upload/v1678480886/m3xfx5kv4buvgvnxdqlw.png" alt="LogoEmprendar" width="720px" />
                    </tr>
                    <tr style="width: 720px; text-align: center;">
                        <h3>Confirma tu cuenta en Emprendar</h3>
                    </tr>
                    <tr style="width: 720px; text-align: center;">
                    <p> Hola ${name} Comprueba tu cuenta en emprendar </p>
                    </tr>
                    <tr style="width: 720px; text-align: center;">
                    <p> Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace: </p>
                    </tr>
                    <tr style="width: 720px; text-align: center;">
                    <a target='_blank' rel="noreferrer" href="${process.env.FRONTEND_URL}/confirmar/${token}">
                        <button style="background-color: #594A78; border:none; border-radius: 10px; width: fit-content; height:fit-content; padding: 10px; cursor:pointer; ">Confirmar Email</button>
                    </a>
                    </tr>
                    
                    <tr>
                        <hr />
                        <h6 >Si no fuiste tu, simplemente ignora este mensaje.</h6>
                    </tr>
        </table>
                
        `,
  });
};

const emailResetPassword = async (datos) => {
  const { email, name, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transport.sendMail({
    from: '"Emprendar" <cuentas@emprendar.com> ',
    to: email,
    subject: "Emprendar - Recupera tu cuenta",
    text: "Recupera  tu cuenta en Emprendar",
    html: ` 
        <table style="width: 720px; margin: 0 auto;">
                    
                    <tr style="display: flex; width: 720px; justify-content: center;">
                        <hr />
                        <img src="https://res.cloudinary.com/nachito02/image/upload/v1678480886/m3xfx5kv4buvgvnxdqlw.png" alt="LogoEmprendar" width="720px" />
                    </tr>
                    <tr style="width: 720px; text-align: center;">
                        <h3>Recupera tu contraseña en Emprendar</h3>
                    </tr>
                    <tr style="width: 720px; text-align: center;">
                    <p> Hola ${name} solicistaste un cambio de contraseña </p>
                    </tr>
                    <tr style="width: 720px; text-align: center;">
                    <p> Sigue el siguiente enlace para continuar con el cambio de contraseña: </p>
                    </tr>
                    <tr style="width: 720px; text-align: center;">
                    <a href="${process.env.FRONTEND_URL}/newPassword/${token}">
                        <button style="background-color: #594A78; border:none; border-radius: 10px; width: fit-content; height:fit-content; padding: 10px; cursor:pointer; ">Recuperar contraseña</button>
                    </a>
                    </tr>
                    
                    <tr>
                        <hr />
                        <h6 >Si no fuiste tu, simplemente ignora este mensaje.</h6>
                    </tr>
        </table>
                
        `,
  });
};

const contactUsSendMessage = async (datos) => {
  const { name, message, email } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transport.sendMail({
    from: "emprendar2023@gmail.com",
    to: "emprendar2023@gmail.com",
    subject: "Emprendar - Un usuario ha mandado un mensaje",
    text: "Mnesaje de: " + name,
    html: ` 
        <table style="width: 720px; margin: 0 auto;">
                    
                    <tr style="display: flex; width: 720px; justify-content: center;">
                        <hr />
                        <img src="https://res.cloudinary.com/nachito02/image/upload/v1678480886/m3xfx5kv4buvgvnxdqlw.png" alt="LogoEmprendar" width="720px" />
                    </tr>
                    <tr style="width: 720px; text-align: center;">
                        <h3>Tenemos un mensaje de un usuario</h3>
                    </tr>
                    <tr style="width: 720px; text-align: center;">
                    <p> El usuario ${name} con el email de ${email} ha escrito </p>
                    <p> ${message} </p>
                    </tr>
        </table>
                
        `,
  });
};

const proyectCreateEmail = async (datos) => {
  const { name, email, title } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transport.sendMail({
    from: "emprendar2023@gmail.com",
    to: email,
    subject: "Tu proyecto esta en revision",
    text: "Informacion de proyecto",
    html: ` 
        <table style="width: 720px; margin: 0 auto;">
                    
                    <tr style="display: flex; width: 720px; justify-content: center;">
                        <hr />
                        <img src="https://res.cloudinary.com/nachito02/image/upload/v1678480886/m3xfx5kv4buvgvnxdqlw.png" alt="LogoEmprendar" width="720px" />
                    </tr>
                    <tr style="width: 720px; text-align: center;">
                        <h3>Tenemos un mensaje de un usuario</h3>
                    </tr>
                    <tr style="width: 720px; text-align: center;">
                    <p> Hola ${name} tu proyecto ${title} esta en revision te avisaremos cuando este listo para recibir donaciones </p>
                    
                    </tr>
        </table>
                
        `,
  });
};

const emailPostValidateSuccess = async (datos) => {
  const { name, email, title } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transport.sendMail({
    from: "emprendar2023@gmail.com",
    to: email,
    subject: "Tu proyecto ha sido verificado y aceptado",
    text: "Informacion de proyecto",
    html: ` 
        <table style="width: 720px; margin: 0 auto;">
                    
                    <tr style="display: flex; width: 720px; justify-content: center;">
                        <hr />
                        <img src="https://res.cloudinary.com/nachito02/image/upload/v1678480886/m3xfx5kv4buvgvnxdqlw.png" alt="LogoEmprendar" width="720px" />
                    </tr>
                    <tr style="width: 720px; text-align: center;">
                        <h3>Tenemos un mensaje de un usuario</h3>
                    </tr>
                    <tr style="width: 720px; text-align: center;">
                    <p> Hola ${name} tu proyecto ${title} Fue aceptado para poder recibir donaciones, muchos extitos! ❤ </p>
                    
                    </tr>
        </table>
                
        `,
  });
};

const emailPostValidateRejected = async (datos) => {
  const { name, email, title } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transport.sendMail({
    from: "emprendar2023@gmail.com",
    to: email,
    subject: "Tu proyecto ha sido verificado y rechazado",
    text: "Informacion de proyecto",
    html: ` 
        <table style="width: 720px; margin: 0 auto;">
                    
                    <tr style="display: flex; width: 720px; justify-content: center;">
                        <hr />
                        <img src="https://res.cloudinary.com/nachito02/image/upload/v1678480886/m3xfx5kv4buvgvnxdqlw.png" alt="LogoEmprendar" width="720px" />
                    </tr>
                    <tr style="width: 720px; text-align: center;">
                        <h3>Tenemos un mensaje de un usuario</h3>
                    </tr>
                    <tr style="width: 720px; text-align: center;">
                    <p> Hola ${name} tu proyecto ${title} Fue rechazado revisa bien que no tenga contenido explicito ni nada que viole las normas de Emprendar, luego de revisar puedes volver a intentarlo</p>
                    
                    </tr>
        </table>
                
        `,
  });
};

const emailUserValidateRejected = async (datos) => {
  const { name, email } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transport.sendMail({
    from: "emprendar2023@gmail.com",
    to: email,
    subject: "Tu cuenta ha sido baneada",
    text: "Información de cuenta",
    html: ` 
        <table style="width: 720px; margin: 0 auto;">
                    
                    <tr style="display: flex; width: 720px; justify-content: center;">
                        <hr />
                        <img src="https://res.cloudinary.com/nachito02/image/upload/v1678480886/m3xfx5kv4buvgvnxdqlw.png" alt="LogoEmprendar" width="720px" />
                    </tr>
                    <tr style="width: 720px; text-align: center;">
                        <h3>Hemos decidido banear tu cuenta porque no cumples con nuestra politica.</h3>
                    </tr>
                    <tr style="width: 720px; text-align: center;">
                    <p> Hola ${name} tu cuenta fue baneada lo sentimos, pero viola las normas de Emprendar.</p>
                    
                    </tr>
        </table>
                
        `,
  });
};

const emailUserValidateAcepted = async (datos) => {
  const { name, email } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transport.sendMail({
    from: "emprendar2023@gmail.com",
    to: email,
    subject: "Tu cuenta ha sido reactivada",
    text: "Información de cuenta",
    html: ` 
        <table style="width: 720px; margin: 0 auto;">
                    
                    <tr style="display: flex; width: 720px; justify-content: center;">
                        <hr />
                        <img src="https://res.cloudinary.com/nachito02/image/upload/v1678480886/m3xfx5kv4buvgvnxdqlw.png" alt="LogoEmprendar" width="720px" />
                    </tr>
                    <tr style="width: 720px; text-align: center;">
                        <h3>Hemos decidido reactivar tu cuenta esperamos seas responsable con su uso.</h3>
                    </tr>
                    <tr style="width: 720px; text-align: center;">
                    <p> Hola ${name} tu cuenta fue reactivada bienvenido nuevamente a Emprendar.</p>
                    </tr>
        </table>
                
        `,
  });
};
module.exports = {
  emailRegistration,
  emailResetPassword,
  contactUsSendMessage,
  proyectCreateEmail,
  emailPostValidateSuccess,
  emailPostValidateRejected,
  emailUserValidateRejected,
  emailUserValidateAcepted
};
