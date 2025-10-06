import Nav from './components/Nav';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';


const Layout: React.FC = () => {
  return (
    <div className='mx-36 rounded-t-3xl'>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="https://unpkg.com/leaflet.heat@0.2.0/leaflet-heat.js"></script>
      <Header />
      <div className="min-h-screen flex flex-col">
        <Nav navLinks={[
          { href: '/', label: '首頁' },
          { href: '/map', label: '樣區地圖' },
          { href: '/camera', label: '監測設備' }
        ]} />
        <main className="container mx-auto flex-grow mt-10">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;