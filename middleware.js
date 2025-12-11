// middleware.js
import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  // Define public routes that do NOT require authentication
  publicRoutes: [
    '/', 
    '/api/products', // API route to fetch products for the shop
    '/cart', 
    '/product/(.*)', // Individual product pages (if dynamic)
  ],
  // Define ignored routes (e.g., static assets, favicon)
  ignoredRoutes: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
});

export const config = {
  // Match all request paths except for the ones starting with:
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon)
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
