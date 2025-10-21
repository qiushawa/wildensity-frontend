import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import Header from "./components/Header";
import "leaflet/dist/leaflet.css"; // 正確引入 Leaflet CSS

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* -------- Header -------- */}
      <Header />

      {/* -------- Nav (在 Header 下方) -------- */}
      <Nav
        navLinks={[
          { href: "/map", label: "樣區地圖" },
          { href: "/camera", label: "監測設備" },
        ]}
      />

      {/* -------- Main Content -------- */}
      <main className="flex-grow container mx-auto px-6 py-10">
        <Outlet />
      </main>

      {/* -------- Footer -------- */}
      <footer className="text-center py-6 text-gray-500 border-t border-gray-200">
        © 2025 野生動物普查之智慧聯網系統

      </footer>
    </div>
  );
};

export default Layout;
