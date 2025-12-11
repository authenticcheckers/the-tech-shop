// middleware.js (Updated)
import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: [
    '/', 
    '/api/products',
    '/cart', 
    '/product/(.*)',
  ],
  ignoredRoutes: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
  // *** CRUCIAL FIX: Force Node.js Runtime ***
  runtime: 'nodejs'
};
