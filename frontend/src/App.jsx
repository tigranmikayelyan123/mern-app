import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Nav from './components/Nav';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Cities from './components/Cities';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const cities = useSelector((state) => state.cities);
  // TODO save cities after reftesh see commented code
  // const {sendRequest: getCities } = useHttp()
  // useEffect(() => {
  //   const auth = localStorage.getItem('userData');
  //   const userId = JSON.parse(auth).userId;
  //   if (userId) {
  //     const handleGetCitiesData = (data) => {
  //       setCities(data.cities);
  //     }
  //     const fetchData = async () => {
  //       await getCities({
  //         url: process.env.REACT_APP_GET_CITIES_URL,
  //       }, handleGetCitiesData)
  //     }
  //     fetchData()
  //   };
  // }, [getCities]);

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route
              path="/"
              element={(
                <div className="search-bar-container">
                  <SearchBar setSearchResults={setSearchResults} />
                  <SearchResults results={searchResults} />
                </div>
)}
            />
            <Route path="/items" element={<Cities cities={cities} />} />
            <Route path="/logout" element={<h1>Logout Component</h1>} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
