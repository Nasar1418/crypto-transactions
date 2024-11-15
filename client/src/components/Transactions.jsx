import React, { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import useFetch from "../hooks/useFetch";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";

const TransactionsCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  keyword,
  amount,
  url,
}) => {
  const gifUrl = useFetch({ keyword });
  // Determine if this is a "Sent" or "Received" transaction
  const { currentAccount } = useContext(TransactionContext);
  // console.log(currentAccount);
  // console.log(addressFrom);
  const isReceived = addressFrom.toLowerCase() !== currentAccount.toLowerCase();

  // console.log(isReceived);
  return (
    <div
      className="bg-[#181918] m-4 flex flex-1
    2xl:min-w-[450px]
    2xl:max-w-[500px]
    sm:min-w-[270px]
    sm:max-w-[300px]
    min-w-full
    flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <a
            href={`https://sepolia.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-white text-base">
              From:{" "}
              <span className="text-blue-400">
                {shortenAddress(addressFrom)}
              </span>
            </p>
          </a>
          <a
            href={`https://sepolia.etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-white text-base">
              To:{" "}
              <span className="text-blue-400">{shortenAddress(addressTo)}</span>
            </p>
          </a>
          <p className="text-white text-base">Amount: {amount} ETH</p>
          
          {/* Display the label based on whether the transaction is "Received" or "Sent" */}
          <p
            className={`text-base font-bold ${
              isReceived ? "text-green-400" : "text-red-400"
            }`}
          >
            {isReceived ? "+ Received" : "- Sent"}
          </p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message: {message}</p>
            </>
          )}
        </div>
        <img
          src={gifUrl || url}
          alt="nature"
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
        />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);
  const allTransactions = [...transactions].reverse();
  const [visibleCount, setVisibleCount] = useState(6);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  const handleShowLess = () => {
    setVisibleCount((prevCount) => Math.max(prevCount - 3, 6));
  };

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">
            Latest Transactions
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your account to see the latest transactions
          </h3>
        )}
        <div className="flex flex-wrap justify-center items-center mt-10">
          {allTransactions.slice(0, visibleCount).map((transaction, i) => {
            // console.log(transaction); // Log each transaction
            return <TransactionsCard key={i} {...transaction} />;
          })}
        </div>

        <div className="flex justify-center mt-4">
          {visibleCount < allTransactions.length && (
            <button
              className="text-blue-500 hover:text-blue-700 mx-2"
              onClick={handleShowMore}
            >
              Show More
            </button>
          )}
          {visibleCount > 6 && (
            <button
              className="text-slate-300 hover:text-slate-500 mx-2"
              onClick={handleShowLess}
            >
              Show Less
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
