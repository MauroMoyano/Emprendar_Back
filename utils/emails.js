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
                    <a href="${process.env.FRONTEND_URL}/confirmar/${token}">
                        <button style="background-color: #594A78; border:none; border-radius: 10px; width: fit-content; height:fit-content; padding: 10px; cursor:pointer; ">Confirmar Email</button>
                    </a>
                    </tr>
                    
                    <tr>
                        <hr />
                        <h6 >Si no fuiste tu, simplemente ignora este mensaje.</h6>
                    </tr>
        </table>
                
        `
    })

}



const emailResetPassword =  async (datos) => {

    const {email, name, token} = datos

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT ,
        auth: {
            user:process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
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
                        <h3>Confirma tu cuenta en Emprendar</h3>
                    </tr>
                    <tr style="width: 720px; text-align: center;">
                    <p> Hola ${name} Comprueba tu cuenta en emprendar </p>
                    </tr>
                    <tr style="width: 720px; text-align: center;">
                    <p> Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace: </p>
                    </tr>
                    <tr style="width: 720px; text-align: center;">
                    <a href="${process.env.FRONTEND_URL}/newPassword/${token}">
                        <button style="background-color: #594A78; border:none; border-radius: 10px; width: fit-content; height:fit-content; padding: 10px; cursor:pointer; ">Confirmar Email</button>
                    </a>
                    </tr>
                    
                    <tr>
                        <hr />
                        <h6 >Si no fuiste tu, simplemente ignora este mensaje.</h6>
                    </tr>
        </table>
                
        `

    })

}


module.exports = {
    emailRegistration,
    emailResetPassword
}