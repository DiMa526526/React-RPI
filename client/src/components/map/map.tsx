import React, { useRef, useEffect } from "react";
import useMap from "../../hooks/useMap";
import { OfferLocation, OffersList } from "../../types/offer";
import "leaflet/dist/leaflet.css";
import * as leaflet from "leaflet";

type MapProps = {
  cityLocation: OfferLocation;
  offers: OffersList[];
};

function Map({ cityLocation, offers }: MapProps): React.JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapRef, cityLocation);
  const markersRef = useRef<leaflet.Marker[]>([]);

  const defaultCustomIcon = leaflet.icon({
    iconUrl:
      "https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const hoverCustomIcon = leaflet.icon({
    iconUrl:
      "https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (!map) return;

    markersRef.current.forEach((marker) => map.removeLayer(marker));
    markersRef.current = [];

    offers.forEach((offer) => {
      const marker = leaflet.marker(
        {
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        },
        {
          icon: defaultCustomIcon,
        }
      );

      marker
        .on("mouseover", () => {
          marker.setIcon(hoverCustomIcon);
        })
        .on("mouseout", () => {
          marker.setIcon(defaultCustomIcon);
        });

      marker.addTo(map);
      markersRef.current.push(marker);
    });
  }, [map, offers, defaultCustomIcon, hoverCustomIcon]);

  useEffect(() => {
    return () => {
      if (map) {
        markersRef.current.forEach((marker) => map.removeLayer(marker));
      }
    };
  }, [map]);

  return (
    <div
      ref={mapRef}
      style={{
        height: "100%",
        width: "100%",
        minHeight: "500px",
      }}
    />
  );
}

export default Map;
