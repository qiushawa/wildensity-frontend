import { Marker , Popup} from "react-leaflet";
import DeviceCountIcon from "./DeviceCountIcon";
const DeviceCountMark: React.FC<{ count: number; position: [number, number] }> = ({ count, position }) => {
    return (
        <Marker
            icon={DeviceCountIcon({ count })}
            position={position}
        >
            <Popup>
                {count}
            </Popup>
        </Marker>
    );
};

export default DeviceCountMark;
