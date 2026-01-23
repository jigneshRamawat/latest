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
      host: "smtp.elasticemail.com",
      port: 2525, // Elastic email 2525 port use karta hai jo hosting par block nahi hota
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: "jigneshramawat21@gmail.com", // Yahan wahi email dalein jo Elastic email par verify kiya hai
      to: "jigneshramawat21@gmail.com",
      subject: `New Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<h3>New Message</h3><p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b> ${message}</p>`,
    });

    res.json({ success: true, message: "Message sent via Elastic Email!" });
  } catch (err) {
    console.error("Nodemailer Error:", err);
    res.status(500).json({ success: false, message: "Email failed", error: err.message });
  }
});

export default router;
