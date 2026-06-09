const nodemailer = require("nodemailer");

let messages = [];

const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address"
      });
    }

    // Gmail Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD
      }
    });

    // Send email to yourself
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "New Portfolio Contact Form Submission",
      html: `
        <h2>New Contact Message</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Message:</strong></p>

        <p>${message}</p>
      `
    });

    // Optional Auto Reply
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Thank You for Contacting Me",
      html: `
        <h2>Hello ${name},</h2>

        <p>Thank you for reaching out through my portfolio website.</p>

        <p>I have received your message and will get back to you soon.</p>

        <br>

        <p>Best Regards,</p>
        <p>Shivam Upadhyay</p>
      `
    });

    // Store in memory (Week 2)
    const newMessage = {
      id: Date.now(),
      name,
      email,
      message,
      submittedAt: new Date()
    };

    messages.push(newMessage);

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

// GET all messages
const getMessages = (req, res) => {
  return res.status(200).json({
    success: true,
    total: messages.length,
    data: messages
  });
};

module.exports = {
  createMessage,
  getMessages
};