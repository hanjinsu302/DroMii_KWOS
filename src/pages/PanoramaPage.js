    import React, { useState, useEffect, useRef } from 'react';
    import styled from 'styled-components';
    // react-photo-sphere-viewer import
    import { ReactPhotoSphereViewer,LensflarePlugin,} from "react-photo-sphere-viewer";
    import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
    import "@photo-sphere-viewer/markers-plugin/index.css";
    // bootstrap import
    import Form from 'react-bootstrap/Form';
    // img import
    import Img from '../assets/img.jpg';
    import ImgA1 from '../assets/A_1.jpg';
    import ImgA2 from '../assets/A_2.jpg';
    import ImgA3 from '../assets/A_3.jpg';
    import ImgB1 from '../assets/B_1.jpg';
    import ImgB2 from '../assets/B_2.jpg';
    import ImgB3 from '../assets/B_3.jpg';
    import Pin from '../assets/pin.png';

    function PanoramaView() {
        const [selectedImage, setSelectedImage] = useState(Img);

        const handleReady = (instance) => {
            const markersPlugs = instance.getPlugin(MarkersPlugin);
            if (!markersPlugs) return;
            console.log(markersPlugs);
            markersPlugs.addEventListener("select-marker", () => {
                console.log("asd");
            });
        };

        const handleChange = (event) => {
            const { value } = event.target;
            let newImage;
            switch (value) {
                case "0":
                    newImage = Img;
                    break;
                case "1":
                    newImage = ImgA1;
                    break;
                case "2":
                    newImage = ImgA2;
                    break;
                case "3":
                    newImage = ImgA3;
                    break;
                case "4":
                    newImage = ImgB1;
                    break;
                case "5":
                    newImage = ImgB2;
                    break;
                case "6":
                    newImage = ImgB3;
                    break;
                default:
                    newImage = Img;
                    break;
            }
            // 새로운 객체를 생성하여 상태를 업데이트
            setSelectedImage({ ...newImage });
        };

        const plugins = [
            [
                MarkersPlugin,
                {
                    markers: [
                        {
                            id: "image",
                            position: { yaw: "1deg", pitch: "1deg" },
                            image: Pin,
                            anchor: "bottom center",
                            size: { width: 32, height: 32 },
                            tooltip: "영주댐 A_1 지역",
                        },
                    ],
                },
            ],
            [
                LensflarePlugin,
                {
                    lensflares: [
                        {
                            id: "sun",
                            position: { yaw: "145deg", pitch: "2deg" },
                            type: 0,
                        },
                    ],
                },
            ],
        ];

        return (
            <>
                <ContronlBox>
                    <Form.Select aria-label="Default select example" onChange={handleChange}>
                        <option value="0">전체 지역</option>
                        <option value="1">ImgA1</option>
                        <option value="2">ImgA2</option>
                        <option value="3">ImgA3</option>
                        <option value="4">ImgB1</option>
                        <option value="5">ImgB2</option>
                        <option value="6">ImgB3</option>
                    </Form.Select>
                </ContronlBox>
                <div className="App">
                    <ReactPhotoSphereViewer
                        src={selectedImage}
                        height={'100vh'}
                        width={"100%"}
                        littlePlanet={true}
                        hideNavbarButton={true}
                        onReady={handleReady}
                        plugins={plugins}
                    />
                </div>
            </>
        );
    }

    export default PanoramaView;

    const ContronlBox = styled.div`
        position: absolute;
        z-index: 1000000;
        width: 250px;
        height: 45px;
        top: 10px;
        left: 30px;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        border-radius: 5px;
    `;
