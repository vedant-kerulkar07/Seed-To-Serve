import UserTopbar from "@/components/UserTopbar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="min-h-screen w-full bg-[#0B1E20] overflow-x-hidden">
      
      <UserTopbar />

      {/* ADD PROPER SPACING FOR FLOATING TOPBAR */}
      <main className="w-full ">
        <Outlet />
      </main>

    </div>
  );
};

export default UserLayout;