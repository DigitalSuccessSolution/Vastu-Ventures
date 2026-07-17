import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  icon: { type: String, default: '' },
  description: { type: String, required: true },
  longDescription: { type: String, default: '' },
  price: { type: Number, required: true },
  isActive: { type: Boolean, default: true }
});

const Service = mongoose.model('Service', serviceSchema);

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vastuvidya').then(async () => {
  const count = await Service.countDocuments();
  if (count === 0) {
    await Service.insertMany([
      { title: 'Residential Vastu Consultation', slug: 'residential-vastu', category: 'residential', price: 150, description: 'desc' },
      { title: 'Commercial Office Vastu', slug: 'commercial-vastu', category: 'commercial', price: 300, description: 'desc' },
      { title: 'Industrial & Factory Vastu', slug: 'industrial-vastu', category: 'industrial', price: 600, description: 'desc' }
    ]);
    console.log('Seeded 3 services');
  } else {
    console.log('Services already exist:', count);
  }
  process.exit(0);
});
