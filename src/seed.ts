import mongoose from "mongoose";
import connectDB from "./config/db";
import seedUsers from "./seed/user";

const runSeeders = async () => {
  try {
    await connectDB();
    await seedUsers();
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    mongoose.connection.close();
  }
};

runSeeders();
