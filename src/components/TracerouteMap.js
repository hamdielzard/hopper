import {MapContainer, TileLayer, Marker, Polyline} from "react-leaflet";
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
// Add proptypes for accepting new components
import PropTypes from 'prop-types';

TracerouteMap.propTypes = {
    markers: PropTypes.array,
}

TracerouteMap.defaultProps = {
    markers: [],
}

export default function TracerouteMap(props) {
    const mapStyle = {
        height: "80vh",
        width: "70vw",
        backgroundColor: "rgb(30 41 59)",
        borderRadius: "25px",
        boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.4)",
        zIndex: "1",
    }
    return (
        <MapContainer center={[31.505, -0.09]} zoom={2} style={mapStyle}
                        scrollWheelZoom={true}
                        dragging={true}
                        doubleClickZoom={false}
                        zoomControl={false}
                        touchZoom={false}
                        keyboard={false}
                        attributionControl={false}
                        boxZoom={false}
                        // Prevent dragging outside the world
                        maxBounds={[
                            [-90, -180],
                            [90, 180]
                        ]
                        }
                      minZoom={2}
        >
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {props.markers.map((marker, index) => (
                (marker.lat && marker.lon) ? (
                    <Marker key={index} position={[marker.lat, marker.lon]} icon={new L.DivIcon(
                        {
                            className: 'custom-icon',
                            // Detect if it is the last hop and make the icon green
                            html: '<div class="flex flex-col items-center justify-center' +
                                `${marker.hop === props.markers.length ? ' bg-green-500 hover:bg-green-600' : ' bg-slate-500 hover:bg-slate-600'}` +
                                ` text-xl w-8 h-8 p-2 rounded-full font-mono">${marker.hop}</div>`
                        }
                    )}/>
                ) : null
            ))}


        </MapContainer>
    )
}