import './App.css'
import Header from './components/header/Header';
import Main from './components/main/Main';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import CountryDetailsPage from './pages/CountryDetailsPage';

const App = () => {
  return (
    <div className="App">
    <Header />
    <Main />
  </div>
  );
};

export default App;
