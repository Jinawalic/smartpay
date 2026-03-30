import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function FirsLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="firs">{children}</DashboardLayout>;
}
