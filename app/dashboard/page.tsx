import { ErrorBoundary } from "@/components/shared/boundary/error-boundary";
import { DashbaordCard } from "@/components/shared/card/card";
import PagePagination from "@/components/shared/pagination/pagination";
import { DashboardSection } from "@/components/shared/section/section";
import { TableSkeleton } from "@/components/shared/skeleton/table";
import { SectionHeading } from "@/components/shared/typography/heading";
import { db } from "@/config/db";
import ProductTable from "@/features/product/components/product-table";
import { getProducts } from "@/features/product/server/product";
import { BanknoteArrowDown, ClockFading, Wallet } from "lucide-react";
import { Suspense } from "react";

export default function DashboardHomePage() {
  return (
    <div className="flex flex-1 flex-col gap-8">
      <Suspense>
        <CardSection />
      </Suspense>

      <DashboardSection className="flex flex-col gap-3">
        <SectionHeading>Recent Activity</SectionHeading>
        <Suspense fallback={<TableSkeleton />}>
          <TableSection />
        </Suspense>
      </DashboardSection>
    </div>
  );
}

const CardSection = async () => {
  const count = await db.product.groupBy({
    by: ["status"],
    _count: true,
  });

  const data = {
    delivered:
      count.filter((item) => item.status === "delivered")?.[0]?._count ?? 0,
    pending: count.filter((item) => item.status === "pending")?.[0]?._count ?? 0,
  };

  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-3 px-4">
      <DashbaordCard
        title="Total Projects"
        amount={data.pending + data.delivered}
        icon={Wallet}
      />
      <DashbaordCard
        className="text-secondary bg-secondary/10"
        title="Pending Deliveries"
        amount={data.pending}
        icon={ClockFading}
      />
      <DashbaordCard
        className="text-success bg-success/10"
        title="Completed Deliveries"
        amount={data.delivered}
        icon={BanknoteArrowDown}
      />
    </div>
  );
};

const TableSection = async () => {
  const res = await getProducts({
    page: 1,
    size: 10,
    // search: search?.toString().trim(),
  });

  return (
    <ErrorBoundary message={!res.success ? res.message : undefined}>
      <ProductTable data={res?.data ?? []} />
      {/* <PagePagination count={res.count} /> */}
    </ErrorBoundary>
  );
};
