import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Btn from '@mui/material/Button';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import GpsNotFixedIcon from '@mui/icons-material/GpsNotFixed';
// import { DroneTiff } from './data';  // DroneTiff 데이터를 가져옵니다.
const geoserverUrl = process.env.REACT_APP_GEOSERVER_URI; //http://175.45.204.163/geoserver



 // 용담댐 대상지 임시 데이터
 const DroneTiff = [
  {
    name: "용담면 호계리 306",
    title:'A-1',
    acode: "p_1",
    coordinate: [127.4633, 35.9392],
    description: "간접지",
    indirectland:'true',//간접지 유무
    reservoirarea:'false',//저수구역 유무
    floodcontrolarea:'false',//홍수조절지 유무
    listgroup :[
      {
        title: 'yeongju:YD01_NIR',
        type:'1',// 0: 위성 1: drone
        imgtype: '1', // 0:rgb 1:nir 2:ndvi 3:ndwi
        super:'false', //SuperResolution유무
        years:'2024',  //촬영일 연도
        name:'용담면 호계리 306_NIR', //화면에 표시할 이름
        coordinate: [127.4633, 35.9392], //이미지의 좌표값
        zoom: 17,
        description: '', // 해당 데이터 설명
        layers: 'yeongju:YD01_NIR', // geoserver에서 불러올 레이어 주소명
      },
      {
        title: 'yeongju:YD01_RGB',
        type:'1',// 0: 위성 1: drone
        imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
        super:'false', //SuperResolution유무
        years:'2024',  //촬영일 연도
        name:'용담면 호계리 306_RGB', //화면에 표시할 이름
        coordinate: [127.4633, 35.9392], //이미지의 좌표값
        zoom: 17,
        description: '', // 해당 데이터 설명
        layers: 'yeongju:YD01_RGB', // geoserver에서 불러올 레이어 주소명
      },
    ]
  },
  {
    name: "용담면 호계리 516-2",
    title:'A-2',
    acode: "p_2",
    coordinate: [127.4594, 35.9234],
    indirectland:'true',//간접지
    reservoirarea:'false',//저수구역
    floodcontrolarea:'false',//홍수조절지
    listgroup :[
      {
        title: 'yeongju:YD02_NIR',
        type:'1',// 0: 위성 1: drone
        imgtype: '1', // 0:rgb 1:nir 2:ndvi 3:ndwi
        super:'false', // SuperResolution유무
        years:'2024',  // 촬영일 연도
        name:'용담면 호계리 516-2_NIR', // 화면에 표시할 이름
        coordinate: [127.4594, 35.9234], // 이미지의 좌표값
        zoom: 17,
        description: '', // 해당 데이터 설명
        layers: 'yeongju:YD01_NIR', // geoserver에서 불러올 레이어 주소명
      },
      {
        title: 'yeongju:YD02_RGB',
        type:'1',// 0: 위성 1: drone
        imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
        super:'false', //SuperResolution유무
        years:'2024',  //촬영일 연도
        name:'용담면 호계리 516-2_RGB', //화면에 표시할 이름
        coordinate: [127.4594, 35.9234], //이미지의 좌표값
        zoom: 17,
        description: '', // 해당 데이터 설명
        layers: 'yeongju:YD02_RGB', // geoserver에서 불러올 레이어 주소명
      },
    ]
  },
  {
    name: "안천면 노성리 1163-61",
    title:'A-3',
    acode: "p_3",
    coordinate: [127.5477, 35.8928],
    indirectland:'true',//간접지
    reservoirarea:'false',//저수구역
    floodcontrolarea:'false',//홍수조절지
    listgroup :[
      {
        title: 'yeongju:YD03_NIR',
        type:'1',// 0: 위성 1: drone
        imgtype: '1', // 0:rgb 1:nir 2:ndvi 3:ndwi
        super:'false', //SuperResolution유무
        years:'2024',  //촬영일 연도
        name:'안천면 노성리 1163-61_NIR', //화면에 표시할 이름
        coordinate: [127.5477, 35.8928], //이미지의 좌표값
        zoom: 17,
        description: '', // 해당 데이터 설명
        layers: 'yeongju:YD03_NIR', // geoserver에서 불러올 레이어 주소명
      },
      {
        title: 'yeongju:YD03_RGB',
        type:'1',// 0: 위성 1: drone
        imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
        super:'false', //SuperResolution유무
        years:'2024',  //촬영일 연도
        name:'안천면 노성리 1163-61_RGB', //화면에 표시할 이름
        coordinate: [127.5477, 35.8928], //이미지의 좌표값
        zoom: 17,
        description: '', // 해당 데이터 설명
        layers: 'yeongju:YD03_RGB', // geoserver에서 불러올 레이어 주소명
      },
    ]
  },
  {
    name: "상전면 월포리 1091-2",
    title:'A-4',
    acode: "p_4",
    coordinate: [127.4811, 35.8635],
    indirectland:'true',//간접지
    reservoirarea:'true',//저수구역
    floodcontrolarea:'false',//홍수조절지
    listgroup :[
      {
        title: 'yeongju:YD04_NIR',
        type:'1',// 0: 위성 1: drone
        imgtype: '1', // 0:rgb 1:nir 2:ndvi 3:ndwi
        super:'false', //SuperResolution유무
        years:'2024',  //촬영일 연도
        name:'상전면 월포리 1091-2_NIR', //화면에 표시할 이름
        coordinate: [127.4811, 35.8635], //이미지의 좌표값
        zoom: 17,
        description: '', // 해당 데이터 설명
        layers: 'yeongju:YD04_NIR', // geoserver에서 불러올 레이어 주소명
      },
      {
        title: 'yeongju:YD04_RGB',
        type:'1',// 0: 위성 1: drone
        imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
        super:'false', //SuperResolution유무
        years:'2024',  //촬영일 연도
        name:'상전면 월포리 1091-2_RGB', //화면에 표시할 이름
        coordinate: [127.4811, 35.8635], //이미지의 좌표값
        zoom: 17,
        description: '', // 해당 데이터 설명
        layers: 'yeongju:YD04_RGB', // geoserver에서 불러올 레이어 주소명
      },
    ]
  },
  {
    name: "상전면 갈현리 621-3",
    title:'A-5',
    acode: "p_5",
    coordinate: [127.4758, 35.8241],
    indirectland:'false',//간접지
    reservoirarea:'false',//저수구역
    floodcontrolarea:'true',//홍수조절지
    listgroup :[
      {
        title: 'yeongju:YD05_NIR',
        type:'1',// 0: 위성 1: drone
        imgtype: '1', // 0:rgb 1:nir 2:ndvi 3:ndwi
        super:'false', //SuperResolution유무
        years:'2024',  //촬영일 연도
        name:'상전면 갈현리 621-3_NIR', //화면에 표시할 이름
        coordinate: [127.4758, 35.8241], //이미지의 좌표값
        zoom: 17,
        description: '', // 해당 데이터 설명
        layers: 'yeongju:YD05_NIR', // geoserver에서 불러올 레이어 주소명
      },
      {
        title: 'yeongju:YD05_RGB',
        type:'1',// 0: 위성 1: drone
        imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
        super:'false', //SuperResolution유무
        years:'2024',  //촬영일 연도
        name:'상전면 갈현리 621-3_RGB', //화면에 표시할 이름
        coordinate: [127.4758, 35.8241], //이미지의 좌표값
        zoom: 17,
        description: '', // 해당 데이터 설명
        layers: 'yeongju:YD05_RGB', // geoserver에서 불러올 레이어 주소명
      },
    ]
  },
 
];


const CompareDronePage = () => {
    const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const images = queryParams.get('images')?.split(',')?.map(decodeURIComponent) || [];
  const mapInstancesRef = useRef([]);
  const [syncEnabled, setSyncEnabled] = useState(false);
  const [masterMapIndex, setMasterMapIndex] = useState(null);

  useEffect(() => {
    const newMapInstances = images.map((imageTitle, index) => {
      let tiffData = null;

      for (const tiff of DroneTiff) {
        tiffData = tiff.listgroup.find(item => item.title === imageTitle);
        if (tiffData) break;
      }

      if (!tiffData) {
        console.error(`No data found for image title: ${imageTitle}`);
        return null;
      }

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
          center: fromLonLat(tiffData.coordinate),
          zoom: tiffData.zoom,
          minZoom: 10,
          maxZoom: 22,
        }),
      });

      return map;
    });

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
            if (index !== masterMapIndex && map) {
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
                <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1 }}>
                  <Btn
                    variant={syncEnabled && masterMapIndex === index ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={() => handleSyncToggle(index)}
                  >
                    {syncEnabled && masterMapIndex === index ? <MyLocationIcon /> : <GpsNotFixedIcon />}
                  </Btn>
                </div>
                <div style={{ position: 'absolute', top: '10px', left: '50px', zIndex: 1, background: 'rgba(255, 255, 255, 0.7)', padding: '2px 5px' }}>
                  {imageTitle}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompareDronePage;