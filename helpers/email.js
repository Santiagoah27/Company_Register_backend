import nodemailer from "nodemailer"

export const registerEmail = async (data) => {
    const { email, name, token } = data

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      // Email information

      const infoEmail = await transport.sendMail({
        from: '"Company Register - Administrador de empresas" <empresas@companyregister.com>',
        to: email,
        subject: "Company Register - Valida tu cuenta",
        text: "Valida tu cuenta en Company Register",
        html: `<p> Hola: ${name} Valida tu cuenta en Company Register</p>
        <p> Tu cuenta ya esta casi lista, solo debes confirmarla en el siguiente enlace:
        
        <a href="${process.env.FRONTEND_URL}/confirm/${token}"> Validar Cuenta </a>

        <p> Si tu no creaste esta cuenta, puedes ignorar el mensaje </p>
        `
      })

}

export const recoverPasswordEmail = async (data) => {
  const { email, name, token } = data

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

    // Email information

    const infoEmail = await transport.sendMail({
      from: '"Company Register - Administrador de empresas" <empresas@companyregister.com>',
      to: email,
      subject: "Company Register - Restablece tu password",
      text: "Restablce tu Password",
      html: `<p> Hola: ${name} has solicitado reestablecer tu password</p>
      <p> Sigue el siguiente enlace para generar un nuevo password:
      
      <a href="${process.env.FRONTEND_URL}/forgot-password/${token}"> Reestablecer Password </a>

      <p> Si tu no solicitaste este email, puedes ignorar el mensaje </p>
      `
    })

}