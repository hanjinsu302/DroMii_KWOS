
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



import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import { get as getProjection } from 'ol/proj';
import TileGrid from 'ol/tilegrid/TileGrid';

const TestPage = () => {
  const mapRef = useRef(null); // 지도 DOM 엘리먼트 참조

  useEffect(() => {
    const initialize = () => {
      const projection = getProjection('EPSG:3857'); // 사용하고자 하는 투영법 설정
      const extent = projection.getExtent();
      const tileGrid = new TileGrid({
        extent,
        resolutions: [
          // 여기에 각 줌 레벨에 대한 해상도 값을 추가
          78271.51696402048, 39135.75848201024, 19567.87924100512,
          9783.93962050256, 4891.96981025128, 2445.98490512564,
          1222.99245256282, 611.49622628141, 305.748113140705,
          152.8740565703525, 76.43702828517625, 38.21851414258813,
          19.109257071294063, 9.554628535647032, 4.777314267823516,
          2.388657133911758, 1.194328566955879, 0.5971642834779395,
          0.29858214173896974, 0.14929107086948487, 0.07464553543474244,
          0.03732276771737122, 0.01866138385868561, 0.009330691929342805
        ],
        tileSize: 256
      });

      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new XYZ({
              url: `http://res.dromii.com:3003/jobs/j_261/orthophoto/{z}/{x}/{y}.png`,
              tileGrid: tileGrid, // 타일 그리드를 설정
              minZoom: 16,
              maxZoom: 23
            })
          })
        ],
        view: new View({
          center: fromLonLat([127.501, 35.8797]), // 지도 중심 설정
          zoom: 16, // 초기 줌 레벨 설정
          projection: 'EPSG:3857' // EPSG:3857 투영법을 사용
        })
      });
    };

    initialize(); // OpenLayers 초기화
  }, []);

  return <div id="map" ref={mapRef} style={{ width: '100%', height: '100vh' }} />;
};

export default TestPage;
