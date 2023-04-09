import { SESClient, SendEmailCommand, SendRawEmailCommand } from "@aws-sdk/client-ses";
import { fromEnv } from "@aws-sdk/credential-provider-env";
import MailComposer from "mailcomposer";

const sesClient = new SESClient({
  region: "sa-east-1",
  credentials: fromEnv()
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
        Data: "Company Register - Valida tu cuenta",
      },
    },
    Source: "santiagoah27@hotmail.com",
  };

  try {
    const sendEmailCommand = new SendEmailCommand(params);
    const data = await sesClient.send(sendEmailCommand);
    console.log("Email enviado:", data.MessageId);
  } catch (error) {
    console.error("Error al enviar el email:", error);
  }
};

export const sendInventoryByPdf = async ({ email, pdfBuffer }) => {

  const mailOptions = {
    from: "santiagoah27@hotmail.com",
    to: email,
    subject: "Inventario en PDF",
    text: "Adjunto encontrarás el PDF del inventario.",
    attachments: [
      {
        filename: "inventario.pdf",
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  };

  try {
    const mailComposer = new MailComposer(mailOptions);
    const readStream = mailComposer.createReadStream();
    let rawMessage = Buffer.from([]);

    readStream.on("data", (chunk) => {
      rawMessage = Buffer.concat([rawMessage, chunk]);
    });

    readStream.on("end", async () => {
      const sendRawEmailCommand = new SendRawEmailCommand({
        RawMessage: {
          Data: rawMessage,
        },
      });

      try {
        const response = await sesClient.send(sendRawEmailCommand);
        console.log("Email enviado:", response.MessageId);
        return { success: true };
      } catch (error) {
        console.error("Error al enviar el email:", error.message, error.stack);
        throw new Error("Error al enviar el email");
      }
    });
  } catch (error) {
    console.error("Error al enviar el email:", error.message, error.stack);
    throw new Error("Error al enviar el email");
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
        Data: "Company Register - Restablece tu password",
      },
    },
    Source: "santiagoah27@hotmail.com",
  };

  try {
    const sendEmailCommand = new SendEmailCommand(params);
    const data = await sesClient.send(sendEmailCommand);
    console.log("Email enviado:", data.MessageId);
  } catch (error) {
    console.error("Error al enviar el email:", error);
  }
};
