import { useEffect, useState, useRef, RefObject } from "react";
import { Map, TileLayer } from "leaflet";
import { OfferLocation } from "../types/offer";

function useMap(
  mapRef: RefObject<HTMLDivElement | null>,
  cityLocation: OfferLocation
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current && cityLocation) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: cityLocation.latitude,
          lng: cityLocation.longitude,
        },
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
      isRenderedRef.current = true;
    }
  }, [mapRef, cityLocation]);

  return map;
}

export default useMap;
