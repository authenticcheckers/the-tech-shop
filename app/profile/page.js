import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db";
import Order from "@/models/Order"; // You will need to create this model

export default async function Profile() {
  const session = await auth();
  if (!session) redirect("/");

  await dbConnect();
  // Fetch orders for this user email
  const orders = await Order.find({ userEmail: session.user.email }).sort({ createdAt: -1 });

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="flex items-center gap-4 mb-8">
        <img src={session.user.image} className="w-16 h-16 rounded-full" />
        <div>
          <h1 className="text-2xl font-bold">Welcome, {session.user.name}</h1>
          <p className="text-gray-500">{session.user.email}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Order History</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {orders.length === 0 ? (
          <p className="p-6 text-gray-500">No orders yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="p-6 border-b border-gray-50 flex justify-between">
              <div>
                <p className="font-medium">Order #{order._id.toString().slice(-6)}</p>
                <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <span className="font-bold text-green-600">Paid: GH₵ {order.amount}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
