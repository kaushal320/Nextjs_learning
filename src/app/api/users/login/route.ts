import { connectToDatabase } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const { email, password } = await request.json();

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
    // create token - ensure secret is present
    const jwtSecret = process.env.JWT_SECRET_KEY;
    if (!jwtSecret) {
      return NextResponse.json(
        { message: "Server misconfiguration: JWT_SECRET_KEY is not set" },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      jwtSecret,
      { expiresIn: "1d" }
    );

    // Return basic user info (avoid sending password)
    const response = NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: existingUser._id,
          username: existingUser.username,
          email: existingUser.email,
        },
      },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 1 day in seconds
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
