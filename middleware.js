// middleware.js
import { authMiddleware } from "@clerk/nextjs/server"; 

export default authMiddleware({
  // Clearly define the public routes that do NOT require authentication
  publicRoutes: [
    "/", 
    "/cart", 
    "/api/products", 
    "/api/upload", // Allow access for the upload API route if authentication is handled inside
    "/product/(.*)", // If you have dynamic product pages
  ],
  // Ignore Vercel's static assets from auth checks
  ignoredRoutes: ["/((?!api|trpc))(_next.*|.+\\.[\\w]+$)", "/favicon.ico"]
});

export const config = {
  // Standard Next.js matcher
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
