import React, { useState } from "react";
import useApi from '../hooks/useApi'; // Import the useApi hook
import StockListItem from '../components/component/StockListItem'; // Import the StockListItem component

const StockList = () => {
  // State to hold the search query
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');

  // Define the API endpoint based on the presence of the search query
  const apiEndpoint = submittedQuery
    ? `/snapshot/locale/us/markets/stocks/tickers/${submittedQuery}?`
    : '/snapshot/locale/us/markets/stocks/tickers?';

  // Fetch data using useApi hook
  const { data, loading, error } = useApi(apiEndpoint);

  // Handle search form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedQuery(searchQuery.toUpperCase());;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Search bar */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by ticker..."
        />
        <button type="submit">Search</button>
      </form>
      {/* Check if data exists and is an array before rendering */}
      {Array.isArray(data.tickers) && data.tickers.map((stock, index) => (
        <StockListItem key={index} stock={stock} />
      ))}
      {/* Check if data.ticker exists and render */}
      {data.ticker && <StockListItem stock={data.ticker} />}
    </div>
  );
};

export default StockList;
