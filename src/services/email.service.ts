import nodemailer from "nodemailer";

import { api_url, smtp_host, smtp_password, smtp_port, smtp_user } from "../config/config";

class EmailService {
    transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: smtp_host,
            port: Number(smtp_port),
            secure: true,
            auth: {
                user: smtp_user,
                pass: smtp_password
            }
        })
    }

    public async sendActivationEmail(to: string, link: string): Promise<void> {
      await this.transporter.sendMail({
        from: smtp_user,
        to, 
        'subject': "Activation email link for register" + api_url,
        'text': '',
        html: 
            `
            <div>
            <h1>for register please follow the link</h1>
            <a href="${link}" target="_blank">Activation link</a>
            </div>
            `
      })
    }

    public async sendSuccessActivationLetter(to: string): Promise<void> {
        await this.transporter.sendMail({
            from: smtp_user,
            to,
            "subject": "You register was successful",
            'text': '',
            html: 
            `
             <div>
            <h1>You register was succesful</h1>
            </div>
            `
        })
    }
}

export { EmailService };
