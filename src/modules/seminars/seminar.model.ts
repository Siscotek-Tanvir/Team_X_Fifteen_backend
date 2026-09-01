import { Schema, model } from 'mongoose';
import { TProduct, TProductModel } from './seminar.interface';

const productSchema = new Schema<TProduct, TProductModel>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 255,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    reviews: {
      type: [String],
      default: [],
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
      required: true,
    },
    displayImage: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    vendor: {
      type: String,
      required: true,
    },
    runningDiscount: {
      type: Number,
      default: 0,
    },
    releaseDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

productSchema.statics.isProductExistsWithSameTitle = async function (
  title: string,
) {
  const product = await this.findOne({ title: title });
  return !!product;
};

export const ProductModel2 = model<TProduct, TProductModel>(
  'products2',
  productSchema,
);
