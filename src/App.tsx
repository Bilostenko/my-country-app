import "./App.css";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import { Routes, Route } from "react-router-dom";
import CountryPage from "./components/country_details/CountryPage";

const App = () => {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/country/:name" element={<CountryPage />} />
      </Routes>
    </div>
  );
};

export default App;
