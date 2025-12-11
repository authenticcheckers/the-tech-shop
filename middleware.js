import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Define which routes must be protected (Locked)
// We want to lock the Admin dashboard and User Profile
const isProtectedRoute = createRouteMatcher([
  '/admin(.*)', 
  '/profile(.*)',
]);

export default clerkMiddleware((auth, req) => {
  // 2. If the user tries to access a protected route, force them to sign in
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
