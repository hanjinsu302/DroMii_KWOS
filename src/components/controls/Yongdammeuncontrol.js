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
  import Accordion from '@mui/material/Accordion';
  import AccordionActions from '@mui/material/AccordionActions';
  import AccordionSummary from '@mui/material/AccordionSummary';
  import AccordionDetails from '@mui/material/AccordionDetails';
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
  import ListItemButton from '@mui/material/ListItemButton';
  import Checkbox from '@mui/material/Checkbox';
  import Button from '@mui/material/Button';
  import { useNavigate } from 'react-router-dom';


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
      name: "상전면 갈현리",
      title:'B-3',
      acode: "p_5",
      coordinate: [127.4811, 35.8635],
      image:'',
      description: "간접지+저수구역",
      indirectLand:'true',//간접지
      reservoirArea:'true',//저수구역
    }
  ];

  // 용담댐 임시 위성사진
  const Tiff = [
    {
      title: 'yongdamAOI:20230422_NIR',
      type: 'nir',
      years:'2023',
      name:'20230422_NIR',
      coordinate: '',
      description: '',
      layers: 'yongdamAOI:20230422_NIR',
    },
    {
      title: 'yongdamAOI:20230422_RGB',
      type: 'rgb',
      years:'2023',
      name:'20230422_RGB',
      coordinate: '',
      description: '',
      layers: 'yongdamAOI:20230422_RGB',
    },
    {
      title: 'yongdamAOI:20230422_NDVI',
      type: 'ndvi',
      years:'2023',
      name:'20230422_NDVI',
      coordinate: '',
      description: '',
      layers: 'yongdamAOI:20230422_NDVI',
    },
    {
      title: 'yongdamAOI:20230422_NDWI',
      type: 'ndwi',
      years:'2023',
      name:'20230422_NDWI',
      coordinate: '',
      description: '',
      layers: 'yongdamAOI:20230422_NDWI',
    },
    {
      title: 'yongdamAOI:20230422_NIR_super',
      type: 'rgb',
      years:'2023',
      name:'20230422_NIR_super',
      coordinate: '',
      description: '',
      layers:'yongdamAOI:20230422_NIR_super',
    },
    {
      title: 'yongdamAOI:20230422_RGB_super',
      type: 'nir',
      years:'2023',
      name:'20230422_RGB_super',
      coordinate: '',
      description: '',
      layers: 'yongdamAOI:20230422_RGB_super',
    },
    {
      title: 'yongdamAOI:20230422_NDVI_super',
      type: 'ndvi',
      years:'2023',
      name:'20230422_NDVI_super',
      coordinate: '',
      description: '',
      layers: 'yongdamAOI:20230422_NDVI_super',
    },
    {
      title: 'yongdamAOI:20230422_NDWI_super',
      type: 'ndwi',
      years:'2023',
      name:'20230422_NDWI_super',
      coordinate: '',
      description: '',
      layers: 'yongdamAOI:20230422_NDWI_super',
    },
    {
      title: 'yongdamAOI:20240610_NIR',
      type: 'nir',
      years:'2024',
      name:'20240610_NIR',
      coordinate: '',
      description: '',
      layers: 'yongdamAOI:20240610_NIR',
    },
    {
      title: 'yongdamAOI:20240610_RGB',
      type: 'rgb',
      years:'2024',
      name:'20240610_RGB',
      coordinate: '',
      description: '',
      layers: 'yongdamAOI:20240610_RGB',
    },
    {
      title: 'yongdamAOI:20240610_NDVI',
      type: 'ndvi',
      years:'2024',
      name:'20240610_NDVI',
      coordinate: '',
      description: '',
      layers: 'yongdamAOI:20240610_NDVI',
    },
    {
      title: 'yongdamAOI:20240610_NDWI',
      type: 'ndwi',
      years:'2024',
      name:'20240610_NDWI',
      coordinate: '',
      description: '',
      layers: 'yongdamAOI:20240610_NDWI',
    },
    {
      title: 'yongdamAOI:20240610_NIR_super',
      type: 'rgb',
      years:'2024',
      name:'20240610_NIR_super',
      coordinate: '',
      description: '',
      layers:'yongdamAOI:20240610_NIR_super',
    },
    {
      title: 'yongdamAOI:20240610_RGB_super',
      type: 'nir',
      years:'2024',
      name:'20240610_RGB_super',
      coordinate: '',
      description: '',
      layers: 'yongdamAOI:20240610_RGB_super',
    },
    {
      title: 'yongdamAOI:20240610_NDVI_super',
      type: 'ndvi',
      years:'2024',
      name:'20240610_NDVI_super',
      coordinate: '',
      description: '',
      layers: 'yongdamAOI:20240610_NDVI_super',
    },
    {
      title: 'yongdamAOI:20240610_NDWI_super',
      type: 'ndwi',
      years:'2024',
      name:'20240610_NDWI_super',
      coordinate: '',
      description: '',
      layers: 'yongdamAOI:20240610_NDWI_super',
    },
  ];


  const Yongdammeuncontrol = ({ onLayerToggle }) => {
        
      
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


      const [checked, setChecked] = useState([]);
      const navigate = useNavigate();


  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleCompare = () => {
    if (checked.length >= 2 && checked.length <= 8) {
      // 선택된 항목을 비교 페이지로 전달
      navigate(`/compare?images=${checked.join(',')}`);
    } else {
      alert('2개에서 8개의 이미지를 선택해주세요.');
    }
  };

  const filterByYear = (year) => {
    return Tiff.filter(item => item.years === year);
  };

  const renderListItems = (items) => {
    return items.map((item, index) => (
      <ListItem key={index} button onClick={handleToggle(item.title)}>
        <Checkbox
          edge="start"
          checked={checked.indexOf(item.title) !== -1}
          tabIndex={-1}
          disableRipple
        />
        <ListItemText primary={item.name} />
      </ListItem>
    ));
  };

  const tiff2023 = filterByYear('2023');
  const tiff2024 = filterByYear('2024');
      


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
                
                          전체지역
                            <Button 
                              variant="contained" 
                              color="primary" 
                              onClick={handleCompare}
                              disabled={checked.length < 2 || checked.length > 8}
                              style={{marginLeft:'105px'}}
                            >
                              비교하기
                            </Button>

                   
                        
                        <Accordion style={{marginTop:"5px"}}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                          >
                            2024년
                          </AccordionSummary>
                          <AccordionDetails>
                            <List>
                              {renderListItems(tiff2024)}
                            </List>
                          </AccordionDetails>
                        </Accordion>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                          >
                            2023년
                          </AccordionSummary>
                          <AccordionDetails>
                            <List>
                              {renderListItems(tiff2023)}
                            </List>
                          </AccordionDetails>
                        </Accordion>
                    </TabPanel>
                  <TabPanel value="2" style={{padding:'0px'}}>
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
                        <ListItemText primary="B-2" secondary="안천면 노성리" />
                      </ListItem>
                      <ListItem style={{padding:"0px"}}>
                        <ListItemAvatar>
                          <Avatar>
                            <FmdGoodIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="B-3" secondary="상전면 갈현리" />
                      </ListItem>
                    </List>
                
                  </TabPanel>
                </Box>
              </TabContext>
            </Box>
          </MeunContainer>
          {/* <ItemBox>
            <ItemName>A-1 | 용담면 호계리 306</ItemName>
            <Items>
              <ItemTitle>위성 사진 (8)</ItemTitle>
              <ItemImg>
                
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
          </ItemsBox> */}

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


      