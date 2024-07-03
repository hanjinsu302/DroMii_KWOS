
import React, { useRef, useEffect } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import { Tile as TileLayer } from 'ol/layer';
import { OSM, TileWMS } from 'ol/source';
import { ScaleLine, defaults as defaultControls } from 'ol/control';
import { Style} from 'ol/style';
import styled from 'styled-components';



const SynchronizedMaps = () => {
  const leftMapRef = useRef();
  const rightMapRef = useRef();
  const leftMapInstance = useRef();
  const rightMapInstance = useRef();

  useEffect(() => {
    if (!leftMapRef.current || !rightMapRef.current) return;

    const leftScaleLineControl = new ScaleLine({ units: 'metric' });
    const rightScaleLineControl = new ScaleLine({ units: 'metric' });

    const center = [14313084.058144642,4380298.496448208,14360045.757281872,4451987.287811306]; // BBOX 중심 좌표
    const zoom = 10; // 적절한 초기 줌 레벨 설정

    const leftMap = new Map({
      controls: defaultControls().extend([leftScaleLineControl]),
      target: leftMapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new TileLayer({
          source: new TileWMS({
            url: 'http://localhost:8080/geoserver/cite/wms',
            params: {
              'SERVICE': 'WMS',
              'VERSION': '1.1.0',
              'REQUEST': 'GetMap',
              'LAYERS': 'cite:falsecolor',
              'STYLES': '',
              'FORMAT': 'image/png',
              'SRS': 'EPSG:4326',
              'BBOX': '128.57662172318797,36.57692485751569,128.9984858442199,37.092351951001156',
              'WIDTH': 628,
              'HEIGHT': 768
            },
            serverType: 'geoserver',
          }),
        }),
      ],
      view: new View({ center, zoom, minZoom: 2, maxZoom: 18, zoomFactor: 2 }),
    });
    
    const rightMap = new Map({
      controls: defaultControls().extend([rightScaleLineControl]),
      target: rightMapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new TileLayer({
          source: new TileWMS({
            url: 'http://localhost:8080/geoserver/cite/wms',
            params: {
              'SERVICE': 'WMS',
              'VERSION': '1.1.0',
              'REQUEST': 'GetMap',
              'LAYERS': 'cite:NDVI',
              'STYLES': '',
              'FORMAT': 'image/png',
              'SRS': 'EPSG:4326',
              'BBOX': '128.57662172318797,36.57692485751569,128.9984858442199,37.092351951001156',
              'WIDTH': 628,
              'HEIGHT': 768
            },
            serverType: 'geoserver',
          }),
        }),
      ],
      view: new View({ center, zoom, minZoom: 2, maxZoom: 18, zoomFactor: 2 }),
    });
    
    const synchronizeMaps = (event) => {
      const view = event.target;
      const center = view.getCenter();
      const zoom = view.getZoom();
      rightMap.getView().setCenter(center);
      rightMap.getView().setZoom(zoom);
    };

    leftMap.getView().on('change:center', synchronizeMaps);
    leftMap.getView().on('change:resolution', synchronizeMaps);

    const synchronizeMapsReverse = (event) => {
      const view = event.target;
      const center = view.getCenter();
      const zoom = view.getZoom();
      leftMap.getView().setCenter(center);
      leftMap.getView().setZoom(zoom);
    };

    rightMap.getView().on('change:center', synchronizeMapsReverse);
    rightMap.getView().on('change:resolution', synchronizeMapsReverse);

    // 맵 인스턴스를 useRef에 저장합니다.
    leftMapInstance.current = leftMap;
    rightMapInstance.current = rightMap;

    // 컴포넌트 언마운트 시 맵 인스턴스 정리
    return () => {
      leftMap.setTarget(null);
      rightMap.setTarget(null);
    };
  }, []); // 빈 배열을 의존성 배열로 설정

  return (
    <Container>
      <div ref={leftMapRef} style={{ width: '50%', height: '100%', position: 'relative' }}>
        <ButtonBox>A</ButtonBox>
      </div>
      <div ref={rightMapRef} style={{ width: '50%', height: '100%', position: 'relative' }}>
        <ButtonBox>B</ButtonBox>
      </div>
    </Container>
  );
};


export default SynchronizedMaps;



const Container = styled.div`
display: flex;
width: 100%;
height: 100vh;
`;

const ButtonBox = styled.div`
  position: absolute;
  z-index:10;
  width: 1.5em;
  height: 120px;
  background-color: green;
  top: 100px;
  margin-left: 8px;
`

