import React, { useState, useContext } from 'react';
import styled from 'styled-components';
// bootstrap import
import { Accordion, Button, Modal } from 'react-bootstrap';
// mui import
import { Box, Tab, Switch, Checkbox } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import CompareIcon from '@mui/icons-material/Compare';
import EmergencyShareIcon from '@mui/icons-material/EmergencyShare';
// apexcharts import
import ReactApexChart from 'react-apexcharts';
// .env import
const geoserverUrl = process.env.REACT_APP_GEOSERVER_URI;
//img
// import tag4 from '../../assets/tag4.png'
// import tag5 from '../../assets/tag5.png'
// import tag6 from '../../assets/tag6.png'


const YeongjuMeuncontrol = ({ onLayerToggle }) => {
  
  const layerConfigurations = [
    { 
      name: '전', 
      url: `${geoserverUrl}/yeongju/wms`, 
      params: { 'LAYERS': 'yeongju:K_water_field' } },
    { 
      name: '답', 
      url: `${geoserverUrl}/yeongju/wms`, 
      params: { 'LAYERS': 'yeongju:K_water_ricepaddy' } },
    { 
      name: '과수원', 
      url: `${geoserverUrl}/yeongju/wms`, 
      params: { 'LAYERS': 'yeongju:K_water_orchard' } },
    { 
      name: '목장용지', 
      url: `${geoserverUrl}/yeongju/wms`, 
      params: { 'LAYERS': 'yeongju:K_water_pasture' } },
    { 
      name: '임야', 
      url: `${geoserverUrl}/yeongju/wms`, 
      params: { 'LAYERS': 'yeongju:K_water_forest' } },
    { name: '광천지', url: `${geoserverUrl}/yeongju/wms`, params: { 'LAYERS': 'yeongju:K_water_gwangcheonki' } },
    { name: '대지', url: `${geoserverUrl}/yeongju/wms`, params: { 'LAYERS': 'yeongju:K_water_earth' } },
    { name: '공장용지', url: `${geoserverUrl}/yeongju/wms`, params: { 'LAYERS': 'yeongju:K_water_factory' } },
    { name: '학교용지', url: `${geoserverUrl}/yeongju/wms`, params: { 'LAYERS': 'yeongju:K_water_school' } },
    { name: '주차장, 도로', url: `${geoserverUrl}/yeongju/wms`, params: { 'LAYERS': 'yeongju:K_water_road' } },
    { name: '주유소', url: `${geoserverUrl}/yeongju/wms`, params: { 'LAYERS': 'yeongju:K_water_gasstation' } },
    { name: '체육용지', url: `${geoserverUrl}/yeongju/wms`, params: { 'LAYERS': 'yeongju:K_water_athletic' } },
    { name: '유원지', url: `${geoserverUrl}/yeongju/wms`, params: { 'LAYERS': 'yeongju:K_water_amusementpark' } },
  ];
    
      const layersNDWI = [
        {
            name: 'NDWI(20220509)',
            url: `${geoserverUrl}/cite/wms`,
            params: { 'LAYERS': 'cite:NDWI(20220509)' },
          },
          {
            name: 'NDWI(20220509)',
            url: `${geoserverUrl}/cite/wms`,
            params: { 'LAYERS': 'cite:NDWI(20230509)' },
          },

      ]

      const layersNDVI = [
        {
            name: 'NDVI(20220509)',
            url: `${geoserverUrl}/cite/wms`,
            params: { 'LAYERS': 'cite:NDVI(20220509)' },
          },
          {
            name: 'NDVI(20220509)',
            url: `${geoserverUrl}/cite/wms`,
            params: { 'LAYERS': 'cite:NDVI(20230509)' },
          },
      ]

      const [series, setSeries] = useState([
        {
          name: '강수량 (mm)',
          data: [ 1036, 1493,  1190, 2133, 1401, 987]
        },
        {
          name: '유입량 (백만m³)',
          data: [ 394, 765, 540, 1530, 641, 379]
        }
      ]);

      const [options, setOptions] = useState({
        chart: {
          height: 350,
          type: 'area'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: [
            "2017",
            "2018",
            "2019",
            "2020",
            "2021",
            "2022"
          ]
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          }
        }
      });
     const [show, setShow] = useState(false);
     const [value, setValue] = React.useState('1');

     const [layers, setLayers] = useState(() => {
      const initialState = {};
      layerConfigurations.forEach((layer) => {
        initialState[layer.name] = false;
      });
      return initialState;
    });
  
    const handleChange = (event, layerName) => {
      setLayers((prevState) => ({
        ...prevState,
        [layerName]: event.target.checked,
      }));
      onLayerToggle(layerName);
    };

     const handleTabChange = (event, newValue) => {
       setValue(newValue);
     };



     
    return (
        <>
          <MeunContainer>

        
       
          <Box sx={{ display: 'flex', height: '100vh' ,width:'350px', backgroundColor:'white'}}>
            <TabContext value={value}>
            <Box sx={{ borderRight: 1, borderColor: 'divider', Width: '70px' }}>
              <TabList orientation="vertical" onChange={handleTabChange} aria-label="Vertical tabs example">
                <Tab value="1" style={{ minWidth: '50px' }} icon={<CompareIcon />} />
                <Tab label="토" value="2" style={{minWidth:'50px'}}/>
                <Tab value="3" style={{ minWidth: '50px' }} icon={<EmergencyShareIcon />} />
                <Tab label="수" value="4" style={{minWidth:'50px'}}/>
              </TabList>
          </Box>
          <Box sx={{ flexGrow: 1, p: 3,  overflow:'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' } }>
            <TabPanel value="1" style={{padding:'0px'}}>
              
                  <Accordion style={{ width: '100%' }} alwaysOpen>
                      <Accordion.Item eventKey="0">
                          <Accordion.Header>NDVI</Accordion.Header>
                          <Accordion.Body>
                          <div>
                              {layersNDWI.map((layerConfig) => (
                              <CheckItem key={layerConfig.name}>
                                  <Checkbox
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
                      <Accordion.Item eventKey="1">
                          <Accordion.Header>NDWI</Accordion.Header>
                          <Accordion.Body>
                              <div>
                                  {layersNDVI.map((layerConfig) => (
                                  <CheckItem key={layerConfig.name}>
                                      <Checkbox
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
            </TabPanel>
            <TabPanel value="2" style={{padding:'0px'}}>
              <Accordion style={{ width: '100%' }} alwaysOpen>
                  <Accordion.Item eventKey="0">
                      <Accordion.Header>대분류</Accordion.Header>
                      <Accordion.Body>
                      대분류 7개의 분류 들어갈 예정
                      대분류 7개의 분류 들어갈 예정
                      대분류 7개의 분류 들어갈 예정
                      대분류 7개의 분류 들어갈 예정
                      대분류 7개의 분류 들어갈 예정
                      대분류 7개의 분류 들어갈 예정
                      대분류 7개의 분류 들어갈 예정
                      대분류 7개의 분류 들어갈 예정
                      대분류 7개의 분류 들어갈 예정
                      대분류 7개의 분류 들어갈 예정
                      대분류 7개의 분류 들어갈 예정

                      대분류 7개의 분류 들어갈 예정
                      대분류 7개의 분류 들어갈 예정
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
                  checked={layers[layerConfig.name] || false}
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
            </TabPanel>
            <TabPanel value="3" style={{padding:'0px'}}>
            <Accordion style={{ width: '100%' }} alwaysOpen>
                  <Accordion.Item eventKey="0">
                      <Accordion.Header>낙화암천
                     
                      </Accordion.Header>
                      <Accordion.Body>
                      
                      </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                      <Accordion.Header>내성천상류</Accordion.Header>
                      <Accordion.Body>
                    
                      </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                      <Accordion.Header>봉화하수처리창</Accordion.Header>
                      <Accordion.Body>
                    
                      </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                      <Accordion.Header>두월교</Accordion.Header>
                      <Accordion.Body>
                    
                      </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="4">
                      <Accordion.Header>영주댐</Accordion.Header>
                      <Accordion.Body>
                    
                      </Accordion.Body>
                  </Accordion.Item>
                 
              </Accordion>
            </TabPanel>
            
            

            <TabPanel value="4" style={{padding:'0px'}}>
            <Accordion style={{ width: '100%' }} alwaysOpen>
                  <Accordion.Item eventKey="0">
                      <Accordion.Header>수질 관련 정보</Accordion.Header>
                      <Accordion.Body>
                      <Button variant="primary" onClick={() => setShow(true)}>
                      용담댐 강수량
        </Button>

        <Modal
        size="xl"
        centered
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
          
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
            용담댐 강수량
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div id="chart">
          <ReactApexChart 
            options={options} 
            series={series} 
            type="area" 
            height={350} 
          />
        </div>
        <div id="html-dist"></div>
          </Modal.Body>
        </Modal>
                      </Accordion.Body>
                  </Accordion.Item>
                  
              </Accordion>
            </TabPanel>
          </Box>
      </TabContext>
          </Box>
          </MeunContainer>
        
        </>
    )
}

export default YeongjuMeuncontrol;

const MeunContainer = styled.div`
    
    width: max-contents;
    height: 100%;
    background-color: white;
    display:flex;
`

const CheckItem = styled.div`
    width:100%;
    display:flex;
    font-size:15px;
    margin-top:5px;
    margin-bottom:5px;
    align-items: center;
  `;

