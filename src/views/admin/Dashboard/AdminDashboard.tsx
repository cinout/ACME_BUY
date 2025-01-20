import DashboardHighlights from "./DashboardHighlights";
import StatsChart from "./StatsChart";
import RecentMessages from "./RecentMessages";
import RecentOrders from "./RecentOrders";

export default function AdminDashboard() {
  return (
    <>
      {/* Statistics highlight */}
      <DashboardHighlights />

      <div className="mt-6 flex flex-wrap justify-center w-full gap-4">
        {/* Chart */}
        <StatsChart />

        {/* Chat, Message */}
        <RecentMessages />
      </div>

      <RecentOrders />
    </>
  );
}
