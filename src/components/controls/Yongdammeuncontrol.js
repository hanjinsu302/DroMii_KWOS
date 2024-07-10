import React, { useState, useContext } from 'react';
import styled from 'styled-components';
//bootstrap
import { Accordion, Button, Modal } from 'react-bootstrap';
//mui
import { Box, Tab, Switch, Checkbox } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import CompareIcon from '@mui/icons-material/Compare';
import EmergencyShareIcon from '@mui/icons-material/EmergencyShare';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
//apexcharts
import ReactApexChart from 'react-apexcharts';
const geoserverUrl = process.env.REACT_APP_GEOSERVER_URI;


const Yongdammeuncontrol = ({ onLayerToggle }) => {
  
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
                <Tab value="2" style={{ minWidth: '50px' }} icon={<EmergencyShareIcon />} />
              </TabList>
          </Box>
          <Box sx={{ flexGrow: 1, p: 3,  overflow:'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' } }>
            <TabPanel value="1" style={{padding:'0px'}}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem style={{padding:"0px"}}>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="A-1" secondary="용담면 호계리 306" />
      </ListItem>
      <ListItem style={{padding:"0px"}}>
        <ListItemAvatar>
          <Avatar>
            <WorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="A-2" secondary="용담면 호계리 516-2" />
      </ListItem>
      <ListItem style={{padding:"0px"}}>
        <ListItemAvatar>
          <Avatar>
            <BeachAccessIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="B-1" secondary="상전면 월포리 1091-2" />
      </ListItem>
    </List>
              
                  
            </TabPanel>
           
            <TabPanel value="2" style={{padding:'0px'}}>
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

export default Yongdammeuncontrol;

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

