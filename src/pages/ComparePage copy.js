import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
//openlayers
import Map from 'ol/Map';
import View from 'ol/View';
import 'ol/ol.css';
import { Tile as TileLayer } from 'ol/layer';
import { ScaleLine, defaults as defaultControls } from 'ol/control';
import { fromLonLat } from 'ol/proj';
import { OSM, TileWMS } from 'ol/source';
//bootstrap
import Form from 'react-bootstrap/Form';


  const ComparePage = () => {
    const leftMapRef = useRef(null);
    const rightMapRef = useRef(null);
    const [selectedLeftLayer, setSelectedLeftLayer] = useState('falsecolor');
    const [selectedRightLayer, setSelectedRightLayer] = useState('truecolor');

    useEffect(() => {
      if (!leftMapRef.current || !rightMapRef.current) return;



      const leftScaleLineControl = new ScaleLine({ units: 'metric' });
      const rightScaleLineControl = new ScaleLine({ units: 'metric' });



     const yeongjuCoords = [128.7436, 36.8057];

      const leftView = new View({
        center: fromLonLat(yeongjuCoords), // 초기 좌표값을 영주시로 설정
        zoom: 10.5,
        minZoom: 10.5,
      });

      const rightView = new View({
        center: fromLonLat(yeongjuCoords),//초기 좌표값
        zoom: 10.5,
        minZoom: 10.5,
      });

      const leftMap = new Map({
        controls: defaultControls().extend([leftScaleLineControl]),
        target: leftMapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
            opacity: 0.8,  // 이 레이어의 투명도를 0.8로 설정
        }),
        new TileLayer({
        source: new TileWMS({
        url: 'http://localhost:8080/geoserver/cite/wms',
        params: {
        'SERVICE': 'WMS',
        'VERSION': '1.1.0',
        'REQUEST': 'GetMap',
        'LAYERS': `cite:${selectedLeftLayer}`,
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
      // new TileLayer({
      //   source: new TileWMS({
      //     url: 'http://localhost:8080/geoserver/cite/wms',
      //     params: {
      //       'SERVICE': 'WMS',
      //       'VERSION': '1.1.0',
      //       'REQUEST': 'GetMap',
      //       'LAYERS': 'cite:none',
      //       'STYLES': '',
      //       'FORMAT': 'image/png',
      //       'SRS': 'EPSG:4326',
      //       'BBOX': '128.4999714770943,36.49997778210691,128.99999008634038,37.1250228474229',
      //       'WIDTH': 614,
      //       'HEIGHT': 768
      //     },
      //     serverType: 'geoserver',
      //   }),
        
      // }),

      ],
      view: leftView,
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
        'LAYERS': `cite:${selectedRightLayer}`,
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
        view: rightView,
      });

      const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
          clearTimeout(timeout);
          timeout = setTimeout(() => func.apply(this, args), wait);
        };
      };

      const syncViews = (view1, view2) => {
        const syncCenter = debounce(() => {
          view2.setCenter(view1.getCenter());
        }, 100);

        const syncResolution = debounce(() => {
          view2.setResolution(view1.getResolution());
        }, 100);

        view1.on('change:center', syncCenter);
        view1.on('change:resolution', syncResolution);
      };

      syncViews(leftView, rightView);
      syncViews(rightView, leftView);

      return () => {
      leftMap.setTarget(null);
      rightMap.setTarget(null);
    };

    }, [selectedLeftLayer,selectedRightLayer]);



  const handleleftLayerChange = (event) => {
  setSelectedLeftLayer(event.target.value);
  };
  const handlerightLayerChange = (event) => {
  setSelectedRightLayer(event.target.value);
  };



  return (
  <div style={{ display: 'flex' }}>
    <Bap ref={leftMapRef} style={{ width: '50%', height: '100vh' }}>
      <TitleContainer>
        <TitleBox>
          {selectedLeftLayer}
        </TitleBox>
      </TitleContainer>
      <MapControlContainer>
        <Form.Select aria-label="Default select example" onChange={handleleftLayerChange}>
            <option value="falsecolor(20220509)">falsecolor(20220509)</option>
            <option value="falsecolor(20230509)">falsecolor(20230509)</option>
            <option value="NDVI(20220509)">NDVI(20220509)</option>
            <option value="NDVI(20230509)">NDVI(20230509)</option>
            <option value="NDWI(20220509)">NDWI(20220509)</option>
            <option value="NDWI(20230509)">NDWI(20230509)</option>
            <option value="truecolor(20220509)">truecolor(20220509)</option>
            <option value="truecolor(20230509)">truecolor(20230509)</option>
            <option value="truecolor">truecolor</option>
            <option value="falsecolor">falsecolor</option>
        </Form.Select>
      </MapControlContainer>
    </Bap>
    <Bap ref={rightMapRef} style={{ width: '50%', height: '100vh' }}>
      <TitleContainer>
        <TitleBox>
          {selectedRightLayer}
        </TitleBox>
      </TitleContainer>
      <MapControlContainer>
          <Form.Select aria-label="Default select example" onChange={handlerightLayerChange}>
            <option value="falsecolor(20220509)">falsecolor(20220509)</option>
            <option value="falsecolor(20230509)">falsecolor(20230509)</option>
            <option value="NDVI(20220509)">NDVI(20220509)</option>
            <option value="NDVI(20230509)">NDVI(20230509)</option>
            <option value="NDWI(20220509)">NDWI(20220509)</option>
            <option value="NDWI(20230509)">NDWI(20230509)</option>
            <option value="truecolor(20220509)">truecolor(20220509)</option>
            <option value="truecolor(20230509)">truecolor(20230509)</option>
            <option value="truecolor">truecolor</option>
            <option value="falsecolor">falsecolor</option>
          </Form.Select>
        </MapControlContainer>
    </Bap>
  </div>
  );
  };

  export default ComparePage;

  const Bap = styled.div`
      border: 1px solid white;
  `
  const TitleContainer = styled.div` 
      position: absolute;
      z-index:10;
      width:50%;
      height:100px;
      bottom:0px;
      display:flex;
      align-items: end;
      justify-content: center;
    `

    const TitleBox = styled.div` 
        width:300px;
        height:50px;
        background-color:black;
        border-radius:5px 5px 0px 0px;
        display:flex;
        align-items: center;
        justify-content: center;
        color:white;
    `


    const MapControlContainer = styled.div` 
        position: absolute;
        z-index:10;
        width:250px;
        height:80px; 
        display:flex;
        margin-left:20px;
        align-items: center;
        justify-content: center;

    `

