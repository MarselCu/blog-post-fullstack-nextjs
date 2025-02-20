import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Post from "@/models/Post";

// get all blog
export async function GET() {
  await connectDB();
  try {
    const post = await Post.find();
    return new NextResponse(JSON.stringify({ post }), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}

// create blog
export async function POST(request) {
  await connectDB();
  try {
    const data = await request.json();
    const post = await Post.create(data);

    return new NextResponse(JSON.stringify({ post }), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
