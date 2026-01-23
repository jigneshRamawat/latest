import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  res.status(200).json({
    success: true,
    message: "Message received from Vercel",
    data: { name, email, message },
  });
});

export default router;
