import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Welcome from './pages/welcome';
import Success from './pages/success';
import CoworkersForm from './pages/coworkers-form';
import LaptopForm from './pages/laptop-form';
import List from './pages/list';
import LaptopInfo from './pages/laptop-info';
import Error from './pages/error';
import { PrivateRoutes } from './helpers/privateRoutes';

function App() {
  const [errors, setErrors] = useState(true)
  const [values, setValues] = useState({
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
  })

  const handleChange = (e) => {
    setValues({...values, [e.target.name] : e.target.value})
  }

  console.log(values)
  return (
    <Router>
      <div className='main'>
        <div>hi</div>
        <div className='wrapper'>
          <Routes>                
            <Route exact path="/" element = {<Welcome/>}/>            
            <Route exact path="/form/coworkers" element = {<CoworkersForm errors = {errors} setErrors = {setErrors} handleChange = {handleChange} values = {values} />}/>
            <Route element = {<PrivateRoutes fallback ="/form/coworkers" condition = {errors}/>}>
              <Route exact path="/form/laptop" element = {<LaptopForm errors = {errors} setErrors = {setErrors} handleChange = {handleChange} values = {values}/>}/>
              <Route exact path="/form/success" element = {<Success/>}/>
            </Route>
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