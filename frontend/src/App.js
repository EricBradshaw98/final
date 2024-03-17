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
import SignUp from "./pages/signup";
import Contact from "./pages/contact";
import Homepage from "./pages/homepage";
import Watchlist from "./pages/watchlist";
import Stock from "./pages/stock";
import LoginPage from "./pages/login";

function App() {
  console.log("App.js");

  const { state } = useApplicationData();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/contact"
          element={<Contact />}
        />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/stock" element={<Stock stocks={state.stockData} />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
