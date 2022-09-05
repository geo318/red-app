import './assets/css/fonts.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useMemo, useState, useRef } from 'react';
import Welcome from './pages/welcome';
import CoworkersForm from './pages/coworkers-form';
import LaptopForm from './pages/laptop-form';
import List from './pages/list';
import LaptopInfo from './pages/laptop-info';
import Error from './pages/error';
import { PrivateRoutes } from './helpers/privateRoutes';
import { localStore } from './helpers/local-storage';
import { initialValues } from './pages/dataSet/input-data';
import { mobileDevice } from './contexts/mobile-device';

function App() {
  const formData = new FormData()
  const localValues = useMemo(()=> localStore('rdb-input-values'),[])
  const localRoutes = useMemo(()=> localStore('rdb-routes'),[])
  const isMobile = useMemo(()=> window.innerWidth < 700, [])
  const initialRouteValues = {laptop : true, success: true};
  const [protectRoute, setProtectRoute] = useState(localRoutes || initialRouteValues)
  const [values, setValues] = useState(localValues || initialValues)

  useEffect(() => {
    localStore('rdb-input-values', values)
  },[values])

  useEffect(() => {
    localStore('rdb-routes', protectRoute)
  },[protectRoute])
  
  const handleRoute = (route, bool) => {
    setProtectRoute({...protectRoute, [route] : bool})
  }
  const handleChange = (e) => {
    setValues((curr)=> curr ? {...curr, [e.target.name] : e.target.value} : {curr})
  }
  return (
    <Router>
      <div className='main'>
        <mobileDevice.Provider value={{isMobile}}>
        <div className='wrapper'>
          <Routes>                
            <Route exact path="/" element = {<Welcome/>}/>            
            <Route exact path="/form/coworkers" element = {<CoworkersForm handleChange = {handleChange} values = {values} handleRoute={handleRoute}/>}/>
            <Route element = {<PrivateRoutes fallback ="/form/coworkers" condition = {protectRoute?.laptop}/>}>
              <Route exact path="/form/laptop" element = {<LaptopForm fallback='laptop' formData = {formData} handleChange = {handleChange} values = {values} setValues={setValues} handleRoute={handleRoute}/>}/>
            </Route>
            <Route path="/laptop-list/:id" element = {<LaptopInfo/>}/>
            <Route exact path="/laptop-list" element = {<List/>} />
            <Route path="/*" element = {<Error/>} />
          </Routes>
        </div>
        </mobileDevice.Provider>
      </div>
    </Router>
  );
}

export default App;