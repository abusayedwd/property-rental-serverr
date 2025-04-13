// const mongoose = require("mongoose");
// require("dotenv").config();
// const { Service, User } = require("../models");

// // Sample data
// const usersData = [
//   {
//     fullName: "Testing Admin",
//     email: "admin@gmail.com",
//     phoneNumber: "01735566789",
//     password: "$2a$08$gyItL4EvK4e/j9yaJGSV6u7xSrvXXgM.JcwGGxAFnW5sQwgVWBNYa",
//     role: "admin",
//     isEmailVerified: "true"
//   },
//   {
//     fullName: "Testing user",
//     email: "user@gmail.com", 
//     phoneNumber: "01735566789",
//     password: "$2a$08$FNo23A8cpyqJgmSulyYAZu7QHuRmXOV0WmB85.p9bcVXuAQTD/ani",
//     role: "user",
//     isEmailVerified: "true"
//   },
//   {
//     fullName: "Testing landlord",
//     email: "landlord@gmail.com",
//     phoneNumber: "01734456873",
//     password: "$2a$08$7C0g7tGFn./Q./aL18cuNudjvlyAcBg7KF5sYp1a0cjzVvbXLFGa.",
//     role: "landlord",
//     isEmailVerified: "true"
//   },
// ]; 


// // Function to drop the entire database
// const dropDatabase = async () => {
//   try {
//     await mongoose.connection.dropDatabase();
//     console.log("------------> Database dropped successfully! <------------");
//   } catch (err) {
//     console.error("Error dropping database:", err);
//   }
// };

// // Function to seed users
// const seedUsers = async () => {
//   try {
//     await User.deleteMany();
//     await User.insertMany(usersData);
//     console.log("Users seeded successfully!");
//   } catch (err) {
//     console.error("Error seeding users:", err);
//   }
// };

 
// mongoose.connect(process.env.MONGODB_URL);

// // Call seeding functions
// const seedDatabase = async () => {
//   try {
//     await dropDatabase();
//     await seedUsers();
//     // await seedSubscriptions();
//     console.log("--------------> Database seeding completed <--------------");
//   } catch (err) {
//     console.error("Error seeding database:", err);
//   } finally {
//     mongoose.disconnect();
//   }
// };

// // Execute seeding
// seedDatabase();


const mongoose = require("mongoose");
require("dotenv").config();
const { Service, User,  } = require("../models"); // Assuming ContactInfo model is in the same path
const ContactInfo = require("../models/contact.model");

// Sample data
const usersData = [
  {
    fullName: "Testing Admin",
    email: "admin@gmail.com",
    phoneNumber: "01735566789",
    password: "$2a$08$gyItL4EvK4e/j9yaJGSV6u7xSrvXXgM.JcwGGxAFnW5sQwgVWBNYa",
    role: "admin",
    isEmailVerified: "true"
  },
  {
    fullName: "Testing user",
    email: "user@gmail.com", 
    phoneNumber: "01735566789",
    password: "$2a$08$FNo23A8cpyqJgmSulyYAZu7QHuRmXOV0WmB85.p9bcVXuAQTD/ani",
    role: "user",
    isEmailVerified: "true"
  },
  {
    fullName: "Testing landlord",
    email: "landlord@gmail.com",
    phoneNumber: "01734456873",
    password: "$2a$08$7C0g7tGFn./Q./aL18cuNudjvlyAcBg7KF5sYp1a0cjzVvbXLFGa.",
    role: "landlord",
    isEmailVerified: "true"
  },
];

const contactInfoData = [
  {
    email: "admin@gmail.com",
    phone: "01735566789",
    address: "123 Admin Street, Dhaka, Bangladesh"
  }
  
];

// Function to drop the entire database
const dropDatabase = async () => {
  try {
    await mongoose.connection.dropDatabase();
    console.log("------------> Database dropped successfully! <------------");
  } catch (err) {
    console.error("Error dropping database:", err);
  }
};

// Function to seed users
const seedUsers = async () => {
  try {
    await User.deleteMany();
    await User.insertMany(usersData);
    console.log("Users seeded successfully!");
  } catch (err) {
    console.error("Error seeding users:", err);
  }
};

// Function to seed contact info
const seedContactInfo = async () => {
  try {
    await ContactInfo.deleteMany(); // Clear any existing data
    await ContactInfo.insertMany(contactInfoData); // Insert sample contact data
    console.log("Contact info seeded successfully!");
  } catch (err) {
    console.error("Error seeding contact info:", err);
  }
};

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL);

// Call seeding functions
const seedDatabase = async () => {
  try {
    await dropDatabase();
    await seedUsers();
    await seedContactInfo(); // Seed the contact info
    console.log("--------------> Database seeding completed <--------------");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    mongoose.disconnect();
  }
};

// Execute seeding
seedDatabase();
