import User from './models/User.js';
import bcrypt from 'bcrypt';
import connectToDatabase from './db/db.js';

const userRegister = async () => {
  try {
    await connectToDatabase(); // 
    const hashPassword = await bcrypt.hash("admin", 10);
    
    const newUser = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashPassword,
      role: "admin"
    });

    await newUser.save();
    console.log("Admin user created successfully.");
    process.exit(0); 
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1); 
  }
};

userRegister();
