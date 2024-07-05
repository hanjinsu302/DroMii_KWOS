import React, { useRef, useEffect } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import { Tile as TileLayer, Heatmap as HeatmapLayer } from 'ol/layer';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import 'ol/ol.css';
import { defaults as defaultInteractions } from 'ol/interaction';
import { Fill, Style } from 'ol/style';
import { TileWMS } from 'ol/source';

const HeatmapMap = () => {
  const mapRef = useRef();

  useEffect(() => {
    const rasterLayer = new TileLayer({
      source: new OSM(),
    });

    const vectorSource = new VectorSource();

    const heatmapLayer = new HeatmapLayer({
      source: vectorSource,
      blur: 25,
      radius: 15,
      weight: (feature) => feature.get('weight') || 1,
    });

    const wmsLayer1 = new TileLayer({
        source: new TileWMS({
          url: 'http://localhost:8080/geoserver/yeongju/wms',
          params: {
            'LAYERS': 'yeongju:yeongju_AOI',
            'TILED': true,
          },
          serverType: 'geoserver',
          transition: 0,
        }),
        
      });

    const map = new Map({
      target: mapRef.current,
      layers: [rasterLayer, wmsLayer1,heatmapLayer],
      view: new View({
        center: fromLonLat([128.70571, 36.91433]), // Center of South Korea
        zoom: 10, // Adjust zoom to show the whole country
      }),
      interactions: defaultInteractions(),
    });

    // Add features to the heatmap layer
    const addFeature = (coordinates, weight) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(coordinates)),
        weight: weight,
      });
      vectorSource.addFeature(feature);
    };

    // Example features (add more points across South Korea)
    const points = [
      { coords: [128.70571, 36.91433], weight: 10 }, 
      { coords: [128.72590, 36.87284], weight: 0.6 }, 
      { coords: [128.71723, 36.92325], weight: 0.7 }, 
      { coords: [128.69497, 36.76968], weight: 0.5 }, 
      { coords: [128.71461, 36.77243], weight: 0.4 }, 
      { coords: [128.69453, 36.77143], weight: 0.9 }, 
      { coords: [128.69453, 36.86284], weight: 0.9 }, 
      { coords: [128.69453, 36.91423], weight: 0.5 }, 
      { coords: [128.80714, 36.70380], weight: 0.9 }, 
      { coords: [128.62737, 36.67125], weight: 0.9 }, 
      { coords: [128.66564, 36.66709], weight: 0.9 }, 
      // Add more points as needed
    ];

    points.forEach(point => addFeature(point.coords, point.weight));

    return () => map.setTarget(null);
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '100vh' }}></div>;
};

export default HeatmapMap;
