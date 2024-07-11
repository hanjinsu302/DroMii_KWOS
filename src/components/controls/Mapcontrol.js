  import React from 'react';
  import styled from 'styled-components';
  // bootstrap import
  import { ButtonGroup, Dropdown, DropdownButton, OverlayTrigger, Tooltip } from 'react-bootstrap';
  import { Water, DropletFill, MapFill, Ban } from 'react-bootstrap-icons';

  const Mapcontrol = ({ onSelectMapType, onLayerToggle }) => {
    const handleSelect = (eventKey) => {
      onSelectMapType(eventKey);
    };

    return (
      <>
        <MapcontrolContainer>
          <OptionBox style={{ borderRadius: "5px 5px 0px 0px" }}>
            <div className="mb-2">
              <DropdownButton
                as={ButtonGroup}
                key="start"
                id="dropdown-button-drop-start"
                drop="start"
                variant="link"
                title="M"
                onSelect={handleSelect}
              >
                <Dropdown.Item eventKey="1">일반</Dropdown.Item>
                <Dropdown.Item eventKey="2">영상 지도</Dropdown.Item>
                <Dropdown.Item eventKey="3">국토위성 지도</Dropdown.Item>
                <Dropdown.Item eventKey="4">야간지도</Dropdown.Item>
              </DropdownButton>
            </div>
          </OptionBox>
          <OptionBox>
            a
          </OptionBox>
          <OptionBox>
            b
          </OptionBox>
          <OptionBox style={{ borderRadius: "0px 0px 5px 5px" }}>
            c
          </OptionBox>
        </MapcontrolContainer>

  {/* //////////////////////////////지도 벡터 레이어 변경 리모콘(AOI,하천, 하수 처리장)//////////////////////////// */}
        <Layercontrl>
            <OverlayTrigger
              key="left"
              placement="left"
              overlay={
                <Tooltip id={`tooltip-left`}>
                  지역AOI
                </Tooltip>
              }
            >
                <LayerBox style={{ borderRadius: "5px 5px 0px 0px" }} onClick={() => onLayerToggle('wmsLayer1')}>
                  <MapFill/>
                </LayerBox>
            </OverlayTrigger>
            <OverlayTrigger
              key="left"
              placement="left"
              overlay={
                <Tooltip id={`tooltip-left`}>
                  하천
                </Tooltip>
              }
            >
                <LayerBox onClick={() => onLayerToggle('wmsLayer2')}>
                  <Water/>
                </LayerBox>
            </OverlayTrigger>
            <OverlayTrigger
              key="left"
              placement="left"
              overlay={
                <Tooltip id={`tooltip-left`}>
                  하수 처리장
                </Tooltip>
              }
            >
                <LayerBox onClick={() => onLayerToggle('wmsLayer3')}>
                  <DropletFill/>
                </LayerBox>
            </OverlayTrigger>
              <LayerBox>
                <Ban/>
              </LayerBox>
              <LayerBox style={{ borderRadius: "0px 0px 5px 5px" }}>
                <Ban/>
              </LayerBox>
        </Layercontrl>
      </>
    );
  };

  export default Mapcontrol;



  const MapcontrolContainer = styled.div`
    position: absolute;
    z-index:10;
    width: 45px;
    height: 200px;
    right:0px;
    display:flex;
    top: 25px;
    right:20px;
    flex-direction:column;
  `;



  const OptionBox = styled.div`
    width: 45px;
    height: 50px;
    display:flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border:1px solid #d9d9d9;
    color: black;

  
  `;

  const Button = styled.div`
  font-size:0.8vw;
  `;

  const Controls = styled.div`
    width: 50%;
    height: 500px;
    
  `;


  const Layercontrl = styled.div`
  position: absolute;
    z-index:10;
    width: 45px;
    height: 250px;
    
    right:20px;
    top:300px;
    border-radius:5px;
    color: #c3c3c3:
  `;

  const LayerBox = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    background-color:white;
    border:0.5px solid #c3c3c3;
    color: #c3c3c3:

  
  `;