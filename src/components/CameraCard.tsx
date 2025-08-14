import React, { useState } from "react";
import Badge from "./Badge";
import AreaMap from "./MapComponents/AreaMap";
import type { Device } from "../types";
import { FiEdit } from "react-icons/fi";
import DeviceLocationEdit from "./DeviceLocationEdit";

interface CameraCardProps {
    device: Device;
}

const CameraCard: React.FC<CameraCardProps> = ({ device }) => {
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
                                {device.status !== "LOCATION_UNKNOWN" && (
                                    <AreaMap
                                        device_id={device.device_id}
                                        disableZoom={true}
                                        center={[device.latitude, device.longitude]}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="p-6 text-lg">
                            {device.status === "ONLINE" ? (
                                <Badge color="green" label="線上" />
                            ) : device.status === "OFFLINE" ? (
                                <Badge color="red" label="離線" />
                            ) : (
                                <Badge color="gray" label="位置未知" />
                            )}

                            <h1 className="text-xl font-semibold my-2">
                                {device.device_name ?? `未命名設備 - ${device.device_id}`}
                            </h1>
                            <p className="text-sm">{device.location_description ?? "位置不明"}</p>
                            {device.latitude && device.longitude && (
                                <p className="text-sm text-gray-500">
                                    經度: {device.longitude} <br />
                                    緯度: {device.latitude}
                                </p>
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

            {/* 編輯設備座標 Modal */}
            {isModalOpen && (
                <DeviceLocationEdit
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    deviceId={device.device_id}
                    areaId={device.area_id}
                />
            )}
        </>
    );
};

export default CameraCard;
