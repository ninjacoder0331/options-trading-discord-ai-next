'use client'
import apiClient from "@/lib/axios";
import React, { useState } from "react"
import { toast } from "react-toastify";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect } from "react";

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

const AdminHome = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingSellId, setPendingSellId] = useState(null);
  const [openPositions , setOpenPositions] = useState([]);
  const [isLoading , setIsLoading] = useState(false);
  const [analysts , setAnalysts] = useState([]);
  const [traders , setTraders] = useState([]);
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
    const result = apiClient.post("/api/trader/sellAmount", payload).then(res => {
      getOpenPositions();
      toast.success("All positions sold successfully");
    }).catch(err => {
      console.log("err", err);
      toast.error("Error selling all positions");
    })
  }

  const getOpenPositions = async () => {
    const response = await apiClient.get('/api/trader/getOpenPositions');
    console.log("response closed", response.data.positions);
    setOpenPositions(response.data.positions);
    return response;
  }


  const getTraders = () => {
    return apiClient.get('/api/trader/getTraders')
      .then(response => {
        setTraders(response.data);
        setIsLoading(false);
        console.log(response.data);
      })
      .catch(error => {
        setIsLoading(false);
        console.error('Error:', error);
      });
  }

  const sellAll = (id) => {
    const payload = {
      id : id
    }
    const result = apiClient.post("/api/trader/sellAll", payload).then(res => {
      getOpenPositions();
      toast.success("All positions sold successfully");
    }).catch(err => {
      console.log("err", err);
      toast.error("Error selling all positions");
    })
  }

  const getAnalysts = async () => {
    const response = await apiClient.get('/api/trader/getAnalysts');
    setAnalysts(response.data);
    return response;
  }

  const sellOneThird = (position) => {
    const payload = {
      id : position._id,
      amount : parseInt((position.amount / 3).toString())
    }

    console.log("payload", payload);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [analystResponse, optionsPositionResponse, tradersResponse] = await Promise.all([
          getAnalysts(),
          getOpenPositions(),
          getTraders()
          // getTickers()
        ]);
        
        // console.log("analystResponse", analystResponse);
        // console.log("optionsPositionResponse", optionsPositionResponse);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if(isLoading) {
    return <div>Loading...</div>
  }
    return (
        <div className="overflow-x-auto  text-base rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-dark">
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
                  Trader
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
                <th className="whitespace-nowrap px-4 text-center py-3 text-sm font-semibold text-gray-800 dark:text-gray-200">
                  number of<br/> Contracts
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                  number of<br/> Opens
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                  P&L
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                  ROI
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Time in
                </th>
                  <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Positions
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
              
              {
                openPositions.map((position , key) => (
                  <tr className="border-b border-gray-200 text-center hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800" key={key}>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{position.symbol}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      { position.childType + "  $" + position.strikePrice }<br/>
                      { position.date}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {traders.map((trader, key) => 
                        trader._id === position.userID ? trader.name : null
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{position.analyst}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">${position.entryPrice}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">${position.currentPrice}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {position.amount}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {position.amount - position.soldAmount}
                    </td>
                    <td className={`px-4 py-3 text-sm ${(position.currentPrice - position.entryPrice) >= 0 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'}`}>
                      {((position.currentPrice - position.entryPrice)*(position.amount - position.soldAmount) *100) < 0 ? '-' : ''}${Math.abs((position.currentPrice - position.entryPrice)*(position.amount - position.soldAmount) *100).toFixed(2)}
                    </td>
                    <td className={`px-4 py-3 text-sm ${(position.currentPrice - position.entryPrice) >= 0 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'}`}>
                      {(((position.currentPrice - position.entryPrice) / position.entryPrice) * 100).toFixed(2)}%
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {getMinutesDifference(position.created_at)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {((position.amount - position.soldAmount)/position.amount * 100).toFixed(0) + "%"}
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

export default AdminHome;