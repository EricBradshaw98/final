import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import useApi from '../../hooks/useApi';

const WatchListItem = ({ symbol, navigateToDetailsPage, addtoWatchList }) => {
  const [stockData, setStockData] = useState(null);
  const apiEndpoint = `/snapshot/locale/us/markets/stocks/tickers/${symbol}?`;
  const { data, loading, error } = useApi(apiEndpoint);
  const navigate = useNavigate();

  useEffect(() => {
    if (symbol) {
      setStockData(data);
      console.log("Data received for", symbol, ":", data); // Log received data
    }
  }, [data, symbol]);

  const handleViewDetails = () => {
    console.log("View Details for:", symbol);
    // Handle navigation to details page
    navigateToDetailsPage(symbol, navigate);
  };

  const handleAddToWatchlist = () => {
    console.log("Add to Watchlist:", symbol);
    addtoWatchList(symbol);
    window.location.reload();
  };
  

  if (!symbol) {
    return <div>You have no stocks in your watchlist</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="stock-item">
      <div className="header">
        <h2>{symbol}</h2>
        <p>Updated: {new Date(data.ticker.updated / 1000000).toLocaleString()}</p>
      </div>
      <div className="change-info">
        <p>Today's Change Percentage: {data.ticker.todaysChangePerc.toFixed(2)} %</p>
        <p>Today's Change: ${data.ticker.todaysChange.toFixed(2)} </p>
        <p>Open: ${data.ticker.day.o.toFixed(2)}</p>
        <p>High: ${data.ticker.day.h.toFixed(2)}</p>
        <p>Low: ${data.ticker.day.l.toFixed(2)}</p>
        <p>Close: ${data.ticker.day.c.toFixed(2)}</p>
        <p>Volume: {data.ticker.day.v}</p>
      </div>
      {/* Render other stock data as needed */}
      {/* Button to view details */}
      <button onClick={handleViewDetails}>View Details</button>
      <button onClick={handleAddToWatchlist}>Remove from Watchlist</button>
    </div>
  );
};

WatchListItem.propTypes = {
  symbol: PropTypes.string.isRequired, // Prop validation for stock symbol
  navigateToDetailsPage: PropTypes.func.isRequired,
  addtoWatchList: PropTypes.func.isRequired
};

export default WatchListItem;
