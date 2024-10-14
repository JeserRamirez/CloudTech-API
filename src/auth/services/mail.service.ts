// mail.service.ts
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class MailService {
	private transporter: nodemailer.Transporter;

	constructor(private readonly configService: ConfigService) {
		this.transporter = nodemailer.createTransport({
			service: this.configService.getOrThrow<string>('MY_EMAIL_SERVICE'),
			host: this.configService.getOrThrow<string>('MY_EMAIL_HOST'),
			port: this.configService.getOrThrow<number>('MY_EMAIL_PORT'),
			secure: true,
			auth: {
				user: this.configService.getOrThrow<string>('MY_EMAIL_ADDRESS'),
				pass: this.configService.getOrThrow<string>('MY_EMAIL_PASSWORD'),
			},
		});
	}

	async sendPasswordResetEmail(to: string, token: string) {
		const resetLink = `${this.configService.getOrThrow<string>('MY_EMAIL_FRONTEND_DOMAIN')}/reset-password?token=${token}`;

		const mailOptions = {
			from: 'Auth-backend CloudTech service',
			to: to,
			subject: 'Password Reset Request - Action Required',
			html: `
				<p>You requested a password reset. This link will expire in 15 minutes. Please click the link below to reset your password:</p>
				<p><a href="${resetLink}">Reset Password</a></p>
				<p>If the link doesn't work, copy and paste this URL into your browser: ${resetLink}</p>
				<p>If you did not request this change, please ignore this email.</p>
			`,
			text: `You requested a password reset. This link will expire in 15 minutes.
						 Reset your password by visiting this link: ${resetLink}
						 If you did not request this change, please ignore this email.`,
		};
		try {
			await this.transporter.sendMail(mailOptions);
		} catch (error) {
			throw new InternalServerErrorException('Failed to send email');
		}
	}
}
