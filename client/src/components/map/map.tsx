import React, { useRef, useEffect, useMemo } from "react";
import useMap from "../../hooks/useMap";
import { OfferLocation, OffersList } from "../../types/offer";
import "leaflet/dist/leaflet.css";
import * as leaflet from "leaflet";

declare module "leaflet" {
  interface Marker {
    offerId?: string;
  }
}

type MapProps = {
  cityLocation: OfferLocation;
  offers: OffersList[];
  hoveredOfferId?: string | null;
  activeOfferId?: string;
};

function Map({
  cityLocation,
  offers,
  hoveredOfferId,
  activeOfferId,
}: MapProps): React.JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapRef, cityLocation);
  const markersRef = useRef<leaflet.Marker[]>([]);

  const defaultCustomIcon = useMemo(
    () =>
      leaflet.icon({
        iconUrl:
          "https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      }),
    []
  );

  const hoverCustomIcon = useMemo(
    () =>
      leaflet.icon({
        iconUrl:
          "https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      }),
    []
  );

  useEffect(() => {
    return () => {
      if (map) {
        markersRef.current.forEach((marker) => {
          map.removeLayer(marker);
        });
      }
    };
  }, [map]);

  useEffect(() => {
    if (!map) return;

    markersRef.current.forEach((marker) => map.removeLayer(marker));
    markersRef.current = [];

    offers.forEach((offer) => {
      const isActive = offer.id === activeOfferId;
      const marker = leaflet.marker(
        {
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        },
        {
          icon: isActive ? hoverCustomIcon : defaultCustomIcon,
        }
      );

      marker.offerId = offer.id;

      marker
        .on("mouseover", () => {
          marker.setIcon(hoverCustomIcon);
        })
        .on("mouseout", () => {
          if (isActive) {
            marker.setIcon(hoverCustomIcon);
          } else {
            marker.setIcon(defaultCustomIcon);
          }
        });

      marker.addTo(map);
      markersRef.current.push(marker);
    });
  }, [map, offers, activeOfferId, defaultCustomIcon, hoverCustomIcon]);

  useEffect(() => {
    markersRef.current.forEach((marker) => {
      const isActive = marker.offerId === activeOfferId;
      const isHovered = marker.offerId === hoveredOfferId;
      
      if (isActive || isHovered) {
        marker.setIcon(hoverCustomIcon);
      } else {
        marker.setIcon(defaultCustomIcon);
      }
    });
  }, [hoveredOfferId, activeOfferId, defaultCustomIcon, hoverCustomIcon]);

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
