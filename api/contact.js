export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, message } = req.body;

  return res.status(200).json({
    success: true,
    message: "Message received successfully",
    data: { name, email, message }
  });
}
