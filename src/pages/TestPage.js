import React, { useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';

const MyComponent = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      mapInstance.current = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.setTarget(null);
      }
    };
  }, []);

  const handleDownload = async () => {
    if (!mapInstance.current) return;

    try {
      const mapViewport = mapInstance.current.getViewport();
      const canvas = await html2canvas(mapViewport, { scale: 2 });
      canvas.toBlob((blob) => {
        if (blob !== null) {
          saveAs(blob, 'map_screenshot.png');
        }
      });
    } catch (error) {
      console.error('Error converting map to image:', error);
    }
  };

  return (
    <>
      <div ref={mapRef} style={{ width: '100%', height: '80vh' }}></div>
      <button onClick={handleDownload}>Download Map Image</button>
    </>
  );
};

export default MyComponent;
