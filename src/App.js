import './assets/css/fonts.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import Welcome from './pages/welcome';
import Success from './pages/success';
import CoworkersForm from './pages/coworkers-form';
import LaptopForm from './pages/laptop-form';
import List from './pages/list';
import LaptopInfo from './pages/laptop-info';
import Error from './pages/error';
import { PrivateRoutes } from './helpers/privateRoutes';
import { localStore } from './helpers/local-storage';

function App() {
  const formData = new FormData()
  const localValues = useMemo(()=> localStore('rdb-input-values'),[])
  const localRoutes = useMemo(()=> localStore('rdb-routes'),[])
  const initialValues = {
    name : '',
    surname: '',
    team_id : '',
    position_id: '',
    email : '',
    phone_number : '',
    laptop_image : '',
    laptop_name: '',
    laptop_brand_id : '',
    laptop_cpu: '',
    laptop_cpu_cores : '',
    laptop_cpu_threads : '',
    laptop_ram: '',
    laptop_hard_drive_type : '',
    laptop_purchase_date : '',
    laptop_price : '',
    laptop_state : '',
    token : '7a56e20944c948f616f709a5a5734f42',
  }
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
        <div className='wrapper'>
          <Routes>                
            <Route exact path="/" element = {<Welcome/>}/>            
            <Route exact path="/form/coworkers" element = {<CoworkersForm handleChange = {handleChange} values = {values} handleRoute={handleRoute}/>}/>
            <Route element = {<PrivateRoutes fallback ="/form/coworkers" condition = {protectRoute?.laptop}/>}>
              <Route exact path="/form/laptop" element = {<LaptopForm fallback='laptop' formData = {formData} handleChange = {handleChange} values = {values} handleRoute={handleRoute}/>}/>
            </Route>
            {/* <Route element = {<PrivateRoutes fallback ="/form/laptop" condition = {protectRoute?.success}/>}>
              <Route exact path="/form/success" element = {<Success/>}/>
            </Route> */}
            <Route path="/laptop-list/:laptop-id"  element = {<LaptopInfo/>}/>
            <Route exact path="/laptop-list"  element = {<List/>} />
            <Route path="/*" element = {<Error/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;