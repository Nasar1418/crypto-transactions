import { useEffect, useState } from "react";
import axios from "axios";
import { Baseurl } from "./baseUrl";
import Loader from "./Loader";

import "./Exchanges.css";
import OurModel from "./OurModel";
import Navbar from "./Navbar";

const Exchanges = () => {
  const [loading, setLoading] = useState(true);
  const [exchanges, setExchanges] = useState([]);
  useEffect(() => {
    const getExchangesData = async () => {
      try {
        const { data } = await axios.get(`${Baseurl}/exchanges`);
        console.log(data);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getExchangesData();
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <div style={{ position: "relative" }}></div>
          <div className="md:xl">
            {" "}
            <OurModel />
          </div>
          <div className="exchanges-container">
            {exchanges.map((item, i) => {
              return (
                <div key={i} className="ex-cards">
                  <div className="image">
                    <img height={"80px"} src={item.image} alt="" />
                  </div>
                  <div className="name">{item.name}</div>
                  <div className="price">
                    {item.trade_volume_24h_btc.toFixed(0)}
                  </div>
                  <div className="rank">{item.trust_score_rank}</div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Exchanges;
