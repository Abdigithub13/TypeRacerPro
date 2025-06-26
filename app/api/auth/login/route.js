import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password)
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );

    return NextResponse.json(
      {
        message: "Login successful",
        user: { id: user.id, email: user.email, name: user.name },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
