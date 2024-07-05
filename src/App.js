import { BrowserRouter, Route, Routes } from 'react-router-dom';
//page import
import MainPage from './pages/MainPage';
import ComparePage from './pages/ComparePage';
import KrpanoViewer from './pages/KrpanoViewer';
import MyMap from './pages/TestMap';
//bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import HeatmapMap from './components/maps/Hitmap';
import MapPage from './pages/MapPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/Mappage' element={<MapPage/>}/>
        <Route path='/testmap' element={<MyMap/>}/>
        <Route path='/comparepage' element={<ComparePage/>}/>
        <Route path='/krpano' element={<KrpanoViewer/>}/>
        <Route path='/hitmap' element={<HeatmapMap/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
