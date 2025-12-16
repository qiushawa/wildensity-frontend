import React from 'react';

const Home: React.FC = () => {
  return (
    // 影片
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl aspect-w-16 aspect-h-9">
        <video
          className="w-full h-full object-cover rounded-lg shadow-lg"
          controls
        >
          <source src="Clipchamp_2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Home;