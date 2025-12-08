import { getAuthUser } from "@/types/dal";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const authUser = await getAuthUser();

  if (!authUser) redirect("/login");

  redirect("/dashboard");
}
