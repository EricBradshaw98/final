import React from "react";
import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages";
import About from "./pages/about";
import Blogs from "./pages/blogs";
import SignUp from "./pages/signup";
import Contact from "./pages/contact";
import Homepage from "./pages/homepage";
import Watchlist from "./pages/watchlist";
import Stock from "./pages/stock";
import Login from "./pages/login";
 
function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/home" element={<Homepage />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/stock" element={<Stock />} />
                <Route path="/sign-up"element={<SignUp />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}
 
export default App;
