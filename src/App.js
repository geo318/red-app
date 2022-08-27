import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/welcome';
import Success from './pages/success';
import CoworkersForm from './pages/coworkers-form';
import LaptopForm from './pages/laptop-form';
import List from './pages/list';
import LaptopInfo from './pages/laptop-info';
import Error from './pages/error';

function App() {
  return (
    <Router>
      <div className='main'>
        <div>hi</div>
        <div className='wrapper'>
          <Routes>                
            <Route exact path="/" element = {<Welcome/>}/>
            <Route exact path="/form/coworkers" element = {<CoworkersForm/>}/>
            <Route exact path="/form/laptop" element = {<LaptopForm/>}/>
            <Route exact path="/form/success" element = {<Success/>}/>
            <Route exact path="/laptop-list/:laptop-id"  element = {<LaptopInfo/>}/>
            <Route exact path="/laptop-list"  element = {<List/>} />
            <Route path="/*" element = {<Error/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
