import Post from "@/models/Post";
import connectDB from "@/utils/connectDB";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// get blog by id
export async function GET(request, { params }) {
  await connectDB();

  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
  }

  try {
    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong", details: err.message },
      { status: 500 }
    );
  }
}

// delete blog by id
export async function DELETE(request) {
  const { id } = params;
  await connectDB();
  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return new NextResponse(JSON.stringify({ message: "blog not found" }), {
        status: 404,
      });
    }
    return new NextResponse(
      JSON.stringify({ message: "Post deleted successfully!" }),
      {
        status: 200,
      }
    );
  } catch (err) {
    return new NextResponse(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
}

// update blog by id
export async function PATCH(request) {
  try {
    return new NextResponse(JSON.stringify({ message: "update blog by id" }), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
}
