import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function BuyerLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="buyer">{children}</DashboardLayout>;
}
