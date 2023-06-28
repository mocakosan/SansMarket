import Image from "next/image";
import getProducts, { ProductsParams } from "../actions/getProducts";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import ProductCard from "@/components/products/ProductCard";
import getCurrentUser from "../actions/getCurrentUser";
import FloatingButton from "@/components/FloatingButton";
import Categories from "@/components/categories/Categories";
import Pagination from "@/components/Pagination";
import { PRODUCTS_PER_PAGE } from "@/constants";

interface HomeProps {
  searchParams: ProductsParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);
  const currentUser = await getCurrentUser();
  const page = searchParams?.page;
  const pageNum = typeof page === "string" ? Number(page) : 1;
  return (
    <Container>
      <Categories />
      {products?.data.length === 0 ? (
        <EmptyState showReset />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-8 pt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {products.data.map((product) => (
              <ProductCard
                currentUser={currentUser}
                key={product.id}
                data={product}
              />
            ))}
          </div>
        </>
      )}
      <Pagination
        page={pageNum}
        totalItems={products.totalItems}
        perPage={PRODUCTS_PER_PAGE}
      />
      <FloatingButton href="/products/upload">+</FloatingButton>
    </Container>
  );
}
