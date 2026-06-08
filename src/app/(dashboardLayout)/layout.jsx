import DashboardSidebar from "@/components/DashboardSidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#080c16]">
      <DashboardSidebar />

      <div className="px-6 py-10 w-full max-w-5xl">{children}</div>
    </div>
  );
};

export default DashboardLayout;
