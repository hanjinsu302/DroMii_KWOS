  import React, { useRef, useState, useEffect } from 'react';
  import styled from 'styled-components';
  //components import
  import Mapcontrol from '../controls/Mapcontrol';
  import YeongjuMeuncontrol from '../controls/YeongjuMeuncontrol';
  //openlayers
  import Map from 'ol/Map';
  import View from 'ol/View';
  import { Tile as TileLayer } from 'ol/layer';
  import { TileWMS, XYZ, OSM } from 'ol/source';
  import { fromLonLat } from 'ol/proj';
  import 'ol/ol.css';
  import {ScaleLine, defaults as defaultControls} from 'ol/control.js';
  // .env import
  const geoserverUrl = process.env.REACT_APP_GEOSERVER_URI;

  const layerConfigurations = [
    { name: '전', url: `${geoserverUrl}/yeongju/wms`, params: { 'LAYERS': 'yeongju:K_water_field' } },
    { name: '답', url: `${geoserverUrl}/yeongju/wms`, params: { 'LAYERS': 'yeongju:K_water_ricepaddy' } },
    { name: '과수원', url: `${geoserverUrl}/yeongju/wms`, params: { 'LAYERS': 'yeongju:K_water_orchard' } },
    { name: '목장용지', url: `${geoserverUrl}/yeongju/wms`, params: { 'LAYERS': 'yeongju:K_water_pasture' } },
    { name: '임야', url: `${geoserverUrl}/yeongju/wms`, params: { 'LAYERS': 'yeongju:K_water_forest' } },
    { name: '광천지', url: `${geoserverUrl}/yeongju/wms`, params: { 'LAYERS': 'yeongju:K_water_gwangcheonki' } },
    { name: '대지', url: `${geoserverUrl}/yeongju/wms`, params: { 'LAYERS': 'yeongju:K_water_earth' } },
    { name: '공장용지', url: `${geoserverUrl}/yeongju/wms`, params: { 'LAYERS': 'yeongju:K_water_factory' } },
    { name: '학교용지', url: `${geoserverUrl}/yeongju/wms`, params: { 'LAYERS': 'yeongju:K_water_school' } },
    { name: '주차장, 도로', url: `${geoserverUrl}/yeongju/wms`, params: { 'LAYERS': 'yeongju:K_water_road' } },
    { name: '주유소', url: `${geoserverUrl}/yeongju/wms`, params: { 'LAYERS': 'yeongju:K_water_gasstation' } },
    { name: '체육용지', url: `${geoserverUrl}/yeongju/wms`, params: { 'LAYERS': 'yeongju:K_water_athletic' } },
    { name: '유원지', url: `${geoserverUrl}/yeongju/wms`, params: { 'LAYERS': 'yeongju:K_water_amusementpark' } },
  ];

  const Yeongjumap = () => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const [mapType, setMapType] = useState('1');
    const [visibleLayers, setVisibleLayers] = useState({
      wmsLayer1: true,
      wmsLayer2: true,
      wmsLayer3: true,
    });
    const [additionalLayers, setAdditionalLayers] = useState(() => {
      const initialState = {};
      layerConfigurations.forEach((layer) => {
        initialState[layer.name] = false;
      });
      return initialState;
    });

    const scaleLineControl = new ScaleLine({
      units: 'metric',
    });

    const createMap = () => {
      const osmLayer = new TileLayer({
        source: new OSM(),
      });

      const vworldLayer = new TileLayer({
        source: new XYZ({
          url: `http://api.vworld.kr/req/wmts/1.0.0/{apikey}/Satellite/{z}/{y}/{x}.jpeg`.replace(
            '{apikey}',
            '9D1DA041-8CBA-3E86-9C6D-90178C0E1CE6'
          ),
        }),
        visible: mapType === '3',
      });

      const wmsLayer1 = new TileLayer({
        source: new TileWMS({
          url: `${geoserverUrl}/yeongju/wms`,
          params: {
            'LAYERS': 'yeongju:yeongju_AOI',
            'TILED': true,
          },
          serverType: 'geoserver',
          transition: 0,
        }),
        visible: visibleLayers.wmsLayer1,
      });

      const wmsLayer2 = new TileLayer({
        source: new TileWMS({
          url: `${geoserverUrl}/yeongju/wms`,
          params: {
            'LAYERS': 'yeongju:yeongju_waterline',
          },
          serverType: 'geoserver',
          transition: 0,
        }),
        visible: visibleLayers.wmsLayer2,
      });

      const wmsLayer3 = new TileLayer({
        source: new TileWMS({
          url: `${geoserverUrl}/yeongju/wms`,
          params: {
            'LAYERS': 'yeongju_sewage_treatment_plant',
          },
          serverType: 'geoserver',
          transition: 0,
        }),
        visible: visibleLayers.wmsLayer3,
      });

      const additionalLayersConfig = layerConfigurations.reduce((acc, layerConfig) => {
        acc[layerConfig.name] = new TileLayer({
          source: new TileWMS({
            url: layerConfig.url,
            params: layerConfig.params,
            serverType: 'geoserver',
            transition: 0,
          }),
          visible: additionalLayers[layerConfig.name],
        });
        return acc;
      }, {});

      osmLayer.on('prerender', (evt) => {
        if (evt.context) {
          const context = evt.context;
          if (mapType === '4') {
            context.filter = 'grayscale(80%) invert(100%)';
          } else {
            context.filter = 'grayscale(0%) invert(0%)';
          }
          context.globalCompositeOperation = 'source-over';
        }
      });

      osmLayer.on('postrender', (evt) => {
        if (evt.context) {
          const context = evt.context;
          context.filter = 'none';
        }
      });

      const map = new Map({
        controls: defaultControls().extend([scaleLineControl]),
        target: mapRef.current,
        layers: [osmLayer, vworldLayer, wmsLayer1, wmsLayer2, wmsLayer3, ...Object.values(additionalLayersConfig)],
        view: new View({
          center: fromLonLat([128.8, 36.8]),
          zoom: 11,
          minZoom: 10,
          maxZoom: 19,
        }),
        
      });

      mapInstance.current = { map, layers: { wmsLayer1, wmsLayer2, wmsLayer3, vworldLayer, ...additionalLayersConfig } };
    };

    useEffect(() => {
      if (mapRef.current) {
        createMap();
      }
      return () => mapInstance.current?.map.setTarget(null);
    }, [mapType]);

    useEffect(() => {
      if (mapInstance.current) {
        const { wmsLayer1, wmsLayer2, wmsLayer3 } = mapInstance.current.layers;
        wmsLayer1.setVisible(visibleLayers.wmsLayer1);
        wmsLayer2.setVisible(visibleLayers.wmsLayer2);
        wmsLayer3.setVisible(visibleLayers.wmsLayer3);
      }
    }, [visibleLayers]);

    useEffect(() => {
      if (mapInstance.current) {
        Object.entries(additionalLayers).forEach(([layerName, visibility]) => {
          if (mapInstance.current.layers[layerName]) {
            mapInstance.current.layers[layerName].setVisible(visibility);
          }
        });
      }
    }, [additionalLayers]);

    const handleLayerVisibility = (layer) => {
      setVisibleLayers((prevState) => ({
        ...prevState,
        [layer]: !prevState[layer],
      }));
    };

    const handleAdditionalLayerVisibility = (layerName) => {
      setAdditionalLayers((prevState) => ({
        ...prevState,
        [layerName]: !prevState[layerName],
      }));
    };

    return (
      <>
        <Container>
          <YeongjuMeuncontrol onLayerToggle={handleAdditionalLayerVisibility} />
          <Mapcontrol onSelectMapType={setMapType} onLayerToggle={handleLayerVisibility} />
          <div ref={mapRef} style={{ width: '100%', height: '100vh' }}></div>
        </Container>
      </>
    );
  };

  export default Yeongjumap;

  const Container = styled.div`
    display:flex;
  `