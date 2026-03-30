import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function RiderLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="rider">{children}</DashboardLayout>;
}
