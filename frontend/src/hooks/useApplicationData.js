import { useReducer, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const apiKey = '5zppMBtonCBY1SJ42kijFfL2V7co5_MN';
const symbol = 'AAPL';
const baseUrl = 'https://api.polygon.io/v1';

const url = `${baseUrl}/open-close/${symbol}/2023-01-09?adjusted=true&apiKey=${apiKey}`;

const initialState = {
  stockData: [],
  darkMode: false,
  tickerCurrent: null
};

const ACTIONS = {
  SET_STOCK_DATA: "SET_STOCK_DATA",
  TOGGLE_DARK_MODE: "TOGGLE_DARK_MODE",
  SET_CURRENT_TICKER: "SET_CURRENT_TICKER"
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_STOCK_DATA:
      return { ...state, stockData: action.payload };
    case ACTIONS.SET_CURRENT_TICKER: // Updated action type
      return { ...state, tickerCurrent: action.payload }; // Updated action type
    case ACTIONS.TOGGLE_DARK_MODE:
      return { ...state, darkMode: !state.darkMode };
    default:
      return state;
  }
};


const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [darkMode, setDarkMode] = useState(false);


  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        dispatch({ type: ACTIONS.SET_STOCK_DATA, payload: data });
      })
      .catch((error) => {
        console.error("Error fetching stocks:", error);
      });
  }, []);

  const toggleDarkMode = () => {
    dispatch({ type: ACTIONS.TOGGLE_DARK_MODE });
  };

  const navigateToDetailsPage = (ticker, navigate) => {
    console.log("Navigating to details page with ticker:", ticker);
    dispatch({ type: ACTIONS.SET_CURRENT_TICKER, payload: ticker });

    // Use navigate passed as an argument
    navigate(`/stock/${ticker}`);
  };



  return {
    state,
    darkMode,
    setDarkMode,
    toggleDarkMode,
    navigateToDetailsPage
  };
};

export default useApplicationData;
