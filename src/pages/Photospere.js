
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
import React from 'react';
import img from '../assets/Component.png';

const PhotoSphere =() => {
  return (
    <>
      <ReactPhotoSphereViewer src={img} height={'100vh'} width={"100%"}></ReactPhotoSphereViewer>
    </>
  );
}

export default PhotoSphere;