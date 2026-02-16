import { Outlet } from "react-router-dom";

function Body() {
  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Outlet />
    </main>
  );
}

export default Body;
