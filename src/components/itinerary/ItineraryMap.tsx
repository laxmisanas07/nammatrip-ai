'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Navigation } from 'lucide-react';

interface MapDestination {
  id: string;
  name: string;
  kannadaName?: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface ItineraryMapProps {
  destinations: MapDestination[];
}

export function ItineraryMap({ destinations }: ItineraryMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    let mapInstance: unknown = null;

    if (typeof window === 'undefined' || !mapContainerRef.current || destinations.length === 0) {
      return;
    }

    // Dynamic load leaflet in browser
    import('leaflet')
      .then((L) => {
        // Import leaflet CSS dynamically if not present
        if (!document.getElementById('leaflet-css')) {
          const link = document.createElement('link');
          link.id = 'leaflet-css';
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          document.head.appendChild(link);
        }

        if (!mapContainerRef.current) return;

        // Clean any existing map container state
        const container = mapContainerRef.current as HTMLElement & { _leaflet_id?: number };
        if (container._leaflet_id) {
          container._leaflet_id = undefined;
          container.innerHTML = '';
        }

        const centerLat = destinations[0].coordinates.lat;
        const centerLng = destinations[0].coordinates.lng;

        const map = L.map(mapContainerRef.current, {
          center: [centerLat, centerLng],
          zoom: destinations.length === 1 ? 11 : 7,
          scrollWheelZoom: false,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 18,
        }).addTo(map);

        const bounds = L.latLngBounds([]);
        const coordsList: [number, number][] = [];

        // Custom default icon
        const customIcon = L.divIcon({
          className: 'custom-leaflet-marker',
          html: `<div style="background-color: #1B4332; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">📍</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

        destinations.forEach((dest, idx) => {
          const lat = dest.coordinates.lat;
          const lng = dest.coordinates.lng;
          coordsList.push([lat, lng]);
          bounds.extend([lat, lng]);

          const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
          marker.bindPopup(
            `<div style="font-family: sans-serif; padding: 4px;">
              <strong style="color: #0F2A1F; font-size: 13px;">${idx + 1}. ${dest.name}</strong>
              <div style="color: #4A5550; font-size: 11px; margin-top: 2px;">${dest.region}</div>
            </div>`
          );
        });

        // Draw connecting route line if more than 1 destination
        if (coordsList.length > 1) {
          L.polyline(coordsList, {
            color: '#C85A32',
            weight: 3,
            dashArray: '6, 8',
            opacity: 0.8,
          }).addTo(map);

          map.fitBounds(bounds, { padding: [50, 50] });
        }

        mapInstance = map;
        setMapLoaded(true);
      })
      .catch((err) => {
        console.error('Leaflet initialization failed:', err);
        setMapError(true);
      });

    return () => {
      if (mapInstance && typeof (mapInstance as { remove: () => void }).remove === 'function') {
        (mapInstance as { remove: () => void }).remove();
      }
    };
  }, [destinations]);

  return (
    <div className="editorial-card p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E3DED6]">
        <div>
          <h3 className="text-base font-bold text-[#0F2A1F] flex items-center gap-2">
            <Navigation className="w-5 h-5 text-[#2D6A4F]" />
            Itinerary Geographic Route & Verified Coordinates
          </h3>
          <p className="text-xs text-[#7E8B84]">
            Powered by OpenStreetMap. Accurate location data for each stop.
          </p>
        </div>
      </div>

      {/* Map container */}
      <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden border border-[#E3DED6] bg-[#EFEBE4]">
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {!mapLoaded && !mapError && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#FAF7F2]/80 z-20 text-xs text-[#4A5550]">
            Loading interactive Karnataka map...
          </div>
        )}

        {mapError && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#FAF7F2] z-20 p-6 text-center">
            <p className="text-xs text-[#7E8B84]">
              Interactive map tiles are currently unavailable in offline mode. Please use the direct verified coordinates and map links below.
            </p>
          </div>
        )}
      </div>

      {/* Verified Destination Coordinates list & external map links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
        {destinations.map((d, i) => {
          const extMapUrl = `https://www.google.com/maps/search/?api=1&query=${d.coordinates.lat},${d.coordinates.lng}`;
          return (
            <div
              key={d.id}
              className="p-3 rounded-lg border border-[#E3DED6] bg-[#FAF7F2] flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#1B4332] text-white flex items-center justify-center text-[10px] font-bold">
                  {i + 1}
                </span>
                <div>
                  <span className="font-bold text-[#0F2A1F] block">{d.name}</span>
                  <span className="text-[10px] text-[#7E8B84]">
                    {d.coordinates.lat.toFixed(3)}°N, {d.coordinates.lng.toFixed(3)}°E
                  </span>
                </div>
              </div>
              <a
                href={extMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2D6A4F] hover:text-[#1B4332] p-1"
                title={`Open ${d.name} in Google Maps`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
