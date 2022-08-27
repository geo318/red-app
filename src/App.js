import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='main'>
        <div>hi my app</div>
        <div className='wrapper'>
          <Routes>                
            <Route exact path="/" />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
