import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // Direct Gmail service use karein
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // 16-digit App Password
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: "Hy jignesh sir New Portfolio Contact Message",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
          <h2 style="color: #a855f7;">New Message from Portfolio</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Message:</b></p>
          <p style="background: #f4f4f4; padding: 10px; border-radius: 5px;">${message}</p>
        </div>
      `,
    });

    res.json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    console.error("Nodemailer Error:", err);
    res.status(500).json({ success: false, message: "Email failed", error: err.message });
  }
});

export default router;
