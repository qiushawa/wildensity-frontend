import L from 'leaflet';
import { RiBaseStationLine } from "react-icons/ri";
import { HiStatusOffline } from "react-icons/hi";
import ReactDOMServer from 'react-dom/server';


const CameraIcon = ({ status }: { status: "ONLINE" | "OFFLINE" }): L.DivIcon => {
    const icon = new L.DivIcon({
        html: ReactDOMServer.renderToString(
            <div style={{
                width: '25px',
                height: '25px',
                backgroundColor: 'white',
                border: '1px solid #3388ff',
                borderRadius: '5px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {status === 'ONLINE' ?
                <RiBaseStationLine style={{ color: 'green', fontSize: '25px' }} /> :
                <HiStatusOffline style={{ color: 'red', fontSize: '25px' }} />
                }
            </div>
        ),
        className: 'dummy',
    });
    return icon;
}

export default CameraIcon;