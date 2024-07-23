import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { fromLonLat } from 'ol/proj';
import Map from 'ol/Map';
import View from 'ol/View';
import 'ol/ol.css';
import TileLayer from 'ol/layer/Tile';
import { OSM, TileWMS } from 'ol/source';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import GpsNotFixedIcon from '@mui/icons-material/GpsNotFixed';
import Button from '@mui/material/Button';

const geoserverUrl = process.env.REACT_APP_GEOSERVER_URI;

const Tiff = [
  {
    title: 'yongdamAOI:20230422_NIR',
    type: 'nir',
    years:'2023',
    name:'20230422_NIR',
    coordinate: '',
    description: '',
    layers: 'yongdamAOI:20230422_NIR',
  },
  {
    title: 'yongdamAOI:20230422_RGB',
    type: 'rgb',
    years:'2023',
    name:'20230422_RGB',
    coordinate: '',
    description: '',
    layers: 'yongdamAOI:20230422_RGB',
  },
  {
    title: 'yongdamAOI:20230422_NDVI',
    type: 'ndvi',
    years:'2023',
    name:'20230422_NDVI',
    coordinate: '',
    description: '',
    layers: 'yongdamAOI:20230422_NDVI',
  },
  {
    title: 'yongdamAOI:20230422_NDWI',
    type: 'ndwi',
    years:'2023',
    name:'20230422_NDWI',
    coordinate: '',
    description: '',
    layers: 'yongdamAOI:20230422_NDWI',
  },
  {
    title: 'yongdamAOI:20230422_NIR_super',
    type: 'rgb',
    years:'2023',
    name:'20230422_NIR_super',
    coordinate: '',
    description: '',
    layers:'yongdamAOI:20230422_NIR_super',
  },
  {
    title: 'yongdamAOI:20230422_RGB_super',
    type: 'nir',
    years:'2023',
    name:'20230422_RGB_super',
    coordinate: '',
    description: '',
    layers: 'yongdamAOI:20230422_RGB_super',
  },
  {
    title: 'yongdamAOI:20230422_NDVI_super',
    type: 'ndvi',
    years:'2023',
    name:'20230422_NDVI_super',
    coordinate: '',
    description: '',
    layers: 'yongdamAOI:20230422_NDVI_super',
  },
  {
    title: 'yongdamAOI:20230422_NDWI_super',
    type: 'ndwi',
    years:'2023',
    name:'20230422_NDWI_super',
    coordinate: '',
    description: '',
    layers: 'yongdamAOI:20230422_NDWI_super',
  },
  {
    title: 'yongdamAOI:20240610_NIR',
    type: 'nir',
    years:'2024',
    name:'20240610_NIR',
    coordinate: '',
    description: '',
    layers: 'yongdamAOI:20240610_NIR',
  },
  {
    title: 'yongdamAOI:20240610_RGB',
    type: 'rgb',
    years:'2024',
    name:'20240610_RGB',
    coordinate: '',
    description: '',
    layers: 'yongdamAOI:20240610_RGB',
  },
  {
    title: 'yongdamAOI:20240610_NDVI',
    type: 'ndvi',
    years:'2024',
    name:'20240610_NDVI',
    coordinate: '',
    description: '',
    layers: 'yongdamAOI:20240610_NDVI',
  },
  {
    title: 'yongdamAOI:20240610_NDWI',
    type: 'ndwi',
    years:'2024',
    name:'20240610_NDWI',
    coordinate: '',
    description: '',
    layers: 'yongdamAOI:20240610_NDWI',
  },
  {
    title: 'yongdamAOI:20240610_NIR_super',
    type: 'rgb',
    years:'2024',
    name:'20240610_NIR_super',
    coordinate: '',
    description: '',
    layers:'yongdamAOI:20240610_NIR_super',
  },
  {
    title: 'yongdamAOI:20240610_RGB_super',
    type: 'nir',
    years:'2024',
    name:'20240610_RGB_super',
    coordinate: '',
    description: '',
    layers: 'yongdamAOI:20240610_RGB_super',
  },
  {
    title: 'yongdamAOI:20240610_NDVI_super',
    type: 'ndvi',
    years:'2024',
    name:'20240610_NDVI_super',
    coordinate: '',
    description: '',
    layers: 'yongdamAOI:20240610_NDVI_super',
  },
  {
    title: 'yongdamAOI:20240610_NDWI_super',
    type: 'ndwi',
    years:'2024',
    name:'20240610_NDWI_super',
    coordinate: '',
    description: '',
    layers: 'yongdamAOI:20240610_NDWI_super',
  },
];

const ComparePage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const images = queryParams.get('images')?.split(',').map(decodeURIComponent) || [];
  const mapInstancesRef = useRef([]);
  const [syncEnabled, setSyncEnabled] = useState(false);
  const [masterMapIndex, setMasterMapIndex] = useState(null);

  useEffect(() => {
    const newMapInstances = images.map((imageTitle, index) => {
      const tiffData = Tiff.find((item) => item.title === imageTitle);
      if (!tiffData) {
        console.error(`No data found for image title: ${imageTitle}`);
        return null;
      }
      console.log(`Adding layer for ${tiffData.layers}`);

      const map = new Map({
        target: `map-${index}`,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          new TileLayer({
            source: new TileWMS({
              url: `${geoserverUrl}/wms`,
              params: { 'LAYERS': tiffData.layers, 'TILED': true },
              serverType: 'geoserver',
            }),
          }),
        ],
        view: new View({
          center: fromLonLat([127.5256, 35.9448]),
          zoom: 10,
          minZoom: 10,
          maxZoom: 19,
        }),
      });

      return map;
    }).filter((map) => map !== null);

    newMapInstances.forEach((map, index) => {
      if (map) map.setTarget(`map-${index}`);
    });

    mapInstancesRef.current = newMapInstances;

    return () => {
      newMapInstances.forEach((map) => {
        if (map) map.setTarget(null);
      });
    };
  }, [images]);

  useEffect(() => {
    if (masterMapIndex !== null && syncEnabled) {
      const masterMap = mapInstancesRef.current[masterMapIndex];
      if (masterMap) {
        const syncView = () => {
          const center = masterMap.getView().getCenter();
          const zoom = masterMap.getView().getZoom();
          mapInstancesRef.current.forEach((map, index) => {
            if (index !== masterMapIndex) {
              map.getView().setCenter(center);
              map.getView().setZoom(zoom);
            }
          });
        };

        masterMap.on('moveend', syncView);

        return () => {
          masterMap.un('moveend', syncView);
        };
      }
    }
  }, [masterMapIndex, syncEnabled]);

  const handleSyncToggle = (index) => {
    if (syncEnabled && masterMapIndex === index) {
      setSyncEnabled(false);
      setMasterMapIndex(null);
    } else {
      setSyncEnabled(true);
      setMasterMapIndex(index);
    }
  };

  const getGridTemplate = (count, index) => {
    if (count === 10) return { xs: 2.4 };
    if (count === 9) return { xs: index < 5 ? 2.4 : 3 };
    if (count === 8) return { xs: 3 };
    if (count === 7) return { xs: index < 4 ? 3 : 4 };
    if (count === 6) return { xs: 4 };
    if (count === 5) return { xs: index < 3 ? 4 : 6 };
    if (count === 4) return { xs: 6 };
    if (count === 3) return { xs: index < 2 ? 6 : 12 };
    if (count === 2) return { xs: 6 };
    return { xs: 12 };
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', height: '100%' }}>
        {images.map((imageTitle, index) => {
          const gridTemplate = getGridTemplate(images.length, index);
          return (
            <div
              key={index}
              style={{
                width: `${gridTemplate.xs * (100 / 12)}%`,
                height: images.length <= 2 ? '100%' : '50%',
                boxSizing: 'border-box',
                padding: '1px',
                position: 'relative',
              }}
            >
              <div id={`map-${index}`} style={{ width: '100%', height: '100%' }}>
                <div style={{ position: 'absolute', top: '120px', left: '10px', zIndex: 1 }}>
                  <Btn
                    variant={syncEnabled && masterMapIndex === index ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={() => handleSyncToggle(index)}
                  >
                    {syncEnabled && masterMapIndex === index ?   <MyLocationIcon/> : <GpsNotFixedIcon/>}
                  </Btn>
                </div>
                <ImageTitle>
                  <Titles >
                    <span style={{  padding: '5px' }}>{imageTitle}</span>
                  </Titles>
                </ImageTitle>
                
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComparePage;


const ImageTitle = styled.div`
  position: absolute;
  width:100%;
  top: 1px;
  color:white;
  font-size:15px;
  border-radius:0px 0px 5px 5px;
  display:flex;
  align-items: center;
  justify-content: center;

`

const Titles = styled.div`
  position: absolute; 
  top: 0px;
  width:max-contents;
  z-index: 1000; 
  background-color: black;
  padding:5px;
  color:white;
  font-size:15px;
  border-radius:0px 0px 5px 5px;
  display:flex;
  align-items: center;
  justify-content: center;
`





const Btn = styled.div`
background-color: white;
border-radius:5px;
width:25px;
height:25px;
display:flex;
  align-items: center;
  justify-content: center;
`;