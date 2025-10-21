import React from "react";

const Header: React.FC = () => {
  return (
    <header
      className="relative text-white shadow-md"
      aria-label="Site header"
    >
      {/* 背景圖 */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/banner.jpg')" }} // ✅ React 正確寫法：不需加 public/
      />

      {/* 灰色半透明遮罩 */}
      <div className="absolute inset-0 bg-black/50" /> {/* /50 表示透明度 50% */}

      {/* 內容層 */}
      <div className="relative container mx-auto px-6 py-30 flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide drop-shadow-lg">
          野生動物普查之智慧聯網系統
        </h1>
      </div>
    </header>
  );
};

export default Header;
