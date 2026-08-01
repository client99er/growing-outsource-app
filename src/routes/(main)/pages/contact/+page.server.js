import { fail } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import { theme } from '$lib/config/theme';

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465, // 465 for SSL, or 587 for TLS
	secure: true, // true for 465, false for 587
	auth: {
		user: import.meta.env.VITE_GMAIL_USER,
		pass: import.meta.env.VITE_GMAIL_PASSWORD
	}
});

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name');
		const email = formData.get('email');
		const message = formData.get('message');

		if (!name || !email || !message) {
			return fail(400, { error: 'All fields are required.', values: { name, email, message } });
		}

		// Build email
		const mailOptions = {
			from: import.meta.env.VITE_GMAIL_USER, // must be the same Gmail account or a verified sender
			to: theme.email, // your inbox (can be the same)
			subject: `Contact from ${name}`,
			text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
			html: `<h3>New contact</h3>
		     <p><strong>Name:</strong> ${name}</p>
		     <p><strong>Email:</strong> ${email}</p>
		     <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`
		};

		try {
			await transporter.sendMail(mailOptions);
			return { success: true };
		} catch (err) {
			console.error('Mail send error:', err);
			return fail(500, { error: 'Failed to send message. Try again later.' });
		}
	}
};
