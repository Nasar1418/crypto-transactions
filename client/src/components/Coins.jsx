/*eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Baseurl } from "./baseUrl";
import { LoaderB, Navbar } from ".";
import Loader from "./Loader";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSearchDollar } from "react-icons/fa";
import "./Res.css";
import "./coins.css";

const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState("usd");
  const [search, setSearch] = useState("");
  const currencySymbol = currency === "inr" ? "₹" : "$";
  useEffect(() => {
    const getCoinsData = async () => {
      try {
        const { data } = await axios.get(
          `${Baseurl}/coins/markets?vs_currency=${currency}`
        );
        console.log(data);
        setCoins(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getCoinsData();
  }, [currency]);

  return (
    <>
      {loading ? (
        <LoaderB />
      ) : (
        <>
          <Navbar />
          <div className="top">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search Your Coins "
                onChange={(e) => setSearch(e.target.value)}
              />{" "}
            </div>
            <div className="btns">
              <button onClick={() => setCurrency("inr")}>Inr</button>
              <button onClick={() => setCurrency("usd")}>Usd</button>
            </div>
          </div>
          <div className="coins-container">
            {coins
              .filter((data) => {
                if (data == "") {
                  return data;
                } else if (
                  data.name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return data;
                }
              })
              .map((coindata, i) => {
                return (
                  <CoinCard
                    key={i}
                    coindata={coindata}
                    id={coindata.id}
                    i={i}
                    currencySymbol={currencySymbol}
                  />
                );
              })}
          </div>
        </>
      )}
    </>
  );
};

const CoinCard = ({ coindata, currencySymbol, i, id }) => {
  const profit = coindata.price_change_percentage_24h > 0;
  return (
    <Link
      to={`/coins/${id}`}
      style={{ color: "white", textDecoration: "none" }}
    >
      <div className="ex-cards">
        <div className="image">
          <img height={"80px"} src={coindata.image} alt="" />
        </div>
        <div className="name">{coindata.name}</div>
        <div className="price">
          {currencySymbol} {coindata.current_price.toFixed(0)}
        </div>
        <div
          style={profit ? { color: "green" } : { color: "red" }}
          className="rank"
        >
          {profit
            ? "+" + coindata.price_change_percentage_24h.toFixed(2)
            : coindata.price_change_percentage_24h.toFixed(2)}
        </div>
      </div>
    </Link>
  );
};

export default Coins;
