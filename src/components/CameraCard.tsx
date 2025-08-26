import React, { useState } from "react";
import Badge from "./Badge";
import AreaMap from "./MapComponents/AreaMap";
import type { Camera } from "../types";
import { FiEdit } from "react-icons/fi";
import CameraLocationEdit from "./CameraLocationEdit";

interface CameraCardProps {
    camera: Camera;
}

const CameraCard: React.FC<CameraCardProps> = ({ camera }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="grid grid-cols-1 gap-6">
                <section
                    className="col-span-1 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow min-h-[100px] animate-fade-in overflow-hidden"
                >
                    <div className="flex flex-col h-full">
                        <div className="relative max-h-[350px]">
                            <div className="object-cover w-full rounded-t-lg h-60">
                                {camera.status !== "LOCATION_UNKNOWN" && (
                                    <AreaMap
                                        camera_id={camera.camera_id}
                                        disableZoom={true}
                                        center={[camera.latitude, camera.longitude]}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="p-6 text-lg">
                            {camera.status === "ONLINE" ? (
                                <Badge color="green" label="線上" />
                            ) : camera.status === "OFFLINE" ? (
                                <Badge color="red" label="離線" />
                            ) : (
                                <Badge color="gray" label="位置未知" />
                            )}

                            <h1 className="text-xl font-semibold my-2">
                                {camera.camera_name ?? `未命名相機 - ${camera.camera_id}`}
                            </h1>
                            <p className="text-sm">{camera.location_description ?? "位置不明"}</p>
                            {camera.latitude && camera.longitude && (
                                <>
                                    <p className="text-sm text-gray-500 mt-2">
                                        經度: {camera.longitude} <br />
                                        緯度: {camera.latitude}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-2">
                                         {(camera.sd_card_used_space / 1000).toFixed(2)} / {(camera.sd_card_capacity / 1000).toFixed(2)} GB
                                    </p>
                                </>
                            )}

                            {/* 改成直接打開 modal */}
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="mt-4 inline-block p-2 rounded hover:bg-gray-200"
                                title="編輯座標"
                            >
                                <FiEdit size={20} />
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            {/* 編輯相機座標 Modal */}
            {isModalOpen && (
                <CameraLocationEdit
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    cameraId={camera.camera_id}
                    areaId={camera.area_id}
                />
            )}
        </>
    );
};

export default CameraCard;
