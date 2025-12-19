"use server";

import { dbConnect } from "@/lib/mongoDb";
import bcrypt from "bcryptjs";

export const postUser = async (payload) => {
  try {
    const usersCollection = await dbConnect("users");

    // 1️⃣ validate payload
    if (!payload?.email || !payload?.password) {
      return {
        success: false,
        message: "Email and password are required",
      };
    }

    // 2️⃣ check email already exists
    const isExisted = await usersCollection.findOne({
      email: payload.email,
    });

    if (isExisted) {
        console.log("This email already exists");
        
      return {
        success: false,
        message: "This email already exists",
      };
    }

    // 3️⃣ hash password
    const hashedPassword = await bcrypt.hash(payload.password, 12);

    const userData = {
      name: payload.name || "",
      email: payload.email,
      password: hashedPassword,
      role: "user",
      createdAt: new Date().toISOString(),
    };

    // 4️⃣ insert user
    const result = await usersCollection.insertOne(userData);
    console.log(result);

    return {
      success: true,
      message: "User created successfully",
      insertedId: result.insertedId.toString(),
    };
  } catch (error) {
    console.error("❌ postUser error:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
