import nodemailer from 'nodemailer';
import key from '../../keys/grand-practice-344523-302850e3a17f.json';

class EmailService {
  private transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'admin@mergulhosports.com',
      serviceClient: key.client_id,
      privateKey: key.private_key,
    },
  });

  public async sendEmail(destination: string, content: { subject: string; text: string }): Promise<boolean> {
    try {
      await this.transporter.verify();

      await this.transporter.sendMail({
        from: 'contato@mergulhosports.com',
        to: destination,
        subject: content.subject,
        text: content.text,
      });

      return true;
    } catch (err) {
      console.error(err);
      throw new Error('Email service unavailable: ' + (err as Error).message);
    }
  }
}

export const emailService = new EmailService();
