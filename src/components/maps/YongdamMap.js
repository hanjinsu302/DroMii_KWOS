  import React, { useRef, useState, useEffect } from 'react';
  import styled from 'styled-components';
  //components import
  import Yongdammeuncontrol from '../controls/Yongdammeuncontrol';
  import YongdamMapcontrol from '../controls/YongdamMapcontrol';
  //openlayers
  import Map from 'ol/Map';
  import View from 'ol/View';
  import { Tile as TileLayer } from 'ol/layer';
  import { TileWMS, XYZ, OSM } from 'ol/source';
  import { fromLonLat } from 'ol/proj';
  import {ScaleLine, defaults as defaultControls} from 'ol/control.js';
  import Draw from 'ol/interaction/Draw';
  import Overlay from 'ol/Overlay';
  import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from 'ol/style';
  import { LineString, Polygon } from 'ol/geom';
  import { Vector as VectorSource } from 'ol/source';
  import { Vector as VectorLayer } from 'ol/layer';
  import { getArea, getLength } from 'ol/sphere';
  import { unByKey } from 'ol/Observable';
  import { Feature } from 'ol';
  import Point from 'ol/geom/Point';
  import { Cluster } from 'ol/source';
  import 'ol/ol.css';
  //react-screenshot import
  import html2canvas from "html2canvas";
  import saveAs from "file-saver";
  // img
  import pin from '../../assets/pin.png'

  const geoserverUrl = process.env.REACT_APP_GEOSERVER_URI;

  //k워터 중분류 레이어 임시 데이터
  const layerConfigurations = [
    { name: '전', url: 'http://localhost:8080/geoserver/yeongju/wms', params: { 'LAYERS': 'yeongju:K_water_field' } },
    { name: '답', url: 'http://localhost:8080/geoserver/yeongju/wms', params: { 'LAYERS': 'yeongju:K_water_ricepaddy' } },
    { name: '과수원', url: 'http://localhost:8080/geoserver/yeongju/wms', params: { 'LAYERS': 'yeongju:K_water_orchard' } },
    { name: '목장용지', url: 'http://localhost:8080/geoserver/yeongju/wms', params: { 'LAYERS': 'yeongju:K_water_pasture' } },
    { name: '임야', url: 'http://localhost:8080/geoserver/yeongju/wms', params: { 'LAYERS': 'yeongju:K_water_forest' } },
    { name: '광천지', url: 'http://localhost:8080/geoserver/yeongju/wms', params: { 'LAYERS': 'yeongju:K_water_gwangcheonki' } },
    { name: '대지', url: 'http://localhost:8080/geoserver/yeongju/wms', params: { 'LAYERS': 'yeongju:K_water_earth' } },
    { name: '공장용지', url: 'http://localhost:8080/geoserver/yeongju/wms', params: { 'LAYERS': 'yeongju:K_water_factory' } },
    { name: '학교용지', url: 'http://localhost:8080/geoserver/yeongju/wms', params: { 'LAYERS': 'yeongju:K_water_school' } },
    { name: '주차장, 도로', url: 'http://localhost:8080/geoserver/yeongju/wms', params: { 'LAYERS': 'yeongju:K_water_road' } },
    { name: '주유소', url: 'http://localhost:8080/geoserver/yeongju/wms', params: { 'LAYERS': 'yeongju:K_water_gasstation' } },
    { name: '체육용지', url: 'http://localhost:8080/geoserver/yeongju/wms', params: { 'LAYERS': 'yeongju:K_water_athletic' } },
    { name: '유원지', url: 'http://localhost:8080/geoserver/yeongju/wms', params: { 'LAYERS': 'yeongju:K_water_amusementpark' } },
  ];
  //용담댐 대상지 임시 데이터
  const Area = [
    {
      name: "호계리 306",
      acode: "p_1",
      image:'',
      coordinate: [127.4633, 35.9392],
      description: "간접지",
      indirectLand:'true',//간접지
      reservoirArea:'false',//저수구역
    },
    {
      name: "호계리 516-2",
      acode: "p_2",
      image:'',
      coordinate: [127.4594, 35.9234],
      description: "간접지",
      indirectLand:'true',//간접지
      reservoirArea:'false',//저수구역
    },
    {
      name: "월포리 1091-2",
      acode: "p_3",
      coordinate: [127.4811, 35.8635],
      image:'',
      description: "간접지+저수구역",
      indirectLand:'true',//간접지
      reservoirArea:'true',//저수구역
    },
    {
      name: "노성리 1091-2",
      acode: "p_4",
      coordinate: [127.5484, 35.893],
      image:'',
      description: "간접지+저수구역",
      indirectLand:'true',//간접지
      reservoirArea:'true',//저수구역
    },
    {
      name: "갈현리 1091-2",
      acode: "p_5",
      coordinate: [127.4708, 35.8245],
      image:'',
      description: "간접지+저수구역",
      indirectLand:'true',//간접지
      reservoirArea:'true',//저수구역
    }
  ];





  const YongdamMap = () => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const [mapType, setMapType] = useState('1');
    //레이어 on/off
    const [visibleLayers, setVisibleLayers] = useState({
      wmsLayer1: true,
      wmsLayer2: true,
      wmsLayer3: true,
      clusterLayer: true,
    });
    const [additionalLayers, setAdditionalLayers] = useState(() => {
      const initialState = {};
      layerConfigurations.forEach((layer) => {
        initialState[layer.name] = false;
      });
      return initialState;
    });

    const jinanClusterData = [
      {
        coordinate: [127.5285, 35.945],  // 진안군 안천면 안용로 747의 좌표
        name: 'Jinan Cluster',
        image: 'url/to/image.jpg',  // 필요시 이미지 경로 추가
        description: 'Jinan Cluster description',
        page: 'url/to/page'  // 필요시 페이지 링크 추가
      }
    ];



    const jinanVectorSource = new VectorSource({
      features: jinanClusterData.map(area => new Feature({
        geometry: new Point(fromLonLat(area.coordinate)),
        name: area.name,
        image: area.image,
        description: area.description,
        page: area.page
      }))
    });
    
    const jinanClusterSource = new Cluster({
      distance: 40,
      source: jinanVectorSource
    });
    
    // 새로운 클러스터 레이어 생성
    const jinanClusterLayer = new VectorLayer({
      source: jinanClusterSource,
      style: (feature) => {
        const size = feature.get('features').length;
        return new Style({
          image: new Icon({
            src: pin,  // Replace with the path to your custom image
            scale: 0.4 + Math.min(size / 300, 0.5),  // Adjust scale based on cluster size
            anchor: [0.5, 0.5]
          }),
        });
      }
    });
    



    ///////////////////////////////////////////거리 계산,면적 계산 코드////////////////////////////////////
    const raster = new TileLayer({
      source: new OSM(),
    });

    const source = new VectorSource();
    const vector = new VectorLayer({
      source: source,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33',
          }),
        }),
      }),
      visible: visibleLayers.vector,
    });

    let sketch;
    let helpTooltipElement;
    let helpTooltip;
    let measureTooltipElement;
    let measureTooltip;
    const continuePolygonMsg = 'Click to continue drawing the polygon';
    const continueLineMsg = 'Click to continue drawing the line';

    const pointerMoveHandler = function (evt) {
      if (evt.dragging) {
        return;
      }
      let helpMsg = 'Click to start drawing';

      if (sketch) {
        const geom = sketch.getGeometry();
        if (geom instanceof Polygon) {
          helpMsg = continuePolygonMsg;
        } else if (geom instanceof LineString) {
          helpMsg = continueLineMsg;
        }
      }

      helpTooltipElement.innerHTML = helpMsg;
      helpTooltip.setPosition(evt.coordinate);

      helpTooltipElement.classList.remove('hidden');
    };

    const formatLength = function (line) {
      const length = getLength(line);
      let output;
      if (length > 100) {
        output = Math.round((length / 1000) * 100) / 100 + ' km';
      } else {
        output = Math.round(length * 100) / 100 + ' m';
      }
      return output;
    };

    const formatArea = function (polygon) {
      const area = getArea(polygon);
      let output;
      if (area > 10000) {
        output = Math.round((area / 1000000) * 100) / 100 + ' km²';
      } else {
        output = Math.round(area * 100) / 100 + ' m²';
      }
      return output;
    };

    const createHelpTooltip = () => {
      if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
      }
      helpTooltipElement = document.createElement('div');
      helpTooltipElement.className = 'ol-tooltip hidden';
      helpTooltip = new Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left',
      });
      mapInstance.current.map.addOverlay(helpTooltip);
    };

    const createMeasureTooltip = () => {
      if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
      }
      measureTooltipElement = document.createElement('div');
      measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
      measureTooltip = new Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center',
        stopEvent: false,
        insertFirst: false,
      });
      mapInstance.current.map.addOverlay(measureTooltip);
    };

    const addInteraction = (type) => {
      const draw = new Draw({
        source: source,
        type: type,
        style: new Style({
          fill: new Fill({
            color: 'rgba(255, 125, 5, 0.4)',
          }),
          stroke: new Stroke({
            color: '#FF9900',
            width: 2,
          }),
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({
              color: '#FF9900',
            }),
          }),
        }),
      });
      mapInstance.current.map.addInteraction(draw);

      createMeasureTooltip();
      createHelpTooltip();

      let listener;
      draw.on('drawstart', (evt) => {
        sketch = evt.feature;

        let tooltipCoord = evt.coordinate;

        listener = sketch.getGeometry().on('change', (evt) => {
          const geom = evt.target;
          let output;
          if (geom instanceof Polygon) {
            output = formatArea(geom);
            tooltipCoord = geom.getInteriorPoint().getCoordinates();
          } else if (geom instanceof LineString) {
            output = formatLength(geom);
            tooltipCoord = geom.getLastCoordinate();
          }
          measureTooltipElement.innerHTML = output;
          measureTooltip.setPosition(tooltipCoord);
        });
      });

      draw.on('drawend', () => {
        measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
        measureTooltip.setOffset([0, -7]);
        sketch = null;
        measureTooltipElement = null;
        createMeasureTooltip();
        unByKey(listener);
      });

      mapInstance.current.draw = draw;
    };

    const clearMeasurements = () => {
      source.clear();
      mapInstance.current.map.getOverlays().clear();
    };


    const scaleLineControl = new ScaleLine({
      units: 'metric',
    });
  ///////////////////////////////////지도 생성 코드
    const createMap = () => {
      const osmLayer = new TileLayer({
        source: new OSM(),
      });
  ///vworld 지도
      const vworldLayer = new TileLayer({

        source: new XYZ({
          url: `http://api.vworld.kr/req/wmts/1.0.0/{apikey}/Satellite/{z}/{y}/{x}.jpeg`.replace(
            '{apikey}',
            '9D1DA041-8CBA-3E86-9C6D-90178C0E1CE6'
          ),
        }),
        visible: mapType === '3',
      });
  // 지역 AOI
      const wmsLayer1 = new TileLayer({
        source: new TileWMS({
          url: `${geoserverUrl}/yongdamAOI/wms`,
          params: {
            'LAYERS': 'yongdamAOI:yongdamCommonAOI',
            'TILED': true,
          },
          serverType: 'geoserver',
          transition: 0,
        }),
        visible: visibleLayers.wmsLayer1,
      });
  // 하천 레이어
      const wmsLayer2 = new TileLayer({
        source: new TileWMS({
          url: `${geoserverUrl}/yongdamAOI/wms`,
          params: {
            'LAYERS': 'yongdamAOI:yongdam_waterline',
          },
          serverType: 'geoserver',
          transition: 0,
        }),
        visible: visibleLayers.wmsLayer2,
      });
  // 지적도 레이어
      const wmsLayer3 = new TileLayer({
        source: new TileWMS({
          // url: 'http://localhost:8080/geoserver/yongdam/wms',
          params: {
            'LAYERS': 'yongdam:pdf_all',
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
      //야간 지도 설정
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

      /// 지도위 파노라마 촬영지 클러스터(마커 생성)
      const vectorSources = new VectorSource({
        features: Area.map(area => new Feature({
          geometry: new Point(fromLonLat(area.coordinate)),
          name: area.name,
          image: area.image,
          description: area.description,
          page: area.page
        })) 
      });

      const clusterSource = new Cluster({
        distance: 40,
        source: vectorSources
        
      });
      
      //클러스터 스타일 및 설정 
      const clusterLayer = new VectorLayer({
        source: clusterSource,
        style: (feature) => {
          const size = feature.get('features').length;
          return new Style({
            image: new CircleStyle({
              radius: 22 + Math.min(size / 200, 200),  // 클러스터 크기에 따라 반지름 조정
              fill: new Fill({
                color: 'rgba(5, 45, 255, 0.6)',  // 원형 내부 색상
              }),
              stroke: new Stroke({
                color: '#0E18FF',  // 원형 테두리 색상
                width: 1,
              }),
            }),
            
          });
        },
        visible: visibleLayers.clusterLayer,
      });

      //openlayers 지도 
      const map = new Map({
        controls: defaultControls().extend([scaleLineControl]),
        target: mapRef.current,
        layers: [osmLayer, vworldLayer, wmsLayer1, wmsLayer2, wmsLayer3, clusterLayer,vector, jinanClusterLayer,  ...Object.values(additionalLayersConfig)],
        view: new View({
          center: fromLonLat([127.5256, 35.8848]),
          zoom: 11,
          minZoom: 11.5,
          maxZoom: 21,
        }),
        
      });
      mapInstance.current = { map, layers: { wmsLayer1, wmsLayer2, wmsLayer3, vworldLayer, clusterLayer, jinanClusterLayer,  ...additionalLayersConfig }
    };
    };

    useEffect(() => {
      if (mapRef.current) {
        createMap();
      }
      return () => mapInstance.current?.map.setTarget(null);
    }, [mapType]);

    useEffect(() => {
      if (mapInstance.current) {
        const { wmsLayer1, wmsLayer2, wmsLayer3, clusterLayer } = mapInstance.current.layers;
        wmsLayer1.setVisible(visibleLayers.wmsLayer1);
        wmsLayer2.setVisible(visibleLayers.wmsLayer2);
        wmsLayer3.setVisible(visibleLayers.wmsLayer3);
        clusterLayer.setVisible(visibleLayers.clusterLayer);
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
    //지도 위 거리,면적 측정 버튼 이벤트
    const handleMeasureButtonClick = (type) => {
      if (mapInstance.current.draw) {
        mapInstance.current.map.removeInteraction(mapInstance.current.draw);
      }
      addInteraction(type);
    };


    /////현재 화면 screenshot 코드
    //screenshot을 할 영역 = divRef
    const divRef = useRef(null);
    // screenshot버튼 이벤트
    const handleDownload = async () => {
      if (!divRef.current) return;

      try {
        const div = divRef.current;
        const canvas = await html2canvas(div, { scale: 2 });
        canvas.toBlob((blob) => {
          if (blob !== null) {
            saveAs(blob, "result.png");
          }
        });
      } catch (error) {
        console.error("Error converting div to image:", error);
      }
    };
    //html 요소는 촬영이 되지만 openlayers의 canvas요소는 촬영이 안됨
    

    return (
      <>
      <Container ref={divRef}>
        <Yongdammeuncontrol onLayerToggle={handleAdditionalLayerVisibility} />
        <YongdamMapcontrol onSelectMapType={setMapType} onLayerToggle={handleLayerVisibility} onMeasureDistance={() => handleMeasureButtonClick('LineString')} onMeasureArea={() => handleMeasureButtonClick('Polygon')} onClearMeasurements={clearMeasurements} onCapture= {handleDownload}/>
          <div ref={mapRef} style={{ width: '100%', height: '100vh' }} ></div>
        </Container>
      </>
    );
  };

  export default YongdamMap;

  const Container = styled.div`
  display:flex;
  .ol-tooltip {
          position: relative;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 4px;
          color: white;
          padding: 4px 8px;
          opacity: 0.7;
          white-space: nowrap;
          font-size: 12px;
          cursor: default;
          user-select: none;
        }
        .ol-tooltip-measure {
          opacity: 1;
          font-weight: bold;
        }
        .ol-tooltip-static {
          background-color: #ffcc33;
          color: black;
          border: 1px solid white;
        }
        .ol-tooltip-measure:before,
        .ol-tooltip-static:before {
          border-top: 6px solid rgba(0, 0, 0, 0.5);
          border-right: 6px solid transparent;
          border-left: 6px solid transparent;
          content: "";
          position: absolute;
          bottom: -6px;
          margin-left: -7px;
          left: 50%;
        }
        .ol-tooltip-static:before {
          border-top-color: #ffcc33;
        }
  `

