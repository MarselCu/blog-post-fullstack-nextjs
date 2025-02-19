import { NextResponse } from "next/server";

// get blog by id
export async function GET(request) {
  try {
    return new NextResponse(JSON.stringify({ message: "get blog by id" }), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}

// delete blog by id
export async function DELETE(request) {
  try {
    return new NextResponse(JSON.stringify({ message: "delete blog by id" }), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: err.message }), {
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
      return new NextResponse(JSON.stringify({ error: err.message }), {
        status: 500,
      });
    }
}
