import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { fromEnv } from "@aws-sdk/credential-provider-env";

const sesClient = new SESClient({
  region: "sa-east-1",
  credentials: fromEnv(),
});


export const registerEmail = async (data) => {
  const { email, name, token } = data;

  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Data: `<p>Hola: ${name} Valida tu cuenta en Company Register</p>
                 <p>Tu cuenta ya está casi lista, solo debes confirmarla en el siguiente enlace:</p>
                 <a href="${process.env.FRONTEND_URL}/confirm/${token}">Validar Cuenta</a>
                 <p>Si tú no creaste esta cuenta, puedes ignorar el mensaje</p>`
        },
      },
      Subject: {
        Data: 'Company Register - Valida tu cuenta',
      },
    },
    Source: 'santiagoah27@hotmail.com',
  };

  try {
    const sendEmailCommand = new SendEmailCommand(params);
    const data = await sesClient.send(sendEmailCommand);
    console.log('Email enviado:', data.MessageId);
  } catch (error) {
    console.error('Error al enviar el email:', error);
  }
};

export const recoverPasswordEmail = async (data) => {
  const { email, name, token } = data;

  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Data: `<p>Hola: ${name} has solicitado reestablecer tu password</p>
                 <p>Sigue el siguiente enlace para generar un nuevo password:</p>
                 <a href="${process.env.FRONTEND_URL}/forgot-password/${token}">Reestablecer Password</a>
                 <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>`
        },
      },
      Subject: {
        Data: 'Company Register - Restablece tu password',
      },
    },
    Source: 'santiagoah27@hotmail.com',
  };

  try {
    const sendEmailCommand = new SendEmailCommand(params);
    const data = await sesClient.send(sendEmailCommand);
    console.log('Email enviado:', data.MessageId);
  } catch (error) {
    console.error('Error al enviar el email:', error);
  }
};
