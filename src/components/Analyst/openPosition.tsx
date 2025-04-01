'use client'
import apiClient from "@/lib/axios";
import { Amarante } from "next/font/google";
import React, { useState } from "react"
import { toast } from "react-toastify";

const getMinutesDifference = (createdAt: string) => {
  try {
    
    const created = new Date(createdAt);
    const now = new Date();
    // console.log("created", created);
    // console.log("now", now);
    const diffInMs = now.getTime() - created.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    return `${diffInMinutes} min`;
  } catch (error) {
    return '0 min';
  }
};

const OpenPosition = ({openPositions , getOpenPositions  , getClosePositions}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingSellId, setPendingSellId] = useState();
  const [percentage, setPercentage] = useState(0);
 

  const sellAmount = (id) => {

    let amount = parseInt((id.amount * percentage / 100).toString());
    const restamount = id.amount - id.soldAmount;
    if(amount > restamount){
      amount = restamount;
    }
    const payload = {
      id : id._id,
      amount : amount
    }
    if(amount < 1){
      toast.error("Amount is less than 1");
      return;
    }
    console.log("payload", payload);
    const result = apiClient.post("/api/trader/sellAmount", payload).then(res => {
      if(res.data == 200){
        toast.success("Order placed successfully");
        getOpenPositions();
        getClosePositions();
      }
      else{
        toast.info("Please check the order details or market time");
      }
            
    }).catch(err => {
      console.log("err", err);
      toast.error("Error selling all positions");
    })
  }
    return (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-primary/10 dark:bg-primary/5">
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Open Positions
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Call/Put
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Analyst
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Entry
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Current Price
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Time in
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Profit per Contract
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                  ROI
                </th>
                {/* <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Total Position
                </th> */}
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Positions Open
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Sell 1/3
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Sell Half
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Sell All
                </th>
              </tr>
            </thead>
            <tbody>
              {/* <tr className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">AAPL</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  C Feb 5 $223
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">WiseGuy</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$1.50</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$2.50</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">35 mins</td>
                <td className="px-4 py-3 text-sm text-green-600 dark:text-green-400">$1.00</td>
                <td className="px-4 py-3 text-sm text-green-600 dark:text-green-400">60%</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">100%</td>
                <td className="px-4 py-3 text-center">
                  <button className="rounded-lg bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600">
                    Sell 1/3
                  </button>
                </td>
                <td className="px-4 py-3 text-center">
                  <button className="rounded-lg bg-orange-500 px-3 py-1 text-xs text-white hover:bg-orange-600">
                    Sell Half
                  </button>
                </td>
                <td className="px-4 py-3 text-center">
                  <button className="rounded-lg bg-red-600 px-3 py-1 text-xs text-white hover:bg-red-700">
                    Sell All
                  </button>
                </td>
              </tr> */}
              {/* Add more rows as needed */}
              {
                openPositions.map((position , key) => (
                  <tr className="border-b border-gray-200 text-center hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800" key={key}>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center dark:text-gray-300">{position.symbol}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center dark:text-gray-300">
                      {position.date } <br/> {position.childType + " $" + position.strikePrice}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center dark:text-gray-300">{position.analyst}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center dark:text-gray-300">{position.entryPrice}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center dark:text-gray-300">{position.currentPrice}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center dark:text-gray-300">
                      {position["timeDifference"]}
                    </td>
                    <td className={`px-4 py-3 text-center text-sm ${(position.currentPrice - position.entryPrice) >= 0 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'}`}>
                      {(position.currentPrice - position.entryPrice).toFixed(2)}
                    </td>
                    <td className={`px-4 py-3 text-center text-sm ${(position.currentPrice - position.entryPrice) >= 0 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'}`}>
                      {(((position.currentPrice - position.entryPrice) / position.entryPrice) * 100).toFixed(2)}%
                    </td>
                    {/* <td className="px-4 py-3 text-center text-sm text-gray-700 dark:text-gray-300">
                      {position.amount}
                    </td> */}
                    <td className="px-4 py-3 text-center text-sm text-gray-700 dark:text-gray-300">
                      {((position.amount - position.soldAmount)/position.amount * 100).toFixed(1)}%
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button 
                      className="rounded-lg bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600"
                      onClick={() => {
                        setShowConfirm(true);
                        setPercentage(34);
                        setPendingSellId(position);
                      }}
                      >
                        Sell 1/3
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button 
                        className="rounded-lg bg-orange-500 px-3 py-1 text-xs text-white hover:bg-orange-600"
                        onClick={() => {
                          setShowConfirm(true);
                          setPercentage(50);
                          setPendingSellId(position);
                        }}
                      >
                        Sell Half
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <>
                        <button 
                          onClick={() => {
                            setShowConfirm(true);
                            setPercentage(100);
                            setPendingSellId(position);
                          }}
                          className="rounded-lg bg-red-600 px-3 py-1 text-xs text-white hover:bg-red-700">
                          Sell All
                        </button>

                        {showConfirm && (
                          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                              <p className="text-gray-700 dark:text-gray-300 mb-4">Are you sure you want to sell {percentage}% of the position?</p>
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => {
                                    sellAmount(pendingSellId);
                                    setShowConfirm(false);
                                  }}
                                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                >
                                  OK
                                </button>
                                <button
                                  onClick={() => setShowConfirm(false)}
                                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    </td>                 
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
    )
}

export default OpenPosition;