import React from 'react';
import DeviceMark from './DeviceMark';
import AreaLayer from './AreaLayer';
import { ZOOM_THRESHOLD } from '../../constants/global';
import DeviceCountMark from './DeviceCountMark';

const DetailedAreaView: React.FC<{ areas: any[], zoom: number , device_id?: number }> = ({ areas, zoom, device_id }) => {
    return (
        <>
            {areas.map(area => {
                const hasBoundary = area.boundary?.coordinates?.[0]?.length > 0;
                const hasCircleCenter = area.circle?.center?.length === 2;

                return (
                    <React.Fragment key={area.area_id}>
                        {hasBoundary && (
                            <AreaLayer
                                popupContent={area.area_name}
                                positions={area.boundary.coordinates[0].map(
                                    ([lng, lat]: [number, number]) => [lat, lng]
                                )}
                            />
                        )}

                        {zoom >= ZOOM_THRESHOLD
                            ? area.devices
                                  ?.filter((device: any) => device.status !== 'LOCATION_UNKNOWN')
                                  .filter((device: any) => !device_id || device.device_id === device_id)
                                  .map((device: any) => (
                                      <DeviceMark key={device.device_id} device={device} />
                                  ))
                            : zoom > ZOOM_THRESHOLD - 3 && hasCircleCenter
                            ? (
                                <DeviceCountMark
                                    count={area.devices?.length || 0}
                                    position={[area.circle.center[0], area.circle.center[1]]}
                                />
                            )
                            : null}
                    </React.Fragment>
                );
            })}
        </>
    );
};

export default DetailedAreaView;
