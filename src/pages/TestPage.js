
// import React, { useEffect, useRef, useState } from 'react';
// import Map from 'ol/Map';
// import View from 'ol/View';
// import TileLayer from 'ol/layer/Tile';
// import XYZ from 'ol/source/XYZ';
// import { fromLonLat } from 'ol/proj';

// const ComparePage = () => {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     const map = new Map({
//       target: 'map',
//       layers: [
//         new TileLayer({
//           source: new XYZ({
//             url: 'http://175.45.204.163/api/yongdam/get-v2image/j_261',
//             //url: 'http://res.dromii.com:3003/jobs/j_270/orthophoto',
//           }),
//         }),
//       ],
//       view: new View({
//         center:fromLonLat([127.501309672, 35.879741568]) ,
//         zoom: 12,
//       }),
//     });

//     mapRef.current = map;

//     return () => {
//       map.setTarget(null);
//     };
//   }, []);

//   return (
//     <div style={{ width: '100%', height: '100vh' }}>
//       <div id="map" style={{ width: '100%', height: '100%' }} />
//     </div>
//   );
// };

// export default ComparePage;



// import React, { useEffect, useRef } from 'react';

// const TestPage = () => {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     const initialize = () => {
//       const options = {
//         zoom: 16,
//         center: { lat: 35.8797, lng: 127.501 },
//         mapTypeId: 'satelliteMap', // 지도 타일을 'satellite'로 설정 (기본 타일 숨기기)
//         disableDefaultUI: true, // 기본 UI 숨기기
//       };

//       const map = new window.google.maps.Map(mapRef.current, options);

//       const bounds = {
//         16: [[55978, 55979], [25761, 25762]],
//         17: [[111957, 111958], [51523, 51524]],
//         18: [[223914, 223916], [103047, 103049]],
//         19: [[447829, 447833], [206094, 206098]],
//         20: [[895658, 895666], [412189, 412197]],
//         21: [[1791316, 1791333], [824378, 824395]],
//         22: [[3582633, 3582666], [1648756, 1648791]],
//         23: [[7165267, 7165332], [3297512, 3297583]],
//       };

//       const imageMapType = new window.google.maps.ImageMapType({
//         getTileUrl: (coord, zoom) => {
//           if (
//             zoom < 16 || zoom > 28 ||
//             bounds[zoom][0][0] > coord.x || coord.x > bounds[zoom][0][1] ||
//             bounds[zoom][1][0] > coord.y || coord.y > bounds[zoom][1][1]
//           ) {
//             return null;
//           }
//           return `http://res.dromii.com:3003/jobs/j_261/orthophoto/${zoom}/${coord.x}/${Math.pow(2, zoom) - coord.y - 1}.png`;
//         },
//         tileSize: new window.google.maps.Size(256, 256),
//       });

//       map.overlayMapTypes.push(imageMapType);

//       // Drawing Manager 추가
//       const drawingManager = new window.google.maps.drawing.DrawingManager({
//         drawingMode: null, // 초기에는 아무 것도 그리지 않도록 설정
//         drawingControl: true,
//         drawingControlOptions: {
//           position: window.google.maps.ControlPosition.TOP_CENTER,
//           drawingModes: [
//             window.google.maps.drawing.OverlayType.POLYLINE, // 거리 측정
//             window.google.maps.drawing.OverlayType.POLYGON, // 면적 측정
//           ],
//         },
//         polylineOptions: {
//           editable: true,
//           strokeColor: '#FF0000',
//           strokeWeight: 2,
//         },
//         polygonOptions: {
//           editable: true,
//           fillColor: '#FF0000',
//           fillOpacity: 0.2,
//           strokeColor: '#FF0000',
//           strokeWeight: 2,
//         },
//       });

//       drawingManager.setMap(map);

//       // 거리 측정 도구 이벤트 리스너
//       window.google.maps.event.addListener(drawingManager, 'overlaycomplete', (event) => {
//         if (event.type === window.google.maps.drawing.OverlayType.POLYLINE) {
//           const path = event.overlay.getPath();
//           let totalDistance = 0;
//           for (let i = 0; i < path.getLength() - 1; i++) {
//             totalDistance += window.google.maps.geometry.spherical.computeDistanceBetween(
//               path.getAt(i),
//               path.getAt(i + 1)
//             );
//           }
//           alert(`Total Distance: ${Math.round(totalDistance)} meters`);
//         } else if (event.type === window.google.maps.drawing.OverlayType.POLYGON) {
//           const path = event.overlay.getPath();
//           const area = window.google.maps.geometry.spherical.computeArea(path);
//           alert(`Total Area: ${Math.round(area)} square meters`);
//         }
//       });
//     };

//     if (!window.google) {
//       const script = document.createElement('script');
//       script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=drawing,geometry'; // YOUR_API_KEY를 실제 키로 교체
//       script.async = true;
//       script.defer = true;
//       script.onload = initialize;
//       document.head.appendChild(script);
//     } else {
//       initialize();
//     }
//   }, []);

//   return <div id="map" ref={mapRef} style={{ width: '100%', height: '100vh' }} />;
// };

// export default TestPage;


import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { Tile as TileLayer } from 'ol/layer';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';

const TestPage = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    // 지도 중심과 초기 줌 설정
    const center = fromLonLat([127.501, 35.8797]);
    const zoom = 16;

    // 타일 레이어 생성 (커스텀 XYZ 타일)
    const tileLayer = new TileLayer({
      source: new XYZ({
        url: 'http://res.dromii.com:3003/jobs/j_261/orthophoto/{z}/{x}/{y}.png',
        tileSize: 256,
        maxZoom: 28,
        attributions: '© Custom Map Data'
      }),
    });

    // 지도 객체 생성
    const map = new Map({
      target: mapRef.current,
      layers: [tileLayer],
      view: new View({
        center,
        zoom,
      }),
    });

    return () => {
      map.setTarget(null);
    };
  }, []);

  return <div id="map" ref={mapRef} style={{ width: '100%', height: '100vh' }} />;
};

export default TestPage;
