import React from "react";
import Badge from "./Badge";
// import type { CameraCardProps } from "../types"; // 暫時性，等功能寫完再用
import AreaMap from "./MapComponents/AreaMap";


const CameraCard: React.FC = () => {
    return (
        <>
            <div className="grid grid-cols-1 gap-6">
                <section
                    className="col-span-1 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow min-h-[100px] animate-fade-in overflow-hidden">
                    <div className="flex flex-col h-full">

                        <div className="relative max-h-[350px]">
                            {/* <img
                                src="Polish_20250808_155100223_1.jpg"
                                className="object-cover w-full h-full rounded-t-lg"
                            /> */}
                            <div className="object-cover w-full rounded-t-lg h-60">
                                <AreaMap />
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent"></div>
                        </div>
                        <div className="p-6 text-lg">
                            <Badge color="green" label="線上" />
                            <h1 className="text-xl font-semibold my-2"> 監測設備名稱</h1>
                            <p className="text-sm">位置描述</p>
                            {/* 座標 */}
                            <p className="text-sm text-gray-500">經度: 123.456 <br />
                                緯度: 78.910</p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default CameraCard;
