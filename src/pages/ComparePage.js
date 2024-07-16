import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { fromLonLat } from 'ol/proj';
import Map from 'ol/Map';
import View from 'ol/View';
import 'ol/ol.css';
import TileLayer from 'ol/layer/Tile';
import { OSM, TileWMS } from 'ol/source';

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
          center: fromLonLat([127.5256, 35.9448]), // 적절한 중심 좌표로 변경
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

    return () => {
      newMapInstances.forEach((map) => {
        if (map) map.setTarget(null);
      });
    };
  }, [images]);

  const getGridTemplate = (count, index) => {
    if (count === 8) return { xs: 3 };
    if (count === 7) return { xs: index < 4 ? 3 : 4 }; // 위에 4개는 xs=3, 아래 3개는 xs=4
    if (count === 6) return { xs: 4 };
    if (count === 5) return { xs: index < 3 ? 4 : 6 }; // 위에 3개는 xs=4, 아래 2개는 xs=6
    if (count === 4) return { xs: 6 };
    if (count === 3) return { xs: index < 2 ? 6 : 12 }; // 위에 2개는 xs=6, 아래 1개는 xs=12
    if (count === 2) return { xs: 6 };
    return { xs: 12 }; // 기본값, 다른 경우에 대한 처리가 필요하다면 여기에 추가
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
                height: images.length <= 2 ? '100%' : '50%', // 1개나 2개인 경우 height 100%, 나머지는 50%
                boxSizing: 'border-box',
                padding: '1px',
                position: 'relative', // position 추가
              }}
            >
              <div id={`map-${index}`} style={{ width: '100%', height: '100%' }}>
                {/* 지도 아래에 이미지 타이틀 표시 */}
                <ImageTitle>
                  <Titles>{imageTitle}</Titles>
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





