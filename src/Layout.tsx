import Nav from './components/Nav';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';


const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Nav navLinks={[
          { href: '/', label: '首頁' },
          { href: '/map', label: '樣區地圖' },
          { href: '/camera', label: '監測設備' }
        ]} />
        <main className="container mx-auto flex-grow p-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;