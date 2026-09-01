import { statusCodes } from '../../Configs/StatusCode';
import AppError from '../../ErrorHandlers/AppError';
import { ProductModel2 } from './seminar.model';

const getAllProductsFromDB = async (query: any) => {
  const {
    page,
    limit,
    search,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
    brand,
    category,
  } = query;

  const totalDocs = await ProductModel2.countDocuments();

  const meta = {
    page: Number(page) || 1,
    limit: Number(limit) || 10,
    total: totalDocs,
  };

  const pageToBeFetched = Number(page) || 1;
  const limitToBeFetched = Number(limit) || 10;
  const skip = (pageToBeFetched - 1) * limitToBeFetched;

  const sortCheck: Record<string, 1 | -1> = {};

  if (sortBy && ['price'].includes(sortBy)) {
    sortCheck[sortBy] = sortOrder === 'desc' ? -1 : 1;
  }

  const filter: Record<string, any> = {};

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) {
      filter.price.$gte = Number(minPrice);
    }
    if (maxPrice) {
      filter.price.$lte = Number(maxPrice);
    }
  }

  if (category && category !== 'all') {
    filter.category = new RegExp(category, 'i');
  }

  if (brand) {
    filter.brand = new RegExp(brand, 'i');
  }

  if (search) {
    filter.$or = [
      { title: new RegExp(search, 'i') },
      { brand: new RegExp(search, 'i') },
      { category: new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') },
    ];
  }

  const result = await ProductModel2.find(filter)
    .sort(sortCheck)
    .skip(skip)
    .limit(limitToBeFetched);

  return {
    meta,
    data: result,
  };
};

const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel2.findById(id);

  if (!result) {
    throw new AppError(
      statusCodes.notFound,
      'Failed to get the product with this id',
    );
  }
  return result;
};

export const ProductServices = {
  getAllProductsFromDB,
  getSingleProductFromDB,
};
