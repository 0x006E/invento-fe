import { Outlet } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function Home() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
