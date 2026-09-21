import env from "../config/env.js";
import { mailTransporter } from "../config/mail.config.js";

export class EmailService {
    async sendVerificationEmail(email: string, token: string): Promise<void> {

        const verificationUrl = `http://localhost:8000/auth/verify-email/${token}`;

        await mailTransporter.sendMail({
            from: env.MAIL_FROM,
            to: email,
            subject: "Verify your email",
            html: `
                <h2>Verify your email</h2>

                <p>
                    Thanks for creating an account.
                </p>

                <p>
                    Please click the button below to verify your email.
                </p>

                <a
                    href="${verificationUrl}"
                    style="
                        display: inline-block;
                        padding: 12px 20px;
                        background: #007bff;
                        color: white;
                        text-decoration: none;
                        border-radius: 5px;
                    "
                >
                    Verify Email
                </a>

                <p>
                    This verification link will expire in 30 minutes.
                </p>
            `,
        });
    }
}