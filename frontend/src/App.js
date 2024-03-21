import React from "react";
import Navbar from "./components/Navbar";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import useApplicationData from './hooks/useApplicationData';
import Home from "./pages";
import About from "./pages/about";
import Blogs from "./pages/blogs";
import SignUp from "./pages/RegistrationPage";
import EmailForm from "./pages/emailform";
import Watchlist from "./pages/watchlist";
import Stock from "./pages/stock";
import LoginPage from "./pages/login";
import StockListDetailsItem from "./components/component/StockListDetailsItem";
import "./styles/app.scss";

function App() {

  const { state, handleViewDetails, navigateToDetailsPage, addtoWatchList, setEmail, setPassword, dispatch } = useApplicationData();


  return (
    <Router>
      <Navbar dispatch={dispatch}
              state={state} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route 
          path="/emailform" 
          element={<EmailForm />}
        />
        <Route path="/blogs" element={<Blogs />} />
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
            />
          }
        />
        <Route
          path="/stock"
          element={
            <Stock
              stocks={state.stockData}
              navigateToDetailsPage={navigateToDetailsPage}
              tickerCurrent={state.tickerCurrent}
              handleViewDetails={handleViewDetails}
              addtoWatchList={addtoWatchList} 
            />
          }
        />
        <Route
          path="/stock/:ticker"
          element={<StockListDetailsItem
            stocks={state.stockData}
            tickerCurrent={state.tickerCurrent}
            navigateToDetailsPage={navigateToDetailsPage}
            addtoWatchList={addtoWatchList}/>
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
  );
}

export default App;
