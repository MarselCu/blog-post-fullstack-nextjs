import { NextResponse } from "next/server";

// get all blog
export async function GET(){
    try {
        return new NextResponse(JSON.stringify({ message: "get all blog" }), {
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
    try {
        return new NextResponse(JSON.stringify({ message: "create blog" }), {
            status: 200,
        });
    } catch (err) {
        return new NextResponse(JSON.stringify({ error: err.message }), {
            status: 500,
        });
    }
}