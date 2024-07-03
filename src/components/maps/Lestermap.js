
import React, { useRef, useEffect } from 'react';
import 'ol/ol.css';
import GeoTIFF from 'ol/source/GeoTIFF';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/WebGLTile';
import View from 'ol/View';

const Lestermap = () => {
  const mapElement = useRef(null);

  useEffect(() => {
    const source = new GeoTIFF({
      sources: [
        {
          url: 'https://openlayers.org/data/raster/no-overviews.tif',
          overviews: ['https://openlayers.org/data/raster/no-overviews.tif.ovr'],
        },
      ],
    });

    const map = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: source,
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    // Clean up on unmount
    return () => map.setTarget(null);
  }, []);

  return <div ref={mapElement} style={{ width: '100%', height: '100vh' }} />;
};

export default Lestermap;
