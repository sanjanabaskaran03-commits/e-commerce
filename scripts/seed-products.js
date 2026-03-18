const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

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

  // Recommended items (old list)
  {
    title: 'T-shirts with multiple colors, for men',
    price: 10.3,
    description: 'T-shirts with multiple colors, for men',
    category: 'Recommended',
    image: '/images/homepage/recommended_items/tshirt.png',
    rating: { rate: 4.2, count: 55 },
    sectionTags: ['recommended'],
  },
  {
    title: 'Jeans shorts for men blue color',
    price: 10.3,
    description: 'Jeans shorts for men blue color',
    category: 'Recommended',
    image: '/images/homepage/recommended_items/jerkin.png',
    rating: { rate: 4.1, count: 48 },
    sectionTags: ['recommended'],
  },
  {
    title: 'Brown winter coat medium size',
    price: 12.5,
    description: 'Brown winter coat medium size',
    category: 'Recommended',
    image: '/images/homepage/recommended_items/blazer.png',
    rating: { rate: 4.3, count: 30 },
    sectionTags: ['recommended'],
  },
  {
    title: 'Jeans bag for travel for men',
    price: 34,
    description: 'Jeans bag for travel for men',
    category: 'Recommended',
    image: '/images/homepage/recommended_items/wallet.png',
    rating: { rate: 4.0, count: 60 },
    sectionTags: ['recommended'],
  },
  {
    title: 'Leather wallet',
    price: 99,
    description: 'Leather wallet',
    category: 'Recommended',
    image: '/images/homepage/recommended_items/bag.png',
    rating: { rate: 4.4, count: 40 },
    sectionTags: ['recommended'],
  },
  {
    title: 'Canon camera black, 100x zoom',
    price: 9.99,
    description: 'Canon camera black, 100x zoom',
    category: 'Recommended',
    image: '/images/homepage/recommended_items/cloth.png',
    rating: { rate: 4.1, count: 33 },
    sectionTags: ['recommended'],
  },
  {
    title: 'Headset for gaming with mic',
    price: 8.99,
    description: 'Headset for gaming with mic',
    category: 'Recommended',
    image: '/images/homepage/recommended_items/headphone.png',
    rating: { rate: 4.2, count: 72 },
    sectionTags: ['recommended'],
  },
  {
    title: 'Smartwatch silver color modern',
    price: 10.3,
    description: 'Smartwatch silver color modern',
    category: 'Recommended',
    image: '/images/homepage/recommended_items/bag.png',
    rating: { rate: 4.3, count: 26 },
    sectionTags: ['recommended'],
  },
  {
    title: 'Blue wallet for men leather material',
    price: 10.3,
    description: 'Blue wallet for men leather material',
    category: 'Recommended',
    image: '/images/homepage/recommended_items/pot.png',
    rating: { rate: 4.0, count: 22 },
    sectionTags: ['recommended'],
  },
  {
    title: 'Jeans bag for travel for men',
    price: 80.95,
    description: 'Jeans bag for travel for men',
    category: 'Recommended',
    image: '/images/homepage/recommended_items/coffee maker.png',
    rating: { rate: 4.1, count: 18 },
    sectionTags: ['recommended'],
  },
];

async function run() {
  await mongoose.connect(MONGODB_URI);

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
