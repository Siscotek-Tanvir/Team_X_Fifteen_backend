import { Request, Response } from 'express';
import { statusCodes } from '../../Configs/StatusCode';
import catchAsync from '../../Utils/catchAsync';
import { sendResponse } from '../../Utils/response';
import { ProductServices } from './seminar.service';

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.getAllProductsFromDB(req.query);

  sendResponse(res, {
    statusCode: statusCodes.ok,
    success: true,
    message: 'All products fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.getSingleProductFromDB(req.params?.id);

  sendResponse(res, {
    statusCode: statusCodes.ok,
    success: true,
    message: 'Product fetched successfully',
    data: result,
  });
});

export const ProductControllers = {
  getAllProducts,
  getSingleProduct,
};
