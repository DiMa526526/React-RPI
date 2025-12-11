import { useEffect, useState, RefObject } from "react";
import { Map as LeafletMap, TileLayer } from "leaflet";
import { OfferLocation } from "../types/offer";

function useMap(
  mapRef: RefObject<HTMLDivElement | null>,
  cityLocation: OfferLocation
): LeafletMap | null {
  const [map, setMap] = useState<LeafletMap | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const instance = new LeafletMap(mapRef.current, {
      center: [cityLocation.latitude, cityLocation.longitude],
      zoom: 12,
    });

    const layer = new TileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }
    );

    instance.addLayer(layer);
    setMap(instance);

    return () => {
      if (instance) {
        instance.remove();
      }
    };
  }, [mapRef]);

  useEffect(() => {
    if (map && map.getContainer()) {
      map.setView([cityLocation.latitude, cityLocation.longitude], 12);
    }
  }, [map, cityLocation.latitude, cityLocation.longitude]);

  return map;
}

export default useMap;
