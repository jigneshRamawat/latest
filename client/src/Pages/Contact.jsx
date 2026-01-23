import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Contact = () => {
  // Theme toggle example, replace with your own logic
  const [theme, setTheme] = useState(false);

  const pageRef = useRef(null);
  const [show, setShow] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (e) => e.forEach((x) => setShow(x.isIntersecting)),
      { threshold: 0.2 }
    );

    if (pageRef.current) obs.observe(pageRef.current);
    return () => obs.disconnect();
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 150 },
    visible: { opacity: 1, y: 0, delay: 1.3, transition: { duration: 0.8 } },
  };

  const bottomSlide = {
    hidden: { opacity: 0, y: 150 },
    visible: { opacity: 1, y: 0, delay: 0.7, transition: { duration: 0.8 } },
  };

  // ✅ Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:3000/api/contact", // ✅ Make sure this is your working backend
        { name, email, message },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        setSuccess("Message sent to Jignesh Sir 🤙🏻");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setError("Failed to send message 🙅🏻");
      }
    } catch (err) {
      console.error(err);
      setError("Server error 🫥");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      id="contact"
      ref={pageRef}
      initial="hidden"
      animate={show ? "visible" : "hidden"}
      className="overflow-x-hidden"
    >
      <motion.div variants={fadeUp} className="wrap text-center">
        <p className={`${theme ? "text-white" : "text-black"}`}>Get in touch</p>
        <h3 className="text-purple-300 text-4xl font-serif">Contact Me</h3>
      </motion.div>

      <div
        className={`${theme ? "text-white" : "text-black"} pb-30 min-h-screen w-full flex justify-center py-14 px-4`}
      >
        <div className="w-full lg:w-[70%] grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT SIDE - Contact Cards */}
          <motion.div variants={bottomSlide} className="space-y-5">
            <h2 className="text-xl font-semibold text-center lg:text-left">
              Talk to me
            </h2>

            {[
              {
                icon: "ri-mail-line",
                title: "Email",
                value: "jigneshramawat21@gmail.com",
                link: "mailto:jigneshramawat21@gmail.com",
              },
              {
                icon: "ri-whatsapp-line",
                title: "Whatsapp",
                value: "+91 7340088133",
                link: "https://wa.me/917340088133",
              },
              {
                icon: "ri-linkedin-fill",
                title: "LinkedIn",
                value: "Jignesh Ramawat",
                link: "https://www.linkedin.com/in/jignesh-ramawat-47b14121a",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                className={`${theme ? "bg-[#14172b]" : "bg-gray-100"} p-5 rounded-2xl text-center shadow-md`}
              >
                <div className="text-2xl mb-1">
                  <i className={card.icon}></i>
                </div>
                <h3 className="text-base font-semibold">{card.title}</h3>
                <p className="text-sm opacity-80 mt-1">{card.value}</p>
                <a
                  href={card.link}
                  target="_blank"
                  className="text-purple-300 text-xs mt-2 inline-block hover:underline"
                >
                  Write Me ▷
                </a>
              </motion.div>
            ))}
          </motion.div>

          {/* RIGHT SIDE - FORM */}
          <motion.div variants={bottomSlide}>
            <h2 className="text-xl font-semibold text-center lg:text-left mb-4">
              Write your Message
            </h2>

            <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <label className="text-xs text-purple-300">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  className={`${theme ? "bg-transparent border-gray-600" : "bg-white border-gray-300"} w-full mt-1 border rounded-md px-3 py-2 text-xs outline-none`}
                />
              </div>

              <div>
                <label className="text-xs text-purple-300">Mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  className={`${theme ? "bg-transparent border-gray-600" : "bg-white border-gray-300"} w-full mt-1 border rounded-md px-3 py-2 text-xs outline-none`}
                />
              </div>

              <div>
                <label className="text-xs text-purple-300">Message</label>
                <textarea
                  rows="15"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your Message"
                  className={`${theme ? "bg-transparent border-gray-600" : "bg-white border-gray-300"} w-full mt-1 border rounded-md px-3 py-2 text-xs outline-none`}
                ></textarea>
              </div>

              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
                disabled={loading}
                className="bg-purple-400 text-black text-xs font-medium px-5 py-2 rounded-md hover:bg-purple-300 transition"
              >
                {loading ? "Sending..." : "Send Message"}
              </motion.button>

              {success && <p className="text-green-500 text-xs mt-2">{success}</p>}
              {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
