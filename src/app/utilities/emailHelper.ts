/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from 'fs/promises';
import * as path from 'path';
import Handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import config from '../config';

const sendEmail = async (
  email: string,
  subject: string,
  data: object,
  templateType: 'rental_request_update_tenant' | 'new_rental_request_landlord',
  attachment?: { filename: string; content: Buffer; encoding: string },
) => {
  try {
    // Generate email content using the specified template
    const html = await createEmailContent(data, templateType);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: config.sender_email,
        pass: config.sender_app_password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Email configuration
    const mailOptions: nodemailer.SendMailOptions = {
      from: `"${config.sender_name || 'No-Reply'}" <${config.sender_email}>`,
      to: email,
      subject,
      html,
      attachments: attachment ? [attachment] : [],
    };

    // Sending the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

const createEmailContent = async (data: object, templateType: string) => {
  try {
    const templatePath = path.join(
      process.cwd(),
      `/src/templates/${templateType}.template.hbs`,
    );
    const content = await fs.readFile(templatePath, 'utf8');

    const template = Handlebars.compile(content);
    return template(data);
  } catch (error) {
    console.error('Error creating email content:', error);
    throw new Error('Failed to create email content');
  }
};

export const EmailHelper = {
  sendEmail,
  createEmailContent,
};
