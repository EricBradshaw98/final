import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useFinancial from '../../hooks/useFinancialsApi';
import useChart from '../../hooks/useChart';
import useStatement from '../../hooks/useStatement';
import Chart from "react-apexcharts";
import moment from "moment";
import "../../styles/stockdetails.scss";


const StockListDetailsItem = ({ tickerCurrent }) => {
  const [multiplier, setMultiplier] = useState(1);
  const [timespan, setTimespan] = useState('day');
  const [start, setStart] = useState('2024-01-01');
  const [end, setEnd] = useState('2024-03-01');
  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: function(value, timestamp) {
          return moment(timestamp).format('YYYY-MM-DD');
        }
      }
    }
  });

  const [series, setSeries] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedFinancialCategory, setSelectedFinancialCategory] = useState('comprehensive_income');

  const handleChangeFinancialCategory = (event) => {
    setSelectedFinancialCategory(event.target.value);
  };

  const { data, loading, error } = useFinancial(`/reference/tickers/${tickerCurrent}?`);
  const { data3, loading3, error3 } = useStatement(`/reference/financials?ticker=${tickerCurrent}&`);

  const { data2, loading2, error2 } = useChart(`${tickerCurrent}/range/${multiplier}/${timespan}/${start}/${end}?adjusted=true&sort=asc&limit=120&`);



  const handleMultiplierChange = (event) => {
    setMultiplier(event.target.value);
  };

  const handleTimespanChange = (event) => {
    setTimespan(event.target.value);
  };

  const handleStartChange = (event) => {
    setStart(event.target.value);
  };

  const handleEndChange = (event) => {
    setEnd(event.target.value);
  };

  const handleChange = (event) => {
    setSelectedItemId(event.target.value);
  };

  useEffect(() => {
    if (!data2 || !data2.results || !Array.isArray(data2.results)) return;

    const formattedData = data2.results.map(item => {
      return [item.t, [item.o, item.h, item.l, item.c]];
    });

    setSeries([{ data: formattedData }]);
  }, [data2]);

  if (loading || loading2 || loading3) return <div>Loading...</div>; // Check if any data is loading

  if (error || error2 || error3) {
    return (
      <div>
        Error: {error?.message || error2?.message || error3?.message}
      </div>
    );
  }

  // Check if data.results is undefined or empty
  if (!data || !data.results || data.results.length === 0) {
    return <div>No results found</div>;
  }
  if (!data3 || !data3.results || data3.results.length === 0) {
    return <div>No financial data found</div>;
  }

  // Continue with rendering if data.results is defined
  const companyInfo = data.results;
  const financeInfo = data3.results;


  return (

    <div className="stock-item">
      <div className='stock-container'>

        <div className="mixed-chart">
          <div>
            <div className='stock-chart'>
              <Chart
                options={options}
                series={series}
                type="candlestick"
                width="700"
              />
            </div>
            <div className="controls">
              <label>Multiplier:</label>
              <input type="text" value={multiplier} onChange={handleMultiplierChange} />

              <label>Timespan:</label>
              <select value={timespan} onChange={handleTimespanChange}>
                <option value="hour">Hour</option>
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="quarter">Quarter</option>
                <option value="year">Year</option>
              </select>

              <label>Start:</label>
              <input type="date" value={start} onChange={handleStartChange} />
              <label>End:</label>
              <input type="date" value={end} onChange={handleEndChange} />

            </div>

          </div>

          <div className='company-details'>
            <li>
              {companyInfo.name && <li><strong>Stock:</strong> {companyInfo.name} ({companyInfo.ticker})</li>}
              {companyInfo.market && <li><strong>Market:</strong> {companyInfo.market}</li>}
              {companyInfo.locale && <li><strong>Locale:</strong> {companyInfo.locale}</li>}
              {companyInfo.currency_name && <li><strong>Currency Name:</strong> {companyInfo.currency_name}</li>}
              {companyInfo.round_lot && <li><strong>Round Lot:</strong> {companyInfo.round_lot}</li>}
              {companyInfo.weighted_shares_outstanding && <li><strong>Weighted Shares Outstanding:</strong> {companyInfo.weighted_shares_outstanding}</li>}
              {companyInfo.share_class_shares_outstanding && <li><strong>Share Class Shares Outstanding:</strong> {companyInfo.share_class_shares_outstanding}</li>}
              {companyInfo.market_cap && <li><strong>Market Cap:</strong> ${companyInfo.market_cap}</li>}
              {companyInfo.cik && <li><strong>CIK:</strong> {companyInfo.cik}</li>}
              {companyInfo.composite_figi && <li><strong>Composite FIGI:</strong> {companyInfo.composite_figi}</li>}
              {companyInfo.share_class_figi && <li><strong>Share Class FIGI:</strong> {companyInfo.share_class_figi}</li>}
              {companyInfo.sic_code && <li><strong>SIC Code:</strong> {companyInfo.sic_code}</li>}
              {companyInfo.sic_description && <li><strong>SIC Description:</strong> {companyInfo.sic_description}</li>}
              {companyInfo.list_date && <li><strong>List Date:</strong> {companyInfo.list_date}</li>}
            </li>
          </div>
        </div>
      </div>
      <div className='company-info-financials'>
        <div className='company-info-container'>
          <div className="company-info">
            <div className='company-title'>
              {companyInfo.branding.logo_url &&
                <img src={`${companyInfo.branding.logo_url}?apiKey=5zppMBtonCBY1SJ42kijFfL2V7co5_MN`} alt="Logo" style={{ width: '100px', height: 'auto' }} />
              }
            </div>
            <ul>
              {companyInfo.description &&
                <li>{companyInfo.description}</li>
              }
              <div className='company-links'>
                {companyInfo.phone_number &&
                  <li><strong>Phone Number:</strong> {companyInfo.phone_number}</li>
                }
                {companyInfo.address &&
                  <li><strong>Address:</strong> {companyInfo.address.address1}, {companyInfo.address.city}, {companyInfo.address.state} {companyInfo.address.postal_code}</li>
                }
                {companyInfo.homepage_url &&
                  <li><strong>Homepage URL:</strong> <a href={companyInfo.homepage_url}>{companyInfo.homepage_url}</a></li>
                }
                {companyInfo.total_employees &&
                  <li><strong>Total Employees:</strong> {companyInfo.total_employees}</li>
                }
              </div>
            </ul>
          </div>
        </div>

        {data3 && data3.results && (
          <div className='financials-container'>
            <div className="financials">
              <h3>Financial Information</h3>
              <select value={selectedItemId} onChange={handleChange}>
                <option value="">Select Item</option>
                {data3 && data3.results && data3.results.map((item, index) => (
                  <option key={index} value={item.id}>{item.id}</option>
                ))}
              </select>

              <select value={selectedFinancialCategory} onChange={handleChangeFinancialCategory}>
                <option value="">Select Financial Category</option>
                {selectedItemId && data3 && data3.results && data3.results.find(item => item.id === selectedItemId) &&
                  Object.keys(data3.results.find(item => item.id === selectedItemId).financials || {}).map(category => (
                    Object.keys(data3.results.find(item => item.id === selectedItemId).financials[category]).map((subCategory, index) => (
                      <option key={index} value={`${category}.${subCategory}`}>{data3.results.find(item => item.id === selectedItemId).financials[category][subCategory].label}</option>
                    ))
                  ))
                }
              </select>

              <ul>
                {selectedItemId && data3 && data3.results && data3.results.map((item, index) => (
                  item.id === selectedItemId && (
                    <li key={index}>
                      <div className='finance-list-item'>
                        <strong>ID: </strong> {item.id}<br />
                        <strong>Start Date: </strong> {item.start_date}<br />
                        <strong>End Date: </strong> {item.end_date}<br />


                        {selectedFinancialCategory && item.financials[selectedFinancialCategory.split('.')[0]] && item.financials[selectedFinancialCategory.split('.')[0]][selectedFinancialCategory.split('.')[1]] && (
                          <>
                            <strong>{selectedFinancialCategory.replace('_', ' ').replace('.', ': ')}: </strong>
                            {item.financials[selectedFinancialCategory.split('.')[0]][selectedFinancialCategory.split('.')[1]].unit === 'USD' &&
                              `$`}
                            {item.financials[selectedFinancialCategory.split('.')[0]][selectedFinancialCategory.split('.')[1]].value}
                            {item.financials[selectedFinancialCategory.split('.')[0]][selectedFinancialCategory.split('.')[1]].unit && ` ${item.financials[selectedFinancialCategory.split('.')[0]][selectedFinancialCategory.split('.')[1]].unit}`}
                            <br /><br />
                          </>
                        )}
                      </div>
                      {/* Add other properties as needed */}
                    </li>
                  )
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );

};
StockListDetailsItem.propTypes = {
  tickerCurrent: PropTypes.string.isRequired,
};

export default StockListDetailsItem;