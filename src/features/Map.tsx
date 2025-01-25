"use client";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { ComponentProps } from "react";

type MapProps = ComponentProps<"div"> & {
  center?: [number, number];
  zoom?: number;
  zoomControl?: boolean;
};

export default function Map({ className, children, center = [39.468, -0.355], zoom = 15, zoomControl = true }: MapProps) {
  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} zoomControl={zoomControl} touchZoom={zoomControl} className={className}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        className=""
      />
      {children}
    </MapContainer>
  );
}
