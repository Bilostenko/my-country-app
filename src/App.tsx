import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import CountryDetailsPage from './pages/CountryDetailsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        {/* <Route path="/country/:id" element={<CountryDetailsPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
