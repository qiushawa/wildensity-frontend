import React from "react";
import { Link } from "react-router-dom";
import Badge from "./Badge";
import AreaMap from "./MapComponents/AreaMap";
import type { Device } from "../types";
import { FiEdit } from "react-icons/fi"; // 這是 Feather Icons 的鉛筆編輯圖示
interface CameraCardProps {
    device: Device;
}

const CameraCard: React.FC<CameraCardProps> = ({ device }) => {


    return (
        <>
            <div className="grid grid-cols-1 gap-6">
                <section
                    className="col-span-1 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow min-h-[100px] animate-fade-in overflow-hidden"
                >
                    <div className="flex flex-col h-full">
                        <div className="relative max-h-[350px]">
                            <div className="object-cover w-full rounded-t-lg h-60">
                                <AreaMap device_id={device.device_id} disableZoom={true} />
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent"></div>
                        </div>
                        
                        <div className="p-6 text-lg">
                            {device.status === "ONLINE" ? (
                                <Badge color="green" label="線上" />
                            ) : device.status === "OFFLINE" ? (
                                <Badge color="red" label="離線" />
                            ) : (
                                <Badge color="gray" label="位置未知" />
                            )}
                            <h1 className="text-xl font-semibold my-2">{device.device_name}</h1>
                            <p className="text-sm">{device.location_description ?? "位置不明"}</p>
                            {device.latitude && device.longitude && (
                                <p className="text-sm text-gray-500">
                                    經度: {device.longitude} <br />
                                    緯度: {device.latitude}
                                </p>
                            )}                            {/* 編輯座標按鈕 */}
                            <Link
                                to={`/device/${device.device_id}/edit-location`}
                                className="mt-4 inline-block p-2  rounded"
                                title="編輯座標"
                            >
                                <FiEdit size={20} />
                            </Link>


                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default CameraCard;
