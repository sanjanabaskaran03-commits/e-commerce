require('dotenv').config({ path: '.env.local' }); // Use the path to your specific env file
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const readEnvLocal = () => {
  try {
    const envPath = path.join(__dirname, '..', '.env.local');
    if (!fs.existsSync(envPath)) return null;
    const content = fs.readFileSync(envPath, 'utf8');
    const line = content.split(/\r?\n/).find((l) => l.startsWith('MONGODB_URI='));
    if (!line) return null;
    return line.split('=', 2)[1].trim();
  } catch {
    return null;
  }
};

let MONGODB_URI = process.env.MONGODB_URI || readEnvLocal();
if (MONGODB_URI && ((MONGODB_URI.startsWith('"') && MONGODB_URI.endsWith('"')) || (MONGODB_URI.startsWith("'") && MONGODB_URI.endsWith("'")))) {
  MONGODB_URI = MONGODB_URI.slice(1, -1);
}

if (!MONGODB_URI) {
  console.error('Missing MONGODB_URI. Set it in your shell before running this script.');
  process.exit(1);
}

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  isRecommended: Boolean,
  image: { type: String },
  sectionTags: [{ type: String }],
  discountPercent: { type: Number },
  rating: {
    rate: Number,
    count: Number,
  },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const products = [
  // Deals (old list)
  {
    title: 'Smart watches',
    price: 19,
    description: 'Featured deal item',
    category: 'Consumer electronics',
    image: '/images/homepage/deals/watch.png',
    rating: { rate: 4.4, count: 120 },
    sectionTags: ['deals'],
    discountPercent: 25,
  },
  {
    title: 'Laptops',
    price: 340,
    description: 'Featured deal item',
    category: 'Computer and tech',
    image: '/images/homepage/deals/laptop.png',
    rating: { rate: 4.5, count: 90 },
    sectionTags: ['deals'],
    discountPercent: 15,
  },
  {
    title: 'Canon cameras',
    price: 89,
    description: 'Featured deal item',
    category: 'Consumer electronics',
    image: '/images/homepage/deals/camera.png',
    rating: { rate: 4.3, count: 75 },
    sectionTags: ['deals'],
    discountPercent: 25,
  },
  {
    title: 'Headphones',
    price: 10,
    description: 'Featured deal item',
    category: 'Consumer electronics',
    image: '/images/homepage/deals/headphone.png',
    rating: { rate: 4.2, count: 140 },
    sectionTags: ['deals'],
    discountPercent: 25,
  },
  {
    title: 'GoPro cameras',
    price: 240,
    description: 'Featured deal item',
    category: 'Consumer electronics',
    image: '/images/homepage/deals/phone.png',
    rating: { rate: 4.6, count: 60 },
    sectionTags: ['deals'],
    discountPercent: 40,
  },

  // Home and outdoor (old list)
  {
    title: 'Soft chairs',
    price: 19,
    description: 'Home and outdoor item',
    category: 'Home and outdoor',
    image: '/images/homepage/categories/softchair1.png',
    rating: { rate: 4.1, count: 30 },
    sectionTags: ['home-outdoor'],
  },
  {
    title: 'Lamp',
    price: 19,
    description: 'Home and outdoor item',
    category: 'Home and outdoor',
    image: '/images/homepage/categories/lamp.png',
    rating: { rate: 4.3, count: 110 },
    sectionTags: ['home-outdoor'],
  },
  {
    title: 'Mattress',
    price: 19,
    description: 'Home and outdoor item',
    category: 'Home and outdoor',
    image: '/images/homepage/categories/mattress.png',
    rating: { rate: 4.2, count: 45 },
    sectionTags: ['home-outdoor'],
  },
  {
    title: 'Mud vessel',
    price: 19,
    description: 'Home and outdoor item',
    category: 'Home and outdoor',
    image: '/images/homepage/categories/pot.png',
    rating: { rate: 4.0, count: 18 },
    sectionTags: ['home-outdoor'],
  },
  {
    title: 'Kitchen mixer',
    price: 100,
    description: 'Home and outdoor item',
    category: 'Home and outdoor',
    image: '/images/homepage/categories/chopper.png',
    rating: { rate: 4.4, count: 66 },
    sectionTags: ['home-outdoor'],
  },
  {
    title: 'Blenders',
    price: 39,
    description: 'Home and outdoor item',
    category: 'Home and outdoor',
    image: '/images/homepage/categories/blender.png',
    rating: { rate: 4.1, count: 25 },
    sectionTags: ['home-outdoor'],
  },
  {
    title: 'Home appliance',
    price: 19,
    description: 'Home and outdoor item',
    category: 'Home and outdoor',
    image: '/images/homepage/categories/kitchen appliance.png',
    rating: { rate: 4.0, count: 22 },
    sectionTags: ['home-outdoor'],
  },
  {
    title: 'Home decor',
    price: 10,
    description: 'Home and outdoor item',
    category: 'Home and outdoor',
    image: '/images/homepage/categories/homedecor.png',
    rating: { rate: 4.2, count: 40 },
    sectionTags: ['home-outdoor'],
  },

  // Consumer electronics and gadgets (old list)
  {
    title: 'Smart watches',
    price: 19,
    description: 'Consumer electronics and gadgets item',
    category: 'Consumer electronics and gadgets',
    image: '/images/homepage/deals/watch.png',
    rating: { rate: 4.4, count: 120 },
    sectionTags: ['consumer-electronics', 'gadgets'],
  },
  {
    title: 'Cameras',
    price: 89,
    description: 'Consumer electronics and gadgets item',
    category: 'Consumer electronics and gadgets',
    image: '/images/homepage/deals/camera.png',
    rating: { rate: 4.3, count: 75 },
    sectionTags: ['consumer-electronics', 'gadgets'],
  },
  {
    title: 'Headphone',
    price: 10,
    description: 'Consumer electronics and gadgets item',
    category: 'Consumer electronics and gadgets',
    image: '/images/homepage/categories/headphone1.png',
    rating: { rate: 4.1, count: 90 },
    sectionTags: ['consumer-electronics', 'gadgets'],
  },
  {
    title: 'Electric kettle',
    price: 90,
    description: 'Consumer electronics and gadgets item',
    category: 'Consumer electronics and gadgets',
    image: '/images/homepage/categories/coffee maker.png',
    rating: { rate: 4.2, count: 55 },
    sectionTags: ['consumer-electronics', 'gadgets'],
  },
  {
    title: 'Laptops & PC',
    price: 340,
    description: 'Consumer electronics and gadgets item',
    category: 'Consumer electronics and gadgets',
    image: '/images/homepage/deals/laptop.png',
    rating: { rate: 4.5, count: 90 },
    sectionTags: ['consumer-electronics', 'gadgets'],
  },
  {
    title: 'Tab',
    price: 19,
    description: 'Consumer electronics and gadgets item',
    category: 'Consumer electronics and gadgets',
    image: '/images/homepage/categories/tab.png',
    rating: { rate: 4.0, count: 40 },
    sectionTags: ['consumer-electronics', 'gadgets'],
  },
  {
    title: 'Smartphone',
    price: 240,
    description: 'Consumer electronics and gadgets item',
    category: 'Consumer electronics and gadgets',
    image: '/images/homepage/categories/mobile.png',
    rating: { rate: 4.6, count: 110 },
    sectionTags: ['consumer-electronics', 'gadgets'],
  },
  {
    title: 'Headphone1',
    price: 34,
    description: 'Consumer electronics and gadgets item',
    category: 'Consumer electronics and gadgets',
    image: '/images/homepage/categories/headphone1.png',
    rating: { rate: 4.1, count: 90 },
    sectionTags: ['consumer-electronics', 'gadgets'],
  },

 // Recommended items - Exact match for RecommendedItems.jsx
  {
    title: 'Men’s Polo Shirt',
    price: 10.30,
    description: 'Casual wear',
    category: 'Clothing',
    image: '/images/homepage/recommended_items/tshirt.png',
    sectionTags: ['recommended'],
    rating: { rate: 4.2, count: 55 }
  },
  {
    title: 'Men’s Hooded Jacket',
    price: 10.30,
    description: 'Outerwear',
    category: 'Clothing',
    image: '/images/homepage/recommended_items/jerkin.png',
    sectionTags: ['recommended'],
    rating: { rate: 4.1, count: 48 }
  },
  {
    title: 'Men’s Blazer',
    price: 12.50,
    description: 'Formal wear',
    category: 'Clothing',
    image: '/images/homepage/recommended_items/blazer.png',
    sectionTags: ['recommended'],
    rating: { rate: 4.3, count: 30 }
  },
  {
    title: 'Blue Leather Wallet',
    price: 34.00,
    description: 'Accessories',
    category: 'Accessories',
    image: '/images/homepage/recommended_items/wallet.png',
    sectionTags: ['recommended'],
    rating: { rate: 4.0, count: 60 }
  },
  {
    title: 'Blue Backpack',
    price: 99.00,
    description: 'Travel gear',
    category: 'Bags',
    image: '/images/homepage/recommended_items/bag.png',
    sectionTags: ['recommended'],
    rating: { rate: 4.4, count: 40 }
  },
  {
    title: 'Denim Shorts',
    price: 9.99,
    description: 'Summer wear',
    category: 'Clothing',
    image: '/images/homepage/recommended_items/cloth.png',
    sectionTags: ['recommended'],
    rating: { rate: 4.1, count: 33 }
  },
  {
    title: 'Over‑ear Headphones',
    price: 8.99,
    description: 'Electronics',
    category: 'Gadgets',
    image: '/images/homepage/recommended_items/headphone.png',
    sectionTags: ['recommended'],
    rating: { rate: 4.2, count: 72 }
  },
  {
    title: 'Blue Backpack', // Duplicate item from your list
    price: 10.30,
    description: 'School gear',
    category: 'Bags',
    image: '/images/homepage/recommended_items/bag.png',
    sectionTags: ['recommended'],
    rating: { rate: 4.3, count: 26 }
  },
  {
    title: 'Clay Pot',
    price: 10.30,
    description: 'Home decor',
    category: 'Home',
    image: '/images/homepage/recommended_items/pot.png',
    sectionTags: ['recommended'],
    rating: { rate: 4.0, count: 22 }
  },
  {
    title: 'Electric Kettle',
    price: 80.95,
    description: 'Kitchen appliance',
    category: 'Appliances',
    image: '/images/homepage/recommended_items/coffee maker.png',
    sectionTags: ['recommended'],
    rating: { rate: 4.1, count: 18 }
  },
];

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);

  if (process.argv.includes('--reset')) {
    await Product.deleteMany({ sectionTags: { $exists: true } });
  }

  const created = await Product.insertMany(products);
  console.log(`Seeded ${created.length} products.`);

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
