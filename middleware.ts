import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value; // Extract token from cookies

    // if (!token) {
    //   return NextResponse.redirect(new URL("/login", req.url));
    // }

    // // Verify the token
    // const decoded = jwt.verify(token, 'your_secret_key'); // Replace 'your_secret_key' with your actual secret key

    // // You can now access the decoded token payload
    // console.log(decoded);

    // // Proceed with the request
    // return NextResponse.next();
  } catch (error) {
    // console.error(error);
    // // If token is not found or invalid, return an error response
    // return NextResponse.json({
    //     success: false,
    //     message: 'Unauthorized',
    //     error: error.message
    // }, { status: 401 });
  }
}

export const config = {
  matcher: ["/chat/:path*"],
};
