import { ErrorBoundary } from "@/components/shared/boundary/error-boundary";
import {
  DashboardSection,
  SectionContent,
  SectionHeader,
} from "@/components/shared/section/section";
import { SectionHeading } from "@/components/shared/typography/heading";
import ResetPasswordForm from "@/features/user/components/reset-password-form";
import UserForm from "@/features/user/components/user-form";
import { getUser } from "@/features/user/server/user";
import { getAuthUser } from "@/types/dal";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default function AccountPage() {
  return (
    <DashboardSection>
      <SectionHeader>
        <SectionHeading>Account</SectionHeading>
      </SectionHeader>

      <SectionContent>
        <Suspense
          fallback={
            <div className="min-h-40 flex justify-center items-center">
              <Loader2 className="size-10 text-primary animate-spin" />
            </div>
          }
        >
          <UserFormContainer />
        </Suspense>
      </SectionContent>
    </DashboardSection>
  );
}

const UserFormContainer = async () => {
  const authUser = await getAuthUser();

  const res = await getUser(authUser?.sapId ?? "");

  return (
    <ErrorBoundary message={!res.success ? res.message : undefined}>
      <div className="border rounded-md min-h-40 p-4 flex flex-col gap-8">
        <SectionHeading>Profile</SectionHeading>
        <UserForm prevData={res.data ?? undefined} />
      </div>

      <div className="border rounded-md min-h-40 p-4 flex flex-col gap-8">
        <SectionHeading>Reset Password</SectionHeading>
        <ResetPasswordForm id={res.data?.sap_id ?? ""} />
      </div>
    </ErrorBoundary>
  );
};
