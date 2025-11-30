import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connecté");
  } catch (error) {
    console.error("erreur de connexion au DB", error.message);
    process.exit(1);
  }
};
