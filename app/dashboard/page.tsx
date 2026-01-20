import { ErrorBoundary } from "@/components/shared/boundary/error-boundary";
import { DashbaordCard } from "@/components/shared/card/card";
import PagePagination from "@/components/shared/pagination/pagination";
import { DashboardSection } from "@/components/shared/section/section";
import { TableSkeleton } from "@/components/shared/skeleton/table";
import { SectionHeading } from "@/components/shared/typography/heading";
import { db } from "@/config/db";
import ProductTable from "@/features/product/components/product-table";
import { getProducts } from "@/features/product/server/product";
import { BanknoteArrowDown, ClockCheck, ClockFading, Container, Ship, Truck, Wallet } from "lucide-react";
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
    lcPending:
      count.filter((item) => item.status === "lc_pending")?.[0]?._count ?? 0,
    lcDone: count.filter((item) => item.status === "lc_done")?.[0]?._count ?? 0,
    atPort: count.filter((item) => item.status === "at_port")?.[0]?._count ?? 0,
    inTransit: count.filter((item) => item.status === "in_transit")?.[0]?._count ?? 0,
  };

  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-5 px-4">
      <DashbaordCard
      className="text-secondary bg-secondary/10"
        title="LC Pending"
        amount={data.lcPending}
        icon={ClockFading}
      />
      <DashbaordCard
        className="bg-yellow-100 text-yellow-700"
        title="LC Done"
        amount={data.lcDone}
        icon={Wallet}
      />
      <DashbaordCard
        title="In Transit"
        amount={data.inTransit}
        icon={Ship}
      />
      <DashbaordCard
        className="text-lime-700 bg-lime-100"
        title="At Port"
        amount={data.atPort}
        icon={Container}
      />
      <DashbaordCard
        className="text-green-700 bg-green-100"
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
