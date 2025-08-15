import React from 'react';
import CameraMark from './CameraMark';
import AreaLayer from './AreaLayer';
import { ZOOM_THRESHOLD } from '../../constants/global';
import CameraCountMark from './CameraCountMark';

const DetailedAreaView: React.FC<{ areas: any[], zoom: number , camera_id?: number }> = ({ areas, zoom, camera_id }) => {
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
                            ? area.cameras
                                  ?.filter((camera: any) => camera.status !== 'LOCATION_UNKNOWN')
                                  .filter((camera: any) => !camera_id || camera.camera_id === camera_id)
                                  .map((camera: any) => (
                                      <CameraMark key={camera.camera_id} camera={camera} />
                                  ))
                            : zoom > ZOOM_THRESHOLD - 3 && hasCircleCenter
                            ? (
                                <CameraCountMark
                                    count={area.cameras?.length || 0}
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
