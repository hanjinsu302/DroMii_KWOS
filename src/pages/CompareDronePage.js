// import React, { useEffect, useState, useRef } from 'react';
// import styled from 'styled-components';
// import { useLocation } from 'react-router-dom';
// import { Map, View } from 'ol';
// import TileLayer from 'ol/layer/Tile';
// import TileWMS from 'ol/source/TileWMS';
// import OSM from 'ol/source/OSM';
// import { fromLonLat } from 'ol/proj';
// import MyLocationIcon from '@mui/icons-material/MyLocation';
// import GpsNotFixedIcon from '@mui/icons-material/GpsNotFixed';
// // import { DroneTiff } from './data';  // DroneTiff 데이터를 가져옵니다.
// const geoserverUrl = process.env.REACT_APP_GEOSERVER_URI; //http://175.45.204.163/geoserver



//  // 용담댐 대상지 임시 데이터
//  const DroneTiff = [
//   {
//     name: "용담면 호계리 306",
//     title:'A-1',
//     acode: "p_1",
//     coordinate: [127.4633, 35.9392],
//     description: "간접지",
//     indirectland:'true',//간접지 유무
//     reservoirarea:'false',//저수구역 유무
//     floodcontrolarea:'false',//홍수조절지 유무
//     listgroup :[
//       {
//         title: 'yeongju:YD01_NIR',
//         jcode: 'j_251',
//         type:'1',// 0: 위성 1: drone
//         imgtype: '1', // 0:rgb 1:nir 2:ndvi 3:ndwi
//         super:'false', //SuperResolution유무
//         years:'2024',  //촬영일 연도
//         name:'용담면 호계리 306_NIR', //화면에 표시할 이름
//         coordinate: [127.4633, 35.9392], //이미지의 좌표값
//         zoom: 17,
//         description: '', // 해당 데이터 설명
//         layers: 'yeongju:YD01_NIR', // geoserver에서 불러올 레이어 주소명
//       },
//       {
//         title: 'yeongju:YD01_RGB',
//         jcode: 'j_237',
//         type:'1',// 0: 위성 1: drone
//         imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
//         super:'false', //SuperResolution유무
//         years:'2024',  //촬영일 연도
//         name:'용담면 호계리 306_RGB', //화면에 표시할 이름
//         coordinate: [127.4633, 35.9392], //이미지의 좌표값
//         zoom: 17,
//         description: '', // 해당 데이터 설명
//         layers: 'yeongju:YD01_RGB', // geoserver에서 불러올 레이어 주소명
//       },
//       {
//         title: 'yeongju:YD01_RGB_M3M',
//         jcode: 'j_243',
//         type:'1',// 0: 위성 1: drone
//         imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
//         super:'false', //SuperResolution유무
//         years:'2024',  //촬영일 연도
//         name:'용담면 호계리 306_RGB_M3M', //화면에 표시할 이름
//         coordinate: [127.4633, 35.9392], //이미지의 좌표값
//         description: '', // 해당 데이터 설명
//         layers: 'yeongju:YD01_RGB', // geoserver에서 불러올 레이어 주소명
//       },
//     ]
//   },
//   {
//     name: "용담면 호계리 516",
//     title:'A-2',
//     acode: "p_2",
//     coordinate: [127.4594, 35.9234],
//     indirectland:'true',//간접지
//     reservoirarea:'false',//저수구역
//     floodcontrolarea:'false',//홍수조절지
//     listgroup :[
//       {
//         title: 'yeongju:YD02_NIR',
//         jcode: 'j_253',
//         type:'1',// 0: 위성 1: drone
//         imgtype: '1', // 0:rgb 1:nir 2:ndvi 3:ndwi
//         super:'false', // SuperResolution유무
//         years:'2024',  // 촬영일 연도
//         name:'용담면 호계리 516_NIR', // 화면에 표시할 이름
//         coordinate: [127.4594, 35.9234], // 이미지의 좌표값
//         zoom: 17,
//         description: '', // 해당 데이터 설명
//         layers: 'yeongju:YD02_NIR', // geoserver에서 불러올 레이어 주소명
//       },
//       {
//         title: 'yeongju:YD02_RGB',
//         jcode: 'j_238',
//         type:'1',// 0: 위성 1: drone
//         imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
//         super:'false', //SuperResolution유무
//         years:'2024',  //촬영일 연도
//         name:'용담면 호계리 516_RGB', //화면에 표시할 이름
//         coordinate: [127.4594, 35.9234], //이미지의 좌표값
//         zoom: 17,
//         description: '', // 해당 데이터 설명
//         layers: 'yeongju:YD02_RGB', // geoserver에서 불러올 레이어 주소명
//       },
//       {
//         title: 'yeongju:YD02_RGB_M3M',
//         jcode: 'j_244',
//         type:'1',// 0: 위성 1: drone
//         imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
//         super:'false', //SuperResolution유무
//         years:'2024',  //촬영일 연도
//         name:'용담면 호계리 516_RGB_M3M', //화면에 표시할 이름
//         coordinate: [127.4594, 35.9234], //이미지의 좌표값
//         zoom: 17,
//         description: '', // 해당 데이터 설명
//         layers: 'yeongju:YD02_RGB', // geoserver에서 불러올 레이어 주소명
//       },
//     ]
//   },
//   {
//     name: "안천면 노성리 1163",
//     title:'A-3',
//     acode: "p_3",
//     coordinate: [127.5477, 35.8928],
//     indirectland:'true',//간접지
//     reservoirarea:'false',//저수구역
//     floodcontrolarea:'false',//홍수조절지
//     listgroup :[
//       {
//         title: 'yeongju:YD03_NIR',
//         jcode: 'j_254',
//         type:'1',// 0: 위성 1: drone
//         imgtype: '1', // 0:rgb 1:nir 2:ndvi 3:ndwi
//         super:'false', //SuperResolution유무
//         years:'2024',  //촬영일 연도
//         name:'안천면 노성리 1163_NIR', //화면에 표시할 이름
//         coordinate: [127.5477, 35.8928], //이미지의 좌표값
//         zoom: 17,
//         description: '', // 해당 데이터 설명
//         layers: 'yeongju:YD03_NIR', // geoserver에서 불러올 레이어 주소명
//       },
//       {
//         title: 'yeongju:YD03_RGB',
//         jcode: 'j_239',
//         type:'1',// 0: 위성 1: drone
//         imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
//         super:'false', //SuperResolution유무
//         years:'2024',  //촬영일 연도
//         name:'안천면 노성리 1163_RGB', //화면에 표시할 이름
//         coordinate: [127.5477, 35.8928], //이미지의 좌표값
//         zoom: 17,
//         description: '', // 해당 데이터 설명
//         layers: 'yeongju:YD03_RGB', // geoserver에서 불러올 레이어 주소명
//       },
//       {
//         title: 'yeongju:YD03_RGB_M3M',
//         jcode: 'j_245',
//         type:'1',// 0: 위성 1: drone
//         imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
//         super:'false', //SuperResolution유무
//         years:'2024',  //촬영일 연도
//         name:'안천면 노성리 1163_RGB_M3M', //화면에 표시할 이름
//         coordinate: [127.5477, 35.8928], //이미지의 좌표값
//         zoom: 17,
//         description: '', // 해당 데이터 설명
//         layers: 'yeongju:YD03_RGB', // geoserver에서 불러올 레이어 주소명
//       },
//     ]
//   },
//   {
//     name: "상전면 월포리 1091",
//     title:'A-4',
//     acode: "p_4",
//     coordinate: [127.4811, 35.8635],
//     indirectland:'true',//간접지
//     reservoirarea:'true',//저수구역
//     floodcontrolarea:'false',//홍수조절지
//     listgroup :[
//       {
//         title: 'yeongju:YD04_NIR',
//         jcode: 'j_255',
//         type:'1',// 0: 위성 1: drone
//         imgtype: '1', // 0:rgb 1:nir 2:ndvi 3:ndwi
//         super:'false', //SuperResolution유무
//         years:'2024',  //촬영일 연도
//         name:'상전면 월포리 1091_NIR', //화면에 표시할 이름
//         coordinate: [127.4811, 35.8635], //이미지의 좌표값
//         zoom: 17,
//         description: '', // 해당 데이터 설명
//         layers: 'yeongju:YD04_NIR', // geoserver에서 불러올 레이어 주소명
//       },
//       {
//         title: 'yeongju:YD04_RGB',
//         jcode: 'j_242',
//         type:'1',// 0: 위성 1: drone
//         imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
//         super:'false', //SuperResolution유무
//         years:'2024',  //촬영일 연도
//         name:'상전면 월포리 1091_RGB', //화면에 표시할 이름
//         coordinate: [127.4811, 35.8635], //이미지의 좌표값
//         zoom: 17,
//         description: '', // 해당 데이터 설명
//         layers: 'yeongju:YD04_RGB', // geoserver에서 불러올 레이어 주소명
//       },
//       {
//         title: 'yeongju:YD04_RGB_M3M',
//         jcode: 'j_246',
//         type:'1',// 0: 위성 1: drone
//         imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
//         super:'false', //SuperResolution유무
//         years:'2024',  //촬영일 연도
//         name:'상전면 월포리 1091_RGB_M3M', //화면에 표시할 이름
//         coordinate: [127.4811, 35.8635], //이미지의 좌표값
//         zoom: 17,
//         description: '', // 해당 데이터 설명
//         layers: 'yeongju:YD04_RGB', // geoserver에서 불러올 레이어 주소명
//       },
//     ]
//   },
//   {
//     name: "상전면 갈현리 621",
//     title:'A-5',
//     acode: "p_5",
//     coordinate: [127.4758, 35.8241],
//     indirectland:'false',//간접지
//     reservoirarea:'false',//저수구역
//     floodcontrolarea:'true',//홍수조절지
//     listgroup :[
//       {
//         title: 'yeongju:YD05_NIR',
//         jcode: 'j_256',
//         type:'1',// 0: 위성 1: drone
//         imgtype: '1', // 0:rgb 1:nir 2:ndvi 3:ndwi
//         super:'false', //SuperResolution유무
//         years:'2024',  //촬영일 연도
//         name:'상전면 갈현리 621_NIR', //화면에 표시할 이름
//         coordinate: [127.4758, 35.8241], //이미지의 좌표값
//         zoom: 17,
//         description: '', // 해당 데이터 설명
//         layers: 'yeongju:YD05_NIR', // geoserver에서 불러올 레이어 주소명
//       },
//       {
//         title: 'yeongju:YD05_RGB',
//         jcode: 'j_241',
//         type:'1',// 0: 위성 1: drone
//         imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
//         super:'false', //SuperResolution유무
//         years:'2024',  //촬영일 연도
//         name:'상전면 갈현리 621_RGB', //화면에 표시할 이름
//         coordinate: [127.4758, 35.8241], //이미지의 좌표값
//         zoom: 17,
//         description: '', // 해당 데이터 설명
//         layers: 'yeongju:YD05_RGB', // geoserver에서 불러올 레이어 주소명
//       },
//       {
//         title: 'yeongju:YD05_RGB_M3M',
//         jcode: 'j_247',
//         type:'1',// 0: 위성 1: drone
//         imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
//         super:'false', //SuperResolution유무
//         years:'2024',  //촬영일 연도
//         name:'상전면 갈현리 621_RGB_M3M', //화면에 표시할 이름
//         coordinate: [127.4758, 35.8241], //이미지의 좌표값
//         zoom: 17,
//         description: '', // 해당 데이터 설명
//         layers: 'yeongju:YD05_RGB', // geoserver에서 불러올 레이어 주소명
//       },
//     ]
//   },
//   {
//     name: "상전면 용평리 140",
//     title:'A-6',
//     acode: "p_6",
//     coordinate: [127.4758, 35.8241],
//     indirectland:'false',//간접지
//     reservoirarea:'false',//저수구역
//     floodcontrolarea:'true',//홍수조절지
//     listgroup :[
//       {
//         title: 'yeongju:YD06_NIR',
//         jcode: 'j_257',
//         type:'1',// 0: 위성 1: drone
//         imgtype: '1', // 0:rgb 1:nir 2:ndvi 3:ndwi
//         super:'false', //SuperResolution유무
//         years:'2024',  //촬영일 연도
//         name:'상전면 용평리 140_NIR', //화면에 표시할 이름
//         coordinate: [127.4758, 35.8241], //이미지의 좌표값
//         zoom: 17,
//         description: '', // 해당 데이터 설명
//         layers: 'yeongju:YD06_NIR', // geoserver에서 불러올 레이어 주소명
//       },
//       {
//         title: 'yeongju:YD06_RGB',
//         jcode: 'j_260',
//         type:'1',// 0: 위성 1: drone
//         imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
//         super:'false', //SuperResolution유무
//         years:'2024',  //촬영일 연도
//         name:'상전면 용평리 140_RGB', //화면에 표시할 이름
//         coordinate: [127.4758, 35.8241], //이미지의 좌표값
//         zoom: 17,
//         description: '', // 해당 데이터 설명
//         layers: 'yeongju:YD06_RGB', // geoserver에서 불러올 레이어 주소명
//       },
//       {
//         title: 'yeongju:YD06_RGB_M3M',
//         jcode: 'j_265',
//         type:'1',// 0: 위성 1: drone
//         imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
//         super:'false', //SuperResolution유무
//         years:'2024',  //촬영일 연도
//         name:'상전면 용평리 140_RGB_M3M', //화면에 표시할 이름
//         coordinate: [127.4758, 35.8241], //이미지의 좌표값
//         zoom: 17,
//         description: '', // 해당 데이터 설명
//         layers: 'yeongju:YD06_RGB', // geoserver에서 불러올 레이어 주소명
//       },
//     ]
//   },
//   {
//     name: "상전면 용평리 1078",
//     title:'A-7',
//     acode: "p_7",
//     coordinate: [127.4758, 35.8241],
//     indirectland:'false',//간접지
//     reservoirarea:'false',//저수구역
//     floodcontrolarea:'true',//홍수조절지
//     listgroup :[
//       {
//         title: 'yeongju:YD07_NIR',
//         jcode: 'j_258',
//         type:'1',// 0: 위성 1: drone
//         imgtype: '1', // 0:rgb 1:nir 2:ndvi 3:ndwi
//         super:'false', //SuperResolution유무
//         years:'2024',  //촬영일 연도
//         name:'상전면 용평리 1078_NIR', //화면에 표시할 이름
//         coordinate: [127.4758, 35.8241], //이미지의 좌표값
//         zoom: 17,
//         description: '', // 해당 데이터 설명
//         layers: 'yeongju:YD07_NIR', // geoserver에서 불러올 레이어 주소명
//       },
//       {
//         title: 'yeongju:YD07_RGB',
//         jcode: 'j_261',
//         type:'1',// 0: 위성 1: drone
//         imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
//         super:'false', //SuperResolution유무
//         years:'2024',  //촬영일 연도
//         name:'상전면 용평리 1078_RGB', //화면에 표시할 이름
//         coordinate: [127.4758, 35.8241], //이미지의 좌표값
//         zoom: 17,
//         description: '', // 해당 데이터 설명
//         layers: 'yeongju:YD07_RGB', // geoserver에서 불러올 레이어 주소명
//       },
//       {
//         title: 'yeongju:YD07_RGB_M3M',
//         jcode: 'j_263',
//         type:'1',// 0: 위성 1: drone
//         imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
//         super:'false', //SuperResolution유무
//         years:'2024',  //촬영일 연도
//         name:'상전면 용평리 1078_RGB_M3M', //화면에 표시할 이름
//         coordinate: [127.4758, 35.8241], //이미지의 좌표값
//         zoom: 17,
//         description: '', // 해당 데이터 설명
//         layers: 'yeongju:YD07_RGB', // geoserver에서 불러올 레이어 주소명
//       },
//     ]
//   },
//   {
//     name: "안천면 노성리 1505",
//     title:'A-8',
//     acode: "p_8",
//     coordinate: [127.4594, 35.9234],
//     indirectland:'true',//간접지
//     reservoirarea:'false',//저수구역
//     floodcontrolarea:'false',//홍수조절지
//     listgroup :[
//       {
//         title: 'yeongju:YD08_NIR',
//         jcode: 'j_259',
//         type:'1',// 0: 위성 1: drone
//         imgtype: '1', // 0:rgb 1:nir 2:ndvi 3:ndwi
//         super:'false', // SuperResolution유무
//         years:'2024',  // 촬영일 연도
//         name:'안천면 노성리 1505_NIR', // 화면에 표시할 이름
//         coordinate: [127.4594, 35.9234], // 이미지의 좌표값
//         zoom: 17,
//         description: '', // 해당 데이터 설명
//         layers: 'yeongju:YD08_NIR', // geoserver에서 불러올 레이어 주소명
//       },
//       {
//         title: 'yeongju:YD08_RGB',
//         jcode: 'j_262',
//         type:'1',// 0: 위성 1: drone
//         imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
//         super:'false', //SuperResolution유무
//         years:'2024',  //촬영일 연도
//         name:'안천면 노성리 1505_RGB', //화면에 표시할 이름
//         coordinate: [127.4594, 35.9234], //이미지의 좌표값
//         zoom: 17,
//         description: '', // 해당 데이터 설명
//         layers: 'yeongju:YD08_RGB', // geoserver에서 불러올 레이어 주소명
//       },
//       {
//         title: 'yeongju:YD08_RGB',
//         jcode: 'j_264',
//         type:'1',// 0: 위성 1: drone
//         imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
//         super:'false', //SuperResolution유무
//         years:'2024',  //촬영일 연도
//         name:'안천면 노성리 1505_RGB', //화면에 표시할 이름
//         coordinate: [127.4594, 35.9234], //이미지의 좌표값
//         zoom: 17,
//         description: '', // 해당 데이터 설명
//         layers: 'yeongju:YD08_RGB', // geoserver에서 불러올 레이어 주소명
//       },
//     ]
//   },
// ];


// const CompareDronePage = () => {
//     const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const images = queryParams.get('images')?.split(',')?.map(decodeURIComponent) || [];
//   const mapInstancesRef = useRef([]);
//   const [syncEnabled, setSyncEnabled] = useState(false);
//   const [masterMapIndex, setMasterMapIndex] = useState(null);

//   useEffect(() => {
//     const newMapInstances = images.map((imageTitle, index) => {
//       let tiffData = null;

//       for (const tiff of DroneTiff) {
//         tiffData = tiff.listgroup.find(item => item.title === imageTitle);
//         if (tiffData) break;
//       }

//       if (!tiffData) {
//         console.error(`No data found for image title: ${imageTitle}`);
//         return null;
//       }

//       const map = new Map({
//         target: `map-${index}`,
//         layers: [
//           new TileLayer({
//             source: new OSM(),
//           }),
//           new TileLayer({
//             source: new TileWMS({
//               url: `${geoserverUrl}/wms`,
//               params: { 'LAYERS': tiffData.layers, 'TILED': true },
//               serverType: 'geoserver',
//             }),
//           }),
//         ],
//         view: new View({
//           center: fromLonLat(tiffData.coordinate),
//           zoom: tiffData.zoom,
//           minZoom: 10,
//           maxZoom: 22,
//         }),
//       });

//       return map;
//     });

//     newMapInstances.forEach((map, index) => {
//       if (map) map.setTarget(`map-${index}`);
//     });

//     mapInstancesRef.current = newMapInstances;

//     return () => {
//       newMapInstances.forEach((map) => {
//         if (map) map.setTarget(null);
//       });
//     };
//   }, [images]);

//   useEffect(() => {
//     if (masterMapIndex !== null && syncEnabled) {
//       const masterMap = mapInstancesRef.current[masterMapIndex];
//       if (masterMap) {
//         const syncView = () => {
//           const center = masterMap.getView().getCenter();
//           const zoom = masterMap.getView().getZoom();
//           mapInstancesRef.current.forEach((map, index) => {
//             if (index !== masterMapIndex && map) {
//               map.getView().setCenter(center);
//               map.getView().setZoom(zoom);
//             }
//           });
//         };

//         masterMap.on('moveend', syncView);

//         return () => {
//           masterMap.un('moveend', syncView);
//         };
//       }
//     }
//   }, [masterMapIndex, syncEnabled]);

//   const handleSyncToggle = (index) => {
//     if (syncEnabled && masterMapIndex === index) {
//       setSyncEnabled(false);
//       setMasterMapIndex(null);
//     } else {
//       setSyncEnabled(true);
//       setMasterMapIndex(index);
//     }
//   };

//   const getGridTemplate = (count, index) => {
//     if (count === 10) return { xs: 2.4 };
//     if (count === 9) return { xs: index < 5 ? 2.4 : 3 };
//     if (count === 8) return { xs: 3 };
//     if (count === 7) return { xs: index < 4 ? 3 : 4 };
//     if (count === 6) return { xs: 4 };
//     if (count === 5) return { xs: index < 3 ? 4 : 6 };
//     if (count === 4) return { xs: 6 };
//     if (count === 3) return { xs: index < 2 ? 6 : 12 };
//     if (count === 2) return { xs: 6 };
//     return { xs: 12 };
//   };

//   return (
//     <div style={{ width: '100%', height: '100vh' }}>
//       <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', height: '100%' }}>
//         {images.map((imageTitle, index) => {
//           const gridTemplate = getGridTemplate(images.length, index);
//           return (
//             <div
//               key={index}
//               style={{
//                 width: `${gridTemplate.xs * (100 / 12)}%`,
//                 height: images.length <= 2 ? '100%' : '50%',
//                 boxSizing: 'border-box',
//                 padding: '1px',
//                 position: 'relative',
//               }}
//             >
//               <div id={`map-${index}`} style={{ width: '100%', height: '100%' }}>
//                 <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1 }}>
//                   <Btn
//                     variant={syncEnabled && masterMapIndex === index ? 'contained' : 'outlined'}
//                     color="primary"
//                     onClick={() => handleSyncToggle(index)}
//                   >
//                     {syncEnabled && masterMapIndex === index ? <MyLocationIcon /> : <GpsNotFixedIcon />}
//                   </Btn>
//                 </div>
//                 <div style={{ position: 'absolute', top: '10px', left: '50px', zIndex: 1, background: 'rgba(255, 255, 255, 0.7)', padding: '2px 5px' }}>
//                   {imageTitle}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default CompareDronePage;


// const Btn = styled.div`
//   position: absolute;
//   top:100px;
//   background-color: white;
//   border-radius:5px;
//   width:25px;
//   height:25px;
//   display:flex;
//   align-items: center;
//   justify-content: center;
// `;



import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat, transformExtent } from 'ol/proj';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import GpsNotFixedIcon from '@mui/icons-material/GpsNotFixed';
import styled from 'styled-components';

const API_BASE_URL = '/api/yongdam';

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
        jcode: 'j_251',
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
        jcode: 'j_237',
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
      {
        title: 'yeongju:YD01_RGB_M3M',
        jcode: 'j_243',
        type:'1',// 0: 위성 1: drone
        imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
        super:'false', //SuperResolution유무
        years:'2024',  //촬영일 연도
        name:'용담면 호계리 306_RGB_M3M', //화면에 표시할 이름
        coordinate: [127.4633, 35.9392], //이미지의 좌표값
        description: '', // 해당 데이터 설명
        layers: 'yeongju:YD01_RGB', // geoserver에서 불러올 레이어 주소명
      },
    ]
  },
  {
    name: "용담면 호계리 516",
    title:'A-2',
    acode: "p_2",
    coordinate: [127.4594, 35.9234],
    indirectland:'true',//간접지
    reservoirarea:'false',//저수구역
    floodcontrolarea:'false',//홍수조절지
    listgroup :[
      {
        title: 'yeongju:YD02_NIR',
        jcode: 'j_253',
        type:'1',// 0: 위성 1: drone
        imgtype: '1', // 0:rgb 1:nir 2:ndvi 3:ndwi
        super:'false', // SuperResolution유무
        years:'2024',  // 촬영일 연도
        name:'용담면 호계리 516_NIR', // 화면에 표시할 이름
        coordinate: [127.4594, 35.9234], // 이미지의 좌표값
        zoom: 17,
        description: '', // 해당 데이터 설명
        layers: 'yeongju:YD02_NIR', // geoserver에서 불러올 레이어 주소명
      },
      {
        title: 'yeongju:YD02_RGB',
        jcode: 'j_238',
        type:'1',// 0: 위성 1: drone
        imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
        super:'false', //SuperResolution유무
        years:'2024',  //촬영일 연도
        name:'용담면 호계리 516_RGB', //화면에 표시할 이름
        coordinate: [127.4594, 35.9234], //이미지의 좌표값
        zoom: 17,
        description: '', // 해당 데이터 설명
        layers: 'yeongju:YD02_RGB', // geoserver에서 불러올 레이어 주소명
      },
      {
        title: 'yeongju:YD02_RGB_M3M',
        jcode: 'j_244',
        type:'1',// 0: 위성 1: drone
        imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
        super:'false', //SuperResolution유무
        years:'2024',  //촬영일 연도
        name:'용담면 호계리 516_RGB_M3M', //화면에 표시할 이름
        coordinate: [127.4594, 35.9234], //이미지의 좌표값
        zoom: 17,
        description: '', // 해당 데이터 설명
        layers: 'yeongju:YD02_RGB', // geoserver에서 불러올 레이어 주소명
      },
    ]
  },
  {
    name: "안천면 노성리 1163",
    title:'A-3',
    acode: "p_3",
    coordinate: [127.5477, 35.8928],
    indirectland:'true',//간접지
    reservoirarea:'false',//저수구역
    floodcontrolarea:'false',//홍수조절지
    listgroup :[
      {
        title: 'yeongju:YD03_NIR',
        jcode: 'j_254',
        type:'1',// 0: 위성 1: drone
        imgtype: '1', // 0:rgb 1:nir 2:ndvi 3:ndwi
        super:'false', //SuperResolution유무
        years:'2024',  //촬영일 연도
        name:'안천면 노성리 1163_NIR', //화면에 표시할 이름
        coordinate: [127.5477, 35.8928], //이미지의 좌표값
        zoom: 17,
        description: '', // 해당 데이터 설명
        layers: 'yeongju:YD03_NIR', // geoserver에서 불러올 레이어 주소명
      },
      {
        title: 'yeongju:YD03_RGB',
        jcode: 'j_239',
        type:'1',// 0: 위성 1: drone
        imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
        super:'false', //SuperResolution유무
        years:'2024',  //촬영일 연도
        name:'안천면 노성리 1163_RGB', //화면에 표시할 이름
        coordinate: [127.5477, 35.8928], //이미지의 좌표값
        zoom: 17,
        description: '', // 해당 데이터 설명
        layers: 'yeongju:YD03_RGB', // geoserver에서 불러올 레이어 주소명
      },
      {
        title: 'yeongju:YD03_RGB_M3M',
        jcode: 'j_245',
        type:'1',// 0: 위성 1: drone
        imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
        super:'false', //SuperResolution유무
        years:'2024',  //촬영일 연도
        name:'안천면 노성리 1163_RGB_M3M', //화면에 표시할 이름
        coordinate: [127.5477, 35.8928], //이미지의 좌표값
        zoom: 17,
        description: '', // 해당 데이터 설명
        layers: 'yeongju:YD03_RGB', // geoserver에서 불러올 레이어 주소명
      },
    ]
  },
  {
    name: "상전면 월포리 1091",
    title:'A-4',
    acode: "p_4",
    coordinate: [127.4811, 35.8635],
    indirectland:'true',//간접지
    reservoirarea:'true',//저수구역
    floodcontrolarea:'false',//홍수조절지
    listgroup :[
      {
        title: 'yeongju:YD04_NIR',
        jcode: 'j_255',
        type:'1',// 0: 위성 1: drone
        imgtype: '1', // 0:rgb 1:nir 2:ndvi 3:ndwi
        super:'false', //SuperResolution유무
        years:'2024',  //촬영일 연도
        name:'상전면 월포리 1091_NIR', //화면에 표시할 이름
        coordinate: [127.4811, 35.8635], //이미지의 좌표값
        zoom: 17,
        description: '', // 해당 데이터 설명
        layers: 'yeongju:YD04_NIR', // geoserver에서 불러올 레이어 주소명
      },
      {
        title: 'yeongju:YD04_RGB',
        jcode: 'j_242',
        type:'1',// 0: 위성 1: drone
        imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
        super:'false', //SuperResolution유무
        years:'2024',  //촬영일 연도
        name:'상전면 월포리 1091_RGB', //화면에 표시할 이름
        coordinate: [127.4811, 35.8635], //이미지의 좌표값
        zoom: 17,
        description: '', // 해당 데이터 설명
        layers: 'yeongju:YD04_RGB', // geoserver에서 불러올 레이어 주소명
      },
      {
        title: 'yeongju:YD04_RGB_M3M',
        jcode: 'j_246',
        type:'1',// 0: 위성 1: drone
        imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
        super:'false', //SuperResolution유무
        years:'2024',  //촬영일 연도
        name:'상전면 월포리 1091_RGB_M3M', //화면에 표시할 이름
        coordinate: [127.4811, 35.8635], //이미지의 좌표값
        zoom: 17,
        description: '', // 해당 데이터 설명
        layers: 'yeongju:YD04_RGB', // geoserver에서 불러올 레이어 주소명
      },
    ]
  },
  {
    name: "상전면 갈현리 621",
    title:'A-5',
    acode: "p_5",
    coordinate: [127.4758, 35.8241],
    indirectland:'false',//간접지
    reservoirarea:'false',//저수구역
    floodcontrolarea:'true',//홍수조절지
    listgroup :[
      {
        title: 'yeongju:YD05_NIR',
        jcode: 'j_256',
        type:'1',// 0: 위성 1: drone
        imgtype: '1', // 0:rgb 1:nir 2:ndvi 3:ndwi
        super:'false', //SuperResolution유무
        years:'2024',  //촬영일 연도
        name:'상전면 갈현리 621_NIR', //화면에 표시할 이름
        coordinate: [127.4758, 35.8241], //이미지의 좌표값
        zoom: 17,
        description: '', // 해당 데이터 설명
        layers: 'yeongju:YD05_NIR', // geoserver에서 불러올 레이어 주소명
      },
      {
        title: 'yeongju:YD05_RGB',
        jcode: 'j_241',
        type:'1',// 0: 위성 1: drone
        imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
        super:'false', //SuperResolution유무
        years:'2024',  //촬영일 연도
        name:'상전면 갈현리 621_RGB', //화면에 표시할 이름
        coordinate: [127.4758, 35.8241], //이미지의 좌표값
        zoom: 17,
        description: '', // 해당 데이터 설명
        layers: 'yeongju:YD05_RGB', // geoserver에서 불러올 레이어 주소명
      },
      {
        title: 'yeongju:YD05_RGB_M3M',
        jcode: 'j_247',
        type:'1',// 0: 위성 1: drone
        imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
        super:'false', //SuperResolution유무
        years:'2024',  //촬영일 연도
        name:'상전면 갈현리 621_RGB_M3M', //화면에 표시할 이름
        coordinate: [127.4758, 35.8241], //이미지의 좌표값
        zoom: 17,
        description: '', // 해당 데이터 설명
        layers: 'yeongju:YD05_RGB', // geoserver에서 불러올 레이어 주소명
      },
    ]
  },
  {
    name: "상전면 용평리 140",
    title:'A-6',
    acode: "p_6",
    coordinate: [127.4758, 35.8241],
    indirectland:'false',//간접지
    reservoirarea:'false',//저수구역
    floodcontrolarea:'true',//홍수조절지
    listgroup :[
      {
        title: 'yeongju:YD06_NIR',
        jcode: 'j_257',
        type:'1',// 0: 위성 1: drone
        imgtype: '1', // 0:rgb 1:nir 2:ndvi 3:ndwi
        super:'false', //SuperResolution유무
        years:'2024',  //촬영일 연도
        name:'상전면 용평리 140_NIR', //화면에 표시할 이름
        coordinate: [127.4758, 35.8241], //이미지의 좌표값
        zoom: 17,
        description: '', // 해당 데이터 설명
        layers: 'yeongju:YD06_NIR', // geoserver에서 불러올 레이어 주소명
      },
      {
        title: 'yeongju:YD06_RGB',
        jcode: 'j_260',
        type:'1',// 0: 위성 1: drone
        imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
        super:'false', //SuperResolution유무
        years:'2024',  //촬영일 연도
        name:'상전면 용평리 140_RGB', //화면에 표시할 이름
        coordinate: [127.4758, 35.8241], //이미지의 좌표값
        zoom: 17,
        description: '', // 해당 데이터 설명
        layers: 'yeongju:YD06_RGB', // geoserver에서 불러올 레이어 주소명
      },
      {
        title: 'yeongju:YD06_RGB_M3M',
        jcode: 'j_265',
        type:'1',// 0: 위성 1: drone
        imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
        super:'false', //SuperResolution유무
        years:'2024',  //촬영일 연도
        name:'상전면 용평리 140_RGB_M3M', //화면에 표시할 이름
        coordinate: [127.4758, 35.8241], //이미지의 좌표값
        zoom: 17,
        description: '', // 해당 데이터 설명
        layers: 'yeongju:YD06_RGB', // geoserver에서 불러올 레이어 주소명
      },
    ]
  },
  {
    name: "상전면 용평리 1078",
    title:'A-7',
    acode: "p_7",
    coordinate: [127.4758, 35.8241],
    indirectland:'false',//간접지
    reservoirarea:'false',//저수구역
    floodcontrolarea:'true',//홍수조절지
    listgroup :[
      {
        title: 'yeongju:YD07_NIR',
        jcode: 'j_258',
        type:'1',// 0: 위성 1: drone
        imgtype: '1', // 0:rgb 1:nir 2:ndvi 3:ndwi
        super:'false', //SuperResolution유무
        years:'2024',  //촬영일 연도
        name:'상전면 용평리 1078_NIR', //화면에 표시할 이름
        coordinate: [127.4758, 35.8241], //이미지의 좌표값
        zoom: 17,
        description: '', // 해당 데이터 설명
        layers: 'yeongju:YD07_NIR', // geoserver에서 불러올 레이어 주소명
      },
      {
        title: 'yeongju:YD07_RGB',
        jcode: 'j_261',
        type:'1',// 0: 위성 1: drone
        imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
        super:'false', //SuperResolution유무
        years:'2024',  //촬영일 연도
        name:'상전면 용평리 1078_RGB', //화면에 표시할 이름
        coordinate: [127.4758, 35.8241], //이미지의 좌표값
        zoom: 17,
        description: '', // 해당 데이터 설명
        layers: 'yeongju:YD07_RGB', // geoserver에서 불러올 레이어 주소명
      },
      {
        title: 'yeongju:YD07_RGB_M3M',
        jcode: 'j_263',
        type:'1',// 0: 위성 1: drone
        imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
        super:'false', //SuperResolution유무
        years:'2024',  //촬영일 연도
        name:'상전면 용평리 1078_RGB_M3M', //화면에 표시할 이름
        coordinate: [127.4758, 35.8241], //이미지의 좌표값
        zoom: 17,
        description: '', // 해당 데이터 설명
        layers: 'yeongju:YD07_RGB', // geoserver에서 불러올 레이어 주소명
      },
    ]
  },
  {
    name: "안천면 노성리 1505",
    title:'A-8',
    acode: "p_8",
    coordinate: [127.4594, 35.9234],
    indirectland:'true',//간접지
    reservoirarea:'false',//저수구역
    floodcontrolarea:'false',//홍수조절지
    listgroup :[
      {
        title: 'yeongju:YD08_NIR',
        jcode: 'j_259',
        type:'1',// 0: 위성 1: drone
        imgtype: '1', // 0:rgb 1:nir 2:ndvi 3:ndwi
        super:'false', // SuperResolution유무
        years:'2024',  // 촬영일 연도
        name:'안천면 노성리 1505_NIR', // 화면에 표시할 이름
        coordinate: [127.4594, 35.9234], // 이미지의 좌표값
        zoom: 17,
        description: '', // 해당 데이터 설명
        layers: 'yeongju:YD08_NIR', // geoserver에서 불러올 레이어 주소명
      },
      {
        title: 'yeongju:YD08_RGB',
        jcode: 'j_262',
        type:'1',// 0: 위성 1: drone
        imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
        super:'false', //SuperResolution유무
        years:'2024',  //촬영일 연도
        name:'안천면 노성리 1505_RGB', //화면에 표시할 이름
        coordinate: [127.4594, 35.9234], //이미지의 좌표값
        zoom: 17,
        description: '', // 해당 데이터 설명
        layers: 'yeongju:YD08_RGB', // geoserver에서 불러올 레이어 주소명
      },
      {
        title: 'yeongju:YD08_RGB',
        jcode: 'j_264',
        type:'1',// 0: 위성 1: drone
        imgtype: '0', // 0:rgb 1:nir 2:ndvi 3:ndwi
        super:'false', //SuperResolution유무
        years:'2024',  //촬영일 연도
        name:'안천면 노성리 1505_RGB', //화면에 표시할 이름
        coordinate: [127.4594, 35.9234], //이미지의 좌표값
        zoom: 17,
        description: '', // 해당 데이터 설명
        layers: 'yeongju:YD08_RGB', // geoserver에서 불러올 레이어 주소명
      },
    ]
  },
];

const CompareDronePage = ({ DroneTiff }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const images = queryParams.get('images')?.split(',')?.map(decodeURIComponent) || [];
  const mapInstancesRef = useRef([]);
  const [syncEnabled, setSyncEnabled] = useState(false);
  const [masterMapIndex, setMasterMapIndex] = useState(null);

  const fetchMapConfig = async (j_code) => {
    try {
      const response = await fetch(`${API_BASE_URL}/get-xml/${j_code}/`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'application/xml');

      const tileSets = xmlDoc.getElementsByTagName('TileSet');
      const zoomLevels = Array.from(tileSets).map(tileSet => parseInt(tileSet.getAttribute('order'), 10));
      const minZoom = Math.min(...zoomLevels);
      const maxZoom = Math.max(...zoomLevels);

      const srs = xmlDoc.getElementsByTagName('SRS')[0].textContent;
      const boundingBox = xmlDoc.getElementsByTagName('BoundingBox')[0];
      const extents = [
        parseFloat(boundingBox.getAttribute('minx')),
        parseFloat(boundingBox.getAttribute('miny')),
        parseFloat(boundingBox.getAttribute('maxx')),
        parseFloat(boundingBox.getAttribute('maxy')),
      ];

      return { minZoom, maxZoom, extents, srs };
    } catch (err) {
      console.error(err.message);
      return null;
    }
  };

  useEffect(() => {
    const initializeMaps = async () => {
      console.log('Initializing maps with images:', images);
      const newMapInstances = await Promise.all(images.map(async (imageTitle, index) => {
        let tiffData = null;
  
        for (const tiff of DroneTiff) {
          tiffData = tiff.listgroup.find(item => item.title === imageTitle);
          if (tiffData) break;
        }
  
        if (!tiffData || !tiffData.jcode) {
          console.error(`No data or jcode found for image title: ${imageTitle}`);
          return null;
        }
  
        const mapConfig = await fetchMapConfig(tiffData.jcode);
        if (!mapConfig) return null;
  
        console.log(`Map config for jcode ${tiffData.jcode}:`, mapConfig);
  
        const { minZoom, maxZoom, extents, srs } = mapConfig;
        const extentsConverted = transformExtent(extents, srs, 'EPSG:3857');
  
        const tmsSource = new XYZ({
          url: `${API_BASE_URL}/get_v2_image/${tiffData.jcode}/orthophoto/{z}/{x}/{-y}.png`,
          minZoom: minZoom,
          maxZoom: maxZoom,
          tilePixelRatio: 1,
        });
  
        const tmsLayer = new TileLayer({
          source: tmsSource,
        });
  
        const map = new Map({
          target: `map-${index}`,
          layers: [tmsLayer],
          view: new View({
            center: fromLonLat([(extents[0] + extents[2]) / 2, (extents[1] + extents[3]) / 2]),
            zoom: minZoom,
            minZoom: minZoom,
            maxZoom: maxZoom,
            extent: extentsConverted,
          }),
        });
  
        map.getView().fit(extentsConverted);
        return map;
      }));
  
      newMapInstances.forEach((map, index) => {
        console.log(`map-${index}`, document.getElementById(`map-${index}`));
        if (map) map.setTarget(`map-${index}`);
      });
  
      mapInstancesRef.current = newMapInstances;
    };
  
    initializeMaps();
  
    return () => {
      mapInstancesRef.current.forEach((map) => {
        if (map) map.setTarget(null);
      });
    };
  }, [images, DroneTiff]);
  

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


const Btn = styled.div``;




