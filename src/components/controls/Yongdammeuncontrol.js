  import React, { useState, useContext } from 'react';
  import styled from 'styled-components';
  // bootstrap import

  // mui import
  import { Box, Tab} from '@mui/material';
  import { TabContext, TabList, TabPanel } from '@mui/lab';
  import CompareIcon from '@mui/icons-material/Compare';
  import EmergencyShareIcon from '@mui/icons-material/EmergencyShare';
  import List from '@mui/material/List';
  import ListItem from '@mui/material/ListItem';
  import ListItemText from '@mui/material/ListItemText';
  import ListItemAvatar from '@mui/material/ListItemAvatar';
  import Avatar from '@mui/material/Avatar';
  import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
  import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
  import FmdGoodIcon from '@mui/icons-material/FmdGood';
  // apexcharts import
  // .env import
  const geoserverUrl = process.env.REACT_APP_GEOSERVER_URI;


  // k워터 중분류 임시 데이터
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
  // 용담댐 대상지 임시 데이터
  const Area = [
    {
      name: "호계리 306",
      title:'A-1',
      acode: "p_1",
      image:'',
      coordinate: [127.4633, 35.9392],
      description: "간접지",
      indirectLand:'true',//간접지
      reservoirArea:'false',//저수구역
    },
    {
      name: "호계리 516-2",
      title:'A-2',
      acode: "p_2",
      image:'',
      coordinate: [127.4594, 35.9234],
      description: "간접지",
      indirectLand:'true',//간접지
      reservoirArea:'false',//저수구역
    },
    {
      name: "xx리 xxxx-2",
      title:'B-1',
      acode: "p_3",
      coordinate: [127.4811, 35.8635],
      image:'',
      description: "간접지+저수구역",
      indirectLand:'true',//간접지
      reservoirArea:'true',//저수구역
    },
    {
      name: "xxx리 xxx-x",
      title:'B-2',
      acode: "p_4",
      coordinate: [127.4811, 35.8635],
      image:'',
      description: "간접지+저수구역",
      indirectLand:'true',//간접지
      reservoirArea:'true',//저수구역
    },
    {
      name: "xx리 xxx-x",
      title:'B-3',
      acode: "p_5",
      coordinate: [127.4811, 35.8635],
      image:'',
      description: "간접지+저수구역",
      indirectLand:'true',//간접지
      reservoirArea:'true',//저수구역
    }
  ];


  const Yongdammeuncontrol = ({ onLayerToggle }) => {
        // 용담댐 강수량 차트 표현 임시 데이터
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
        // 차트 크기 및 년도 표시 
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
                          <FmdGoodIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="A-1" secondary="용담면 호계리 306" />
                    </ListItem>
                    <ListItem style={{padding:"0px"}}>
                      <ListItemAvatar>
                        <Avatar>
                          <FmdGoodIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="A-2" secondary="용담면 호계리 516-2" />
                    </ListItem>
                    <ListItem style={{padding:"0px"}}>
                      <ListItemAvatar>
                        <Avatar>
                          <FmdGoodIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="B-1" secondary="상전면 월포리 1091-2" />
                    </ListItem>
                    <ListItem style={{padding:"0px"}}>
                      <ListItemAvatar>
                        <Avatar>
                          <FmdGoodIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="B-2" secondary="xx면 xx리 xxx-x" />
                    </ListItem>
                    <ListItem style={{padding:"0px"}}>
                      <ListItemAvatar>
                        <Avatar>
                          <FmdGoodIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="B-3" secondary="xx면 xx리 xxxx-x" />
                    </ListItem>
                  </List>
                  </TabPanel>
                  <TabPanel value="2" style={{padding:'0px'}}>
                    {/* <Accordion style={{ width: '100%' }} alwaysOpen>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>수질 관련 정보</Accordion.Header>
                        <Accordion.Body>
                          <Button variant="primary" onClick={()=> setShow(true)}>
                            용담댐 강수량
                          </Button>

                          <Modal size="xl" centered show={show} onHide={()=> setShow(false)}
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
                                <ReactApexChart options={options} series={series} type="area" height={350} />
                              </div>
                              <div id="html-dist"></div>
                            </Modal.Body>
                          </Modal>
                        </Accordion.Body>
                      </Accordion.Item>

                    </Accordion> */}
                  </TabPanel>
                </Box>
              </TabContext>
            </Box>
          </MeunContainer>
          <ItemBox>
            <ItemName>A-1 | 용담면 호계리 306</ItemName>
            <Items>
              <ItemTitle>위성 사진 (8)</ItemTitle>
              <ItemImg>
                {/*
                <KeyboardArrowRightIcon /> */}
              </ItemImg>
            </Items>
            <Items style={{backgroundColor:"#1B7DF7", color:"white"}}>
              <ItemTitle>드론 사진 (12)</ItemTitle>
              <ItemImg>
                <KeyboardArrowRightIcon />
              </ItemImg>
            </Items>
          </ItemBox>
          <ItemsBox>
          <ItemName>드론 사진 (12)</ItemName>
            <Items>
              <ItemTitle>2024년 06월</ItemTitle>
              <ItemImg>
                <KeyboardArrowRightIcon />
              </ItemImg>
            </Items>
            <Items>
              <ItemTitle>2024년 04월</ItemTitle>
              <ItemImg>
                <KeyboardArrowDownIcon />
              </ItemImg>
            </Items>
            <DataItems>
              <DataItem>
                NDVI
              </DataItem>
              <DataItem>
                NDWI
              </DataItem>
              <DataItem>
                RGB
              </DataItem>
              <DataItem>
                NIR
              </DataItem>

            </DataItems>
          </ItemsBox>

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

      const ItemBox = styled.div`
        position:absolute;
        width:180px;
        height:250px;
        background-color:white;
        left:355px;
        z-index:10000;
        top:80px;
        border-radius:5px;
      `
      const ItemName = styled.div`
        font-size:13px;
        background-color: #2B7DF7;
        width:100%;
        height:35px;
        display:flex;
        align-items:center;
        padding-left:10px;
        border-radius: 5px 5px 0px 0px;
        color:white;
        font-style: bold;
      `
      const Items = styled.div`
        width:100%;
        height:35px;
        display:flex;
        align-items:center;
      `
      const ItemTitle = styled.div`
        height:100%;
        width:85%;
        display:flex;
        align-items:center;
        padding-left:10px;
        font-size:12px;
      `
      const ItemImg = styled.div`
        display:flex;
        align-items:center;
        justify-contents:center;
      `

      const ItemsBox = styled.div`
        position:absolute;
        width:250px;
        height:350px;
        background-color:white;
        left:540px;
        z-index:10000;
        top:80px;
        border-radius:5px;
        overflow:scroll;
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
        &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
        }  
      `

      const DataItems = styled.div`
        width:100%;
        height:max-contents;
      `;
      const DataItem = styled.div`
        width:100%;
        height:max-contents;
        font-size:12px;
        padding-left:15px;
      `;