import { Outlet, NavLink } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-green-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Wildlife Density Observer</h1>
          <nav className="space-x-4">
            <NavLink
              to="/"
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-300'
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/map"
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-300'
              }
            >
              Map
            </NavLink>
            <NavLink
              to="/data"
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-300'
              }
            >
              Data
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="container mx-auto flex-grow p-4">
        <Outlet />
      </main>
      <footer className="bg-green-800 text-white p-4 text-center">
        <p>&copy; 2025 Wildlife Density Observer</p>
      </footer>
    </div>
  );
};

export default Layout;