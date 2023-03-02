const nodemailer =  require('nodemailer')


 const emailRegistration = async (datos) => {

    
    const { email, name, token } = datos;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT ,
        auth: {
            user:process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    //informacion del email

    const info = await transport.sendMail({
        from: '"Emprendar" <cuentas@emprendar.com> ',
        to: email,
        subject: "Emprendar - Confirma tu cuenta",
        text: "confirma tu cuenta en Emprendar",
        html: ` <p> Hola ${name} Comprueba tu cuenta en emprendar </p>
                <p> Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace: <p/>
                <a href="${process.env.FRONTEND_URL}/confirmar/${token}"> Comprobar Cuenta </a>
                <p> Si tu no creaste esta cuenta, puedes ignorar el mensaje </p>
        `
    })

}


module.exports = {
    emailRegistration
}