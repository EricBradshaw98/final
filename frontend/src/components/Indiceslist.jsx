import React, { useState, useEffect } from "react";
import "../styles/indices.scss";
import axios from "axios";


const Indiceslist = () => {
  const [indicesData, setIndicesData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/indices");
        setIndicesData(response.data);
        console.log('response.data', response.data)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  console.log()
  return (
    <div className="indices">
      <div className="indices-title">
        <h3>INDICES</h3>
      </div>
      <section className="indices-section">
        <div className="indices-info">
          <p>Name</p>
          <p>Price</p>
          <p>High</p>
          <p>Low</p>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          indicesData && (
            <div className="indices-info">
              <p>{indicesData.compData.symbol}</p>
              <p>$ {indicesData.compData.open.toFixed(2)}</p>
              <p>$ {indicesData.compData.high.toFixed(2)}</p>
              <p>$ {indicesData.compData.low.toFixed(2)}</p>
            </div>
          )
        )}
      </section>
    </div>
  );
};

export default Indiceslist;
