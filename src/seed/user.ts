import mongoose from "mongoose";

const seedUsers = async () => {
  try {
    const db = mongoose.connection.db;
    if (!db) {
        console.error("Database connection is not available.");
        return;
      }
    const usersCollection = db.collection("users");

    const count = await usersCollection.countDocuments();
    if (count === 0) {
      await usersCollection.insertMany([
        { name: "John Doe", email: "john@gmail.com", role: "admin" },
        { name: "Jane Smith", email: "jane@gmail.com", role: "user" },
        { name: "Mike Johnson", email: "mike@gmail.com", role: "admin" },
      ]);
      console.log("Default users inserted successfully!");
    } else {
      console.log("Users already exist, skipping seeding.");
    }
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};

export default seedUsers;
