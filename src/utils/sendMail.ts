import { EmailMessage } from "@azure/communication-email";
import { emailClient } from "../azure/emailClient";

export async function sendMail(subject: string, message: string, recipients: string[]) {

    const emailMessage: EmailMessage = {
        sender: `${process.env.APP_EMAIL_SENDER}`,
        content: {
            subject: subject,
            html: message
        },
        recipients: {
            to: recipients.map((email: string) => { return { email } })
        },
    };

    return await emailClient.send(emailMessage);

}