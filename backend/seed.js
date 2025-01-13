const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [

  { name: 'SG Bat', type:'Bat', description: 'Premium SG cricket bat.', rating: 4.5, price: 1500, imageUrl: '/images/bat.jpg' },
  { name: 'Kookaburra Bat', type:'Bat', description: 'Top-notch Kookaburra bat.', rating: 4.7, price: 1600, imageUrl: '/images/bat2.jpg' },
  { name: 'Gray-Nicolls Bat', type:'Bat', description: 'High-performance Gray-Nicolls bat.', rating: 4.8, price: 1700, imageUrl: '/images/bat3.jpg' },
  { name: 'MRF Genius Bat', type:'Bat', description: 'Endorsed by top players.', rating: 5, price: 2000, imageUrl: '/images/bat4.jpg' },
  { name: 'Adidas Bat', type:'Bat', description: 'Modern design and balance.', rating: 4.6, price: 1800, imageUrl: '/images/bat5.png' },
  { name: 'SS Bat', type:'Bat', description: 'Exceptional grip and stroke.', rating: 4.5, price: 1400, imageUrl: '/images/bat6.jpg' },
  { name: 'GM Bat', type:'Bat', description: 'Lightweight and durable.', rating: 4.4, price: 1500, imageUrl: '/images/bat7.jpg' },
  { name: 'Puma Bat', type:'Bat', description: 'Stylish and robust.', rating: 4.3, price: 1300, imageUrl: '/images/bat8.jpg' },
  { name: 'Nike Bat',  type:'Bat',description: 'Perfect for power hitters.', rating: 4.5, price: 1550, imageUrl: '/images/bat9.jpg' },
  { name: 'New Balance Bat', type:'Bat', description: 'Ideal for professionals.', rating: 5, price: 1900, imageUrl: '/images/bat.jpg' },

  { name: 'SG Ball', type:'Ball', description: 'Professional quality cricket ball.', rating: 5, price: 500, imageUrl: '/images/ball1.jpg' },
  { name: 'Kookaburra Ball',type:'Ball', description: 'Test match standard.', rating: 4.9, price: 600, imageUrl: '/images/ball2.jpg' },
  { name: 'Duke Ball',type:'Ball', description: 'Official test ball.', rating: 5, price: 700, imageUrl: '/images/ball3.jpg' },
  { name: 'GM Ball',type:'Ball', description: 'Long-lasting leather.', rating: 4.8, price: 550, imageUrl: '/images/ball4.jpg' },
  { name: 'Gray-Nicolls Ball', type:'Ball',description: 'Consistent bounce and durability.', rating: 4.7, price: 520, imageUrl: '/images/ball5.jpg' },
  { name: 'Puma Ball', type:'Ball',description: 'Quality material.', rating: 4.6, price: 480, imageUrl: '/images/ball 6.jpg' },
  { name: 'Adidas Ball',type:'Ball', description: 'Excellent seam and grip.', rating: 4.5, price: 490, imageUrl: '/images/ball3.jpg' },
  { name: 'Nike Ball',type:'Ball', description: 'Best for T20 matches.', rating: 4.4, price: 500, imageUrl: '/images/ball8.jpg' },
  { name: 'New Balance Ball',type:'Ball', description: 'Great for practice.', rating: 4.5, price: 450, imageUrl: '/images/ball9.jpg' },
  { name: 'SS Ball',type:'Ball', description: 'Affordable and reliable.', rating: 4.3, price: 400, imageUrl: '/images/ball1.jpg' },

  { name: 'SG Helmet',type:'Helmet', description: 'Top safety and comfort.', rating: 5, price: 1200, imageUrl: '/images/helmet1.jpg' },
  { name: 'Kookaburra Helmet',type:'Helmet', description: 'Ergonomic design.', rating: 4.9, price: 1300, imageUrl: '/images/helmet2.jpg' },
  { name: 'Gray-Nicolls Helmet',type:'Helmet', description: 'Best protection for players.', rating: 5, price: 1400, imageUrl: '/images/helmet3.jpg' },
  { name: 'MRF Helmet',type:'Helmet', description: 'Adjustable and durable.', rating: 4.8, price: 1100, imageUrl: '/images/helmet4.jpg' },
  { name: 'Puma Helmet',type:'Helmet', description: 'Stylish and reliable.', rating: 4.7, price: 1250, imageUrl: '/images/helmet5.jpg' },
  { name: 'Adidas Helmet', type:'Helmet',description: 'Great visibility and protection.', rating: 4.6, price: 1350, imageUrl: '/images/helmet6.jpg' },
  { name: 'Nike Helmet', type:'Helmet',description: 'Lightweight and secure.', rating: 4.5, price: 1150, imageUrl: '/images/helmet7.jpg' },
  { name: 'New Balance Helmet',type:'Helmet', description: 'Premium quality helmet.', rating: 4.8, price: 1450, imageUrl: '/images/helmet1.jpg' },
  { name: 'SS Helmet',type:'Helmet',description: 'Affordable safety gear.', rating: 4.4, price: 1050, imageUrl: '/images/helmet2.jpg' },
  { name: 'GM Helmet',type:'Helmet', description: 'Durable and lightweight.', rating: 4.6, price: 1100, imageUrl: '/images/helmet3.jpg' },

  { name: 'SG Pads',type:'Pad', description: 'Comfortable batting pads.', rating: 5, price: 1000, imageUrl: '/images/pad1.jpg' },
  { name: 'Kookaburra Pads',type:'Pad', description: 'Lightweight and durable.', rating: 4.8, price: 1050, imageUrl: '/images/pad2.jpg' },
  { name: 'Gray-Nicolls Pads',type:'Pad', description: 'Great protection.', rating: 4.9, price: 1100, imageUrl: '/images/pad3.jpg' },
  { name: 'MRF Pads',type:'Pad', description: 'For professional players.', rating: 5, price: 1150, imageUrl: '/images/pad4.jpg' },
  { name: 'Puma Pads',type:'Pad', description: 'Stylish and protective.', rating: 4.7, price: 950, imageUrl: '/images/pad1.jpg' },
  { name: 'Adidas Pads',type:'Pad', description: 'Affordable and comfortable.', rating: 4.6, price: 900, imageUrl: '/images/pad2.jpg' },
  { name: 'Nike Pads', type:'Pad', description: 'Perfect for long innings.', rating: 4.5, price: 980, imageUrl: '/images/pad3.jpg' },
  { name: 'New Balance Pads', type:'Pad', description: 'Professional quality.', rating: 4.7, price: 1020, imageUrl: '/images/pad4.jpg' },

  { name: 'SG Stumps', type:'Stumps', description: 'High-quality cricket stumps.', rating: 5, price: 800, imageUrl: '/images/stumps1.jpg' },
  { name: 'Kookaburra Stumps',type:'Stumps', description: 'Durable and reliable.', rating: 4.8, price: 850, imageUrl: '/images/stumps2.jpg' },
  { name: 'Gray-Nicolls Stumps',type:'Stumps', description: 'Official match stumps.', rating: 5, price: 900, imageUrl: '/images/stumps3.jpg' },
  { name: 'MRF Stumps',type:'Stumps', description: 'Professional-grade stumps.', rating: 4.9, price: 870, imageUrl: '/images/stumps4.jpg' },
  { name: 'Puma Stumps',type:'Stumps', description: 'Stylish and sturdy.', rating: 4.7, price: 820, imageUrl: '/images/stumps5.jpg' },
  { name: 'Adidas Stumps',type:'Stumps', description: 'Reliable and long-lasting.', rating: 4.6, price: 880, imageUrl: '/images/stumps1.jpg' },
  { name: 'Nike Stumps',type:'Stumps', description: 'Perfect for all formats.', rating: 4.5, price: 810, imageUrl: '/images/stumps2.jpg' },
  { name: 'New Balance Stumps',type:'Stumps', description: 'Great for practice.', rating: 4.8, price: 890, imageUrl: '/images/stumps3.jpg' },
  { name: 'SS Stumps',type:'Stumps', description: 'Affordable and durable.', rating: 4.4, price: 750, imageUrl: '/images/stumps4.jpg' },
  { name: 'GM Stumps',type:'Stumps', description: 'High-quality wooden stumps.', rating: 4.6, price: 870, imageUrl: '/images/stumps5.jpg' },
];

async function seedDatabase() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/cricketShop');
    console.log('MongoDB connected');

    const collectionExists = await mongoose.connection.db
      .listCollections({ name: 'products' })
      .hasNext();

    if (collectionExists) {
      await mongoose.connection.db.dropCollection('products');
      console.log('Existing collection dropped');
    }

    for (const product of products) {
      await Product.updateOne(
        { name: product.name },
        { $set: product },
        { upsert: true }
      );
    }

    console.log('Products seeded successfully');
  } catch (error) {
    console.error('Error during database seeding:', error);
  } finally {
    mongoose.disconnect();
  }
}

seedDatabase();
