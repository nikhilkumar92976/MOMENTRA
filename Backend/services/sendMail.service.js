const nodemailer = require("nodemailer");

const sendMail = async (toEmail, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"My App" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "Your OTP for Email Verification",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Email Verification</h2>
          <p>Your OTP is:</p>
          <h1 style="color:#4CAF50;">${otp}</h1>
          <p>This OTP is valid for 10 minutes.</p>
          <p>If you didn’t request this, please ignore this email.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log("OTP email sent successfully");

  } catch (error) {
    console.error("Email sending failed:", error.message);
    throw new Error("Unable to send email");
  }
};

module.exports = sendMail;
