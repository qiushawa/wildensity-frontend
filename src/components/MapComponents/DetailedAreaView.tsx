import React from 'react';
import DeviceMark from './DeviceMark';
import AreaLayer from './AreaLayer';
import { ZOOM_THRESHOLD } from '../../constants/global';
import DeviceCountMark from './DeviceCountMark';

const DetailedAreaView: React.FC<{ areas: any[], zoom: number }> = ({ areas, zoom }) => {
    return (
        <>
            {areas.map(area => (
                <React.Fragment key={area.area_id}>
                    <AreaLayer
                        popupContent={area.area_name}
                        positions={area.boundary.coordinates[0].map(([lng, lat]: [number, number]) => [lat, lng])}
                    />
                    {zoom >= ZOOM_THRESHOLD ?
                        area.devices
                            ?.filter((device: any) => device.status !== 'LOCATION_UNKNOWN')
                            .map((device: any) => (
                                <DeviceMark key={device.device_id} device={device} />
                            )):
                           zoom > ZOOM_THRESHOLD - 3 ?
                        <DeviceCountMark
                            count={area.devices?.length || 0}
                            position={[area.circle.center[0], area.circle.center[1]]}
                        />
                    :null}
                </React.Fragment>
            ))}
        </>
    );
};

export default DetailedAreaView;