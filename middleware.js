import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Clearly define the public routes
  publicRoutes: [
    "/", 
    "/cart", 
    "/api/products", 
    "/api/upload"
  ],
  // Routes that can be accessed without signing in
  ignoredRoutes: ["/((?!api|trpc))(_next.*|.+\\.[\\w]+$)", "/favicon.ico"]
});

export const config = {
  // The standard matcher for Next.js
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
