import React, {useState} from "react";
import Navbar from "./components/Navbar";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import useApplicationData from './hooks/useApplicationData';
import Home from "./pages";
import About from "./pages/about";
import DiscussionBoard from "./pages/DiscussionBoard";
import Plans from "./pages/plans";
import SignUp from "./pages/RegistrationPage";
import EmailForm from "./pages/emailform";
import Watchlist from "./pages/watchlist";
import Stock from "./pages/stock";
import LoginPage from "./pages/login";
import StockListDetailsItem from "./components/component/StockListDetailsItem";
import AboutUsItem from "./components/component/aboutUsItem";
import AboutUs from "./pages/test";
import Blog from "./components/component/blogcomponents/Blog";
import "./styles/app.scss";

function App() {

  const { state, handleViewDetails, navigateToDetailsPage, addtoWatchList, setEmail, setPassword, dispatch } = useApplicationData();

  const [darkMode, setDarkMode] = useState(false);

  
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`App${darkMode ? 'dark-mode' : ''}`}>
      <Router>
        <Navbar dispatch={dispatch}
          state={state} darkMode={darkMode} setDarkMode={setDarkMode} toggleDarkMode={toggleDarkMode}/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/emailform"
            element={<EmailForm />}
          />
          <Route
            path="/discussionboard"
            element={<Blog
            />
            }
          />
          <Route
            path="/watchlist"
            element={
              <Watchlist
                state={state}
                stocks={state.stockData}
                navigateToDetailsPage={navigateToDetailsPage}
                tickerCurrent={state.tickerCurrent}
                handleViewDetails={handleViewDetails}
                addtoWatchList={addtoWatchList}
                darkMode={darkMode} 
                setDarkMode={setDarkMode} 
                toggleDarkMode={toggleDarkMode}
              />
            }
          />
          <Route 
            path="/plans"  
            element={
              <Plans
              />
            }
          />
          <Route
            path="/stock"
            element={
              <Stock
                
                navigateToDetailsPage={navigateToDetailsPage}
                tickerCurrent={state.tickerCurrent}
                handleViewDetails={handleViewDetails}
                addtoWatchList={addtoWatchList}
                darkMode={darkMode} 
                setDarkMode={setDarkMode} 
                toggleDarkMode={toggleDarkMode}
              />
            }
          />
          <Route
            path="/stock/:ticker"
            element={<StockListDetailsItem
              stocks={state.stockData}
              tickerCurrent={state.tickerCurrent}
              navigateToDetailsPage={navigateToDetailsPage}
              addtoWatchList={addtoWatchList} 
              darkMode={darkMode} 
              setDarkMode={setDarkMode} 
              toggleDarkMode={toggleDarkMode}/>
            }
          />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/login"
            element={
              <LoginPage
                dispatch={dispatch}
                state={state}
                email={state.email}
                password={state.password}
                setEmail={setEmail}
                setPassword={setPassword}
              />
            }
          />

          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
