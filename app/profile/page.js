// app/profile/page.js (Updated to use Clerk's auth())
import { auth } from "@clerk/nextjs/server"; // Clerk's server auth
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";

export default async function Profile() {
  // Use Clerk's server-side auth to get the user ID
  const { userId, user } = auth(); 

  if (!userId) {
    // Redirect unauthenticated users to the home page (or sign-in)
    redirect("/"); 
  }

  await dbConnect();
  // Fetch orders for this user
  // Clerk provides the user's email or ID, use the email from the database setup:
  const orders = await Order.find({ userEmail: user.emailAddresses[0].emailAddress }).sort({ createdAt: -1 });

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="flex items-center gap-4 mb-8">
        <img src={user.imageUrl} className="w-16 h-16 rounded-full" />
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user.firstName || 'User'}</h1>
          <p className="text-gray-500">{user.emailAddresses[0].emailAddress}</p>
        </div>
        {/* ... rest of the Order History ... */}
      </div>
    </div>
  );
}
