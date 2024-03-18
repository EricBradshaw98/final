import React from "react";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const StockListItem = ({ stock, onViewDetails, navigateToDetailsPage }) => {
  // Destructuring the stock object
  const { ticker, todaysChangePerc, todaysChange, updated, day, min, prevDay } = stock;
  const navigate = useNavigate();

  const handleViewDetails = (ticker) => {
    console.log("Ticker:", ticker);
    navigateToDetailsPage(ticker, navigate);
  };
 

  return (
    <div className="stock-item">
      <div className="header">
        <h2>{ticker}</h2>
        <p>Updated: {new Date(updated / 1000000).toLocaleString()}</p>
      </div>
      <div className="change-info">
        <p>Today's Change Percentage: {todaysChangePerc.toFixed(2)}%</p>
        <p>Today's Change: ${todaysChange.toFixed(2)}</p>
      </div>
      <div className="day-info">
        <h3>Day Info:</h3>
        <p>Open: ${day.o.toFixed(2)}</p>
        <p>High: ${day.h.toFixed(2)}</p>
        <p>Low: ${day.l.toFixed(2)}</p>
        <p>Close: ${day.c.toFixed(2)}</p>
        <p>Volume: {day.v}</p>
        <p>Volume Weighted: ${day.vw.toFixed(2)}</p>
      </div>
      <div className="minimum-info">
        <h3>Minimum Info:</h3>
        <p>Average Volume: {min.av}</p>
        <p>Timestamp: {new Date(min.t).toLocaleString()}</p>
        <p>Number of Trades: {min.n}</p>
        <p>Open: ${min.o.toFixed(2)}</p>
        <p>High: ${min.h.toFixed(2)}</p>
        <p>Low: ${min.l.toFixed(2)}</p>
        <p>Close: ${min.c.toFixed(2)}</p>
        <p>Volume: {min.v}</p>
        <p>Volume Weighted: {min.vw.toFixed(2)}</p>
      </div>
      <div className="previous-day-info">
        <h3>Previous Day Info:</h3>
        <p>Open: ${prevDay.o.toFixed(2)}</p>
        <p>High: ${prevDay.h.toFixed(2)}</p>
        <p>Low: ${prevDay.l.toFixed(2)}</p>
        <p>Close: ${prevDay.c.toFixed(2)}</p>
        <p>Volume: {prevDay.v}</p>
        <p>Volume Weighted: ${prevDay.vw.toFixed(2)}</p>
      </div>
      {/* Button to view details */}
      <button onClick={() => handleViewDetails(ticker)}>View Details</button>
    </div>
  );
};

StockListItem.propTypes = {
  stock: PropTypes.object.isRequired, // Prop validation for stock object
  onViewDetails: PropTypes.func.isRequired // Prop validation for onViewDetails function
};

export default StockListItem;
