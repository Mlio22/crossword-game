import Games from "../components/admin/Games";
import Navbar from "../components/admin/Navbar";
import Sidebar from "../components/admin/Sidebar";

export default function Dashboard() {
  return (
    <div className="bg-gray-800 w-screen h-screen" >
      <Navbar />
      <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-800">
        <Sidebar />
        <Games />
      </div>
    </div>
  );
}
