import { BrowserRouter, Route, Routes } from 'react-router-dom';
//page import
import MainPage from './pages/MainPage.js';
import ComparePage from './pages/ComparePage.js';
import KrpanoViewer from './pages/KrpanoViewer.js';
import YongdamPage from './pages/YongdamPage.js';
import PhotoSphere from './pages/Photospere.js';
import YeongjuPage from './pages/YeongjuPage.js';

//bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import HeatmapMap from './components/maps/Hitmap.js';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/YeongjuPage' element={<YeongjuPage/>}/>
        <Route path='/YongdamPage' element={<YongdamPage/>}/>
        <Route path='/comparepage' element={<ComparePage/>}/>
        <Route path='/krpano' element={<KrpanoViewer/>}/>
        <Route path='/hitmap' element={<HeatmapMap/>}/>
        <Route path='/photosphere' element={<PhotoSphere/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
