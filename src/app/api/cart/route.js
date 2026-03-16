import dbConnect from '@/src/lib/mongodb';
import Cart from '@/src/models/Cart';
import Product from '@/src/models/Ecommerce';

export async function GET(request) {
  await dbConnect();
  const cart = await Cart.findOne({ userId: 'user_123' }).populate('items.productId');
  return Response.json(cart);
}

// ADD THIS TO FIX THE 405 ERROR
export async function PATCH(request) {
  await dbConnect();
  try {
    const { productId, qty } = await request.json();
    
    // Find the cart and update the quantity of the specific item
    const cart = await Cart.findOneAndUpdate(
      { userId: 'user_123', "items.productId": productId },
      { $set: { "items.$.qty": qty } },
      { new: true }
    ).populate('items.productId');

    return Response.json(cart);
  } catch (error) {
    return Response.json({ error: "Failed to update quantity" }, { status: 500 });
  }
}