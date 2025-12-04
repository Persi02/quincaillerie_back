import Message from "../models/Message.js";

export const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ message: "Tous les champs sont obligatoires." });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ error: "Email invalide" });
    }
    const newMessage = await Message.create({ name, email, message });

    res.status(201).json({
      success: true,
      message: "Message envoyé avec succès.",
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
