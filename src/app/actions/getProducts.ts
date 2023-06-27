import { PRODUCTS_PER_PAGE } from "@/constants";
import prisma from "@/helpers/prismadb";
import { skip } from "node:test";

export interface ProductsParams {
  latitude?: number;
  longitude?: number;
  category?: string;
  page?: number;
  skip?: number;
}

export default async function getProducts(params: ProductsParams) {
  try {
    const { latitude, longitude, category, skip } = params;
    //쿼리를 비워주고
    let query: any = {};
    //카테고리가 있으면 가져온다
    if (category) {
      query.category = category;
    }
    if (latitude) {
      query.latitude = {
        gte: Number(latitude) - 0.01,
        lte: Number(latitude) + 0.01,
      };
    }

    if (longitude) {
      query.longitude = {
        gte: Number(longitude) - 0.01,
        lte: Number(longitude) + 0.01,
      };
    }
    const totalItems = await prisma.product.count({ where: query });

    const products = await prisma?.product.findMany({
      where: query,
      orderBy: {
        createAt: "desc",
      },
      ...{ take: PRODUCTS_PER_PAGE },
      ...(skip && { skip: Number(skip) }),
    });

    return {
      data: products,
      totalItems,
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
