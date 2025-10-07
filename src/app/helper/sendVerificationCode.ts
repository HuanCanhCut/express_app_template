import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.NODE_MAILER_EMAIL,
        pass: process.env.NODE_MAILER_PASSWORD,
    },
})

const sendVerificationCode = ({ email, code }: { email: string; code: number }) => {
    const mailOptions = {
        from: process.env.NODE_MAILER_EMAIL,
        to: email,
        subject: 'Reset Password Code',
        html: `
            <html>
                <body style="font-family: Arial, sans-serif; color: #333">
                    <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px">
                        <div style="width: 100%; display: flex; justify-content: center; align-items: center">
                            <img
                                src="https://res.cloudinary.com/dkmwrkngj/image/upload/v1759854156/dark-logo_e176mo.png"  
                                style="width: 30%; height: auto; object-fit: cover; margin: 0 auto"
                                alt=""
                            />
                        </div>

                        <h1>Mã xác minh</h1>

                        <h4 style="font-weight: 400">
                            Vui lòng điền mã xác minh sau để cập nhật lại mật khẩu, vui lòng không chia sẻ mã này cho bất kì ai.
                        </h4>

                        <h1 style="text-align: center">${code}</h1>

                        <p>Email này được gửi từ hệ thống, vui lòng không trả lời lại.</p>

                        <h3 style="color: rgb(0, 76, 255); text-align: center">🐧 Huấn Cánh Cụt 🐧</h3>
                    </div>
                </body>
            </html>
        `,
    }

    return transporter.sendMail(mailOptions)
}

export default sendVerificationCode
