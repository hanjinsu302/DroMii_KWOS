import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
//openlayers 
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM, TileWMS } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import {ScaleLine, defaults as defaultControls} from 'ol/control.js';
//bootstrap
import Accordion from 'react-bootstrap/Accordion';
//mui
import Switch from '@mui/material/Switch';



const layerConfigurations = [
  {
    name: '전',
    url: 'http://localhost:8080/geoserver/yeongju/wms',
    params: { 'LAYERS': 'yeongju:K_water_field' },
  },
  {
    name: '답',
    url: 'http://localhost:8080/geoserver/yeongju/wms',
    params: { 'LAYERS': 'yeongju:K_water_ricepaddy' },
  },
  {
    name: '과수원',
    url: 'http://localhost:8080/geoserver/yeongju/wms',
    params: { 'LAYERS': 'yeongju:K_water_orchard' },
  },
  {
    name: '목장용지',
    url: 'http://localhost:8080/geoserver/yeongju/wms',
    params: { 'LAYERS': 'yeongju:K_water_pasture' },
  },
  {
    name: '임야',
    url: 'http://localhost:8080/geoserver/yeongju/wms',
    params: { 'LAYERS': 'yeongju:K_water_forest' },
  },{
    name: '광천지',
    url: 'http://localhost:8080/geoserver/yeongju/wms',
    params: { 'LAYERS': 'yeongju:K_water_gwangcheonki' },
  },
  {
    name: '대지',
    url: 'http://localhost:8080/geoserver/yeongju/wms',
    params: { 'LAYERS': 'yeongju:K_water_earth' },
  },
  {
    name: '공장용지',
    url: 'http://localhost:8080/geoserver/yeongju/wms',
    params: { 'LAYERS': 'yeongju:K_water_factory' },
  },
  {
    name: '학교용지',
    url: 'http://localhost:8080/geoserver/yeongju/wms',
    params: { 'LAYERS': 'yeongju:K_water_school' },
  },
  {
    name: '주차장, 도로',
    url: 'http://localhost:8080/geoserver/yeongju/wms',
    params: { 'LAYERS': 'yeongju:K_water_road' },
  },
  {
    name: '주유소',
    url: 'http://localhost:8080/geoserver/yeongju/wms',
    params: { 'LAYERS': 'yeongju:K_water_gasstation' },
  },
  {
    name: '체육용지',
    url: 'http://localhost:8080/geoserver/yeongju/wms',
    params: { 'LAYERS': 'yeongju:K_water_athletic' },
  },
  {
    name: '유원지',
    url: 'http://localhost:8080/geoserver/yeongju/wms',
    params: { 'LAYERS': 'yeongju:K_water_amusementpark' },
  },
  
];

const MyMap = () => {
  const mapRef = useRef();
  const mapInstance = useRef(null);
  const [layers, setLayers] = useState({});
  
  // 지도 거리 알려주는 플러그인
  const scaleLineControl = new ScaleLine({
    units: 'metric',
  });

  const toggleLayerVisibility = (layerName) => {
    const layer = layers[layerName];
    if (layer) {
      layer.setVisible(!layer.getVisible());
      setLayers({ ...layers });
    }
  };

  const handleChange = (event, layerName) => {
    toggleLayerVisibility(layerName);
  };

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      const initialLayers = layerConfigurations.reduce((acc, layerConfig) => {
        const layer = new TileLayer({
          source: new TileWMS({
            url: layerConfig.url,
            params: layerConfig.params,
            serverType: 'geoserver',
            transition: 0,
          }),
          visible: false,
        });
        acc[layerConfig.name] = layer;
        return acc;
      }, {});

      mapInstance.current = new Map({
        controls: defaultControls().extend([scaleLineControl]),
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          ...Object.values(initialLayers),
        ],
        view: new View({
          center: fromLonLat([128.8, 36.8]),
          zoom: 11,
          minZoom: 10,
          maxZoom: 19,
        }),
      });

      setLayers(initialLayers);
    }
  }, [mapRef]);

  return (
    <MapBox>
      <Blcok></Blcok>
      <ControlBox>
        <Accordion style={{ width: '100%' }} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>대분류</Accordion.Header>
            <Accordion.Body>
              대분류 7개의 분류 들어갈 예정
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>중분류</Accordion.Header>
            <Accordion.Body>
              중분류 22개의 분류 들어갈 예정
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>K-워터 중분류</Accordion.Header>
            <Accordion.Body>
              <div>
                {layerConfigurations.map((layerConfig) => (
                  <CheckItem key={layerConfig.name}>
                    <Switch
                      checked={layers[layerConfig.name]?.getVisible() || false}
                      onChange={(event) => handleChange(event, layerConfig.name)}
                      inputProps={{ 'aria-label': layerConfig.name }}
                    />
                    <label htmlFor={layerConfig.name}>{layerConfig.name}</label>
                  </CheckItem>
                ))}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </ControlBox>
      <div ref={mapRef} style={{ width: '100%', height: '100vh' }}></div>
    </MapBox>
  );
};

export default MyMap;

  const Blcok = styled.div`
    width:50px;
    height:100vh;
  `;
  const MapBox = styled.div`
    width:100%;
    hight:100vh;
    display:flex;
    align-items: center;
    justify-content: center;
  `;
  const ControlBox = styled.div`
    width:360px;
    height:100vh;
    background-color:white;
    display:flex;
    justify-content: center;
    padding:10px;
    font-size:15px;
  `;


  const Control = styled.div`
    background-color: white;
    display: flex;
    border-radius: 5px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
  `;

  const CheckItem = styled.div`
    width:100%;
    display:flex;
    font-size:15px;
    margin-top:5px;
    margin-bottom:5px;
    align-items: center;
  `;
