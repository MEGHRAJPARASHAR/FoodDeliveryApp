import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()  

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})

export const sendOTPEmail = async (to, otp) => {
    await transporter.sendMail({
        from: process.env.EMAIL,
        to: to,
        subject: "Password Reset OTP",
        text: `Your OTP is: ${otp}. It expires in 10 minutes.`
    })
}

console.log(process.env.EMAIL)
console.log(process.env.PASS)
export default transporter