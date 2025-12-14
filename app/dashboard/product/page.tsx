import { ErrorBoundary } from "@/components/shared/boundary/error-boundary";
import { SearchForm } from "@/components/shared/inputs/search";
import PagePagination from "@/components/shared/pagination/pagination";
import {
  DashboardSection,
  SectionActions,
  SectionContent,
  SectionHeader,
} from "@/components/shared/section/section";
import { TableSkeleton } from "@/components/shared/skeleton/table";
import { SectionHeading } from "@/components/shared/typography/heading";
import CreateProductButton from "@/features/product/components/create-button";
import ProductTable from "@/features/product/components/product-table";
import { getProducts } from "@/features/product/server/product";
import { SearchParams } from "@/types/search-params";
import React, { Suspense } from "react";

export default async function ProductPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <>
      <DashboardSection>
        <SectionHeader>
          <SectionHeading>Products</SectionHeading>

          <SectionActions>
            <SearchForm />
            <CreateProductButton />
          </SectionActions>
        </SectionHeader>

        <SectionContent>
          <Suspense fallback={<TableSkeleton />}>
            <TableSection searchParams={searchParams} />
          </Suspense>
        </SectionContent>
      </DashboardSection>
    </>
  );
}

const TableSection = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { page, size, search } = await searchParams;

  const res = await getProducts({
    page: Number(page),
    size: Number(size),
    search: search?.toString().trim(),
  });

  return (
    <ErrorBoundary message={!res.success ? res.message : undefined}>
      <ProductTable data={res?.data ?? []} />
      <PagePagination count={res.count} />
    </ErrorBoundary>
  );
};
