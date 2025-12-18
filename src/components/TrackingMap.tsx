import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Location } from '../services/shipmentService';
const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [32, 41],
    iconAnchor: [16, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41]
});

const destinationIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    iconSize: [32, 41],
    iconAnchor: [16, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41]
});

interface TrackingMapProps {
    currentLocation: Location;
    vesselName: string;
    origin: string;
}

const ORIGIN_COORDS: Record<string, [number, number]> = {
    "Shanghai, China": [31.2304, 121.4737],
    "Le Havre, France": [49.4944, 0.1079],
    "Dubai, UAE": [25.2048, 55.2708],
    "Port Autonome de Dakar (PAD)": [14.6928, -17.4467]
};

const DAKAR_COORDS: [number, number] = [14.6928, -17.4467];

export const TrackingMap: React.FC<TrackingMapProps> = ({ currentLocation, vesselName, origin }) => {
    const originPos = ORIGIN_COORDS[origin] || [0, 0];
    const currentPos: [number, number] = [currentLocation.lat, currentLocation.lng];

    return (
        <div
            className="w-full h-full rounded-2xl overflow-hidden"
            style={{
                border: '1px solid var(--border-soft)',
                boxShadow: 'var(--shadow-premium)'
            }}
        >
            <MapContainer
                center={currentPos[0] !== 0 ? currentPos : DAKAR_COORDS}
                zoom={currentPos[0] !== 0 ? 4 : 3}
                scrollWheelZoom={true}
                style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "1rem"
                }}
                className="z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {originPos[0] !== 0 && (
                    <Marker position={originPos} icon={customIcon}>
                        <Popup>
                            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
                                <div style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                                    Origin: {origin}
                                </div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-light)' }}>
                                    Journey Start
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                )}

                {currentPos[0] !== 0 && currentPos[0] !== DAKAR_COORDS[0] && (
                    <>
                        <Marker position={currentPos} icon={customIcon}>
                            <Popup>
                                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
                                    <div style={{ color: 'var(--color-primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                                        {vesselName}
                                    </div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', marginBottom: '0.25rem' }}>
                                        Current Location
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-accent)' }}>
                                        Lat: {currentPos[0].toFixed(4)}, Lng: {currentPos[1].toFixed(4)}
                                    </div>
                                </div>
                            </Popup>
                        </Marker>

                        <Polyline
                            positions={[originPos, currentPos]}
                            color="var(--color-accent)"
                            weight={4}
                            dashArray="15, 10"
                            opacity={0.7}
                        />
                    </>
                )}

                {currentPos[0] !== 0 && (
                    <Polyline
                        positions={[currentPos, DAKAR_COORDS]}
                        color="var(--color-primary)"
                        weight={3}
                        dashArray="10, 10"
                        opacity={0.6}
                    />
                )}

                {originPos[0] !== 0 && (
                    <Polyline
                        positions={[originPos, DAKAR_COORDS]}
                        color="var(--color-success)"
                        weight={2}
                        opacity={0.3}
                    />
                )}

                <Marker position={DAKAR_COORDS} icon={destinationIcon}>
                    <Popup>
                        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
                            <div style={{ color: 'var(--color-success)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                                Port Autonome de Dakar
                            </div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-light)' }}>
                                Final Destination
                            </div>
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

