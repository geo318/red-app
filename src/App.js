import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/welcome';
import Success from './pages/success';
import CoworkersForm from './pages/coworkers-form';
import LaptopForm from './pages/laptop-form';
import List from './pages/list';
import LaptopInfo from './pages/laptop-info';
import Error from './pages/error';
import { useState } from 'react';

function App() {
  const [values, setValues] = useState({
    name : '',
    surname: '',
    team : '',
    position: '',
    email : '',
    phone : '',
    photo : '',
    laptop_name: '',
    laptop_brand : '',
    cpu: '',
    cpu_core : '',
    cpu_thread : '',
    ram: '',
    storage_type : '',
    purchase_data : '',
    price : '',
    condition : '',
  })

  const laptopInputs = [{
    
  }]

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
            <Route exact path="/form/coworkers" element = {<CoworkersForm handleChange = {handleChange} values = {values} setValues = {setValues} />}/>
            <Route exact path="/form/laptop" element = {<LaptopForm/>}/>
            <Route exact path="/form/success" element = {<Success/>}/>
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
