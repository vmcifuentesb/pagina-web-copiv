import React, { useEffect, useRef } from 'react';
import type { Map as LeafletMapType } from 'leaflet';

export default function LeafletMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMapType | null>(null);

  useEffect(() => {
    let active = true;

    // Load leaflet client-side only
    if (typeof window !== 'undefined' && mapContainerRef.current) {
      import('leaflet').then((L) => {
        if (!active) return;

        const sanCristobalCoords: [number, number] = [14.5954, -90.5843];

        // Ensure we don't initialize map multiple times on re-renders
        if (!mapInstanceRef.current) {
          const map = L.map(mapContainerRef.current).setView(sanCristobalCoords, 15);
          
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);

          // Fix Leaflet marker icon asset paths which get broken in bundlers
          const DefaultIcon = L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });
          
          const marker = L.marker(sanCristobalCoords, { icon: DefaultIcon }).addTo(map);
          marker.bindPopup("<strong class='text-copiv-greenDark font-sans'>COPIV TIKAL S.A.</strong>").openPopup();
          
          mapInstanceRef.current = map;
        } else {
          // If map already exists, invalidate size to adjust to viewport
          mapInstanceRef.current.invalidateSize();
        }
      }).catch(err => {
        console.error("Failed to load Leaflet:", err);
      });
    }

    return () => {
      active = false;
      // Cleanup map instance on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-full min-h-[256px] relative z-10 rounded-xl overflow-hidden border border-copiv-green/30">
      <div ref={mapContainerRef} className="w-full h-full min-h-[256px]" />
    </div>
  );
}
