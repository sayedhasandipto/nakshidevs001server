import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  title: string;
  category: string;
  price: string;
  status: string;
  createdAt: Date;
}

const ServiceSchema: Schema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: String, required: true },
  status: { type: String, default: 'Active', enum: ['Active', 'Inactive'] },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
