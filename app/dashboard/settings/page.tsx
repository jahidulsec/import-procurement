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
import CreateUserButton from "@/features/user/components/create-button";
import UserTable from "@/features/user/components/user-table";
import { getUsers } from "@/features/user/server/user";
import { SearchParams } from "@/types/search-params";
import React, { Suspense } from "react";

export default function SettingsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <DashboardSection>
      <SectionHeader>
        <SectionHeading>Settings</SectionHeading>

        <SectionActions>
          <SearchForm />
          <CreateUserButton />
        </SectionActions>
      </SectionHeader>

      <SectionContent>
        <Suspense fallback={<TableSkeleton />}>
          <TableSection searchParams={searchParams} />
        </Suspense>
      </SectionContent>
    </DashboardSection>
  );
}

const TableSection = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { page, size, search } = await searchParams;

  const res = await getUsers({
    page: Number(page),
    size: Number(size),
    search: search?.toString().trim(),
    role: "admin",
  });

  return (
    <ErrorBoundary message={!res.success ? res.message : undefined}>
      <UserTable data={res?.data ?? []} />
      <PagePagination count={res.count} />
    </ErrorBoundary>
  );
};
