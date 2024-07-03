import { BrowserRouter, Route, Routes } from 'react-router-dom';
//page import
import MainPage from './pages/MainPage';
import ComparePage from './pages/ComparePage';
import KrpanoViewer from './pages/KrpanoViewer';
import MyMap from './pages/TestMap';
//bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/testmap' element={<MyMap/>}/>
        <Route path='/comparepage' element={<ComparePage/>}/>
        <Route path='/krpano' element={<KrpanoViewer/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
