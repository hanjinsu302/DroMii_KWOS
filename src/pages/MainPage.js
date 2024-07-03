import React, { useState } from 'react';
import styled from 'styled-components';
//components import
import Mainmap from '../components/maps/Mainmap';
import Mapcontrol from '../components/controls/Mapcontrol';
import Meuncontrol from '../components/controls/Meuncontrol';






const MainPage = () => {
  
  
  return (
    <>
      <Mainmap/>
    </>
  );
};

export default MainPage;


const HeaderContainer = styled.div`
  width: 100%;
  height: 60px;
  background-color: #0D6efd;
  display: flex;
  align-items: center;
`;

const MapMod = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 40px;
  background-color: white;
  margin-left: 30px;
  font-size: 1vw;
  cursor: pointer; /* 커서를 포인터로 변경하여 클릭 가능함을 나타냅니다. */
`;

