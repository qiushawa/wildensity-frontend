import React from "react";
import CameraCard from "../components/CameraCard";

const Camera: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <CameraCard />
      <CameraCard />
      <CameraCard />
      <CameraCard />
      <CameraCard />
      <CameraCard />
      <CameraCard />
      <CameraCard />
      </div>

    </>
  );
};

export default Camera;
