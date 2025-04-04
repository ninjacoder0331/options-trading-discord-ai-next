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

const ClosedTrades = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingSellId, setPendingSellId] = useState(null);
  const [openPositions , setOpenPositions] = useState([]);
  const [isLoading , setIsLoading] = useState(false);
  const [analysts , setAnalysts] = useState([]);
  const [traders , setTraders] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
 

  const sellAmount = (id) => {


    const amount = parseInt(((id.amount-id.soldAmount) * percentage / 100).toString());

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
    const response = await apiClient.get('/api/trader/getClosePositions');
    const result = response.data.positions.sort((a, b) => 
      new Date(b.exitDate).getTime() - new Date(a.exitDate).getTime()
    );
    setOpenPositions(result);
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
        <div className="overflow-x-auto text-base rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-dark">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700 dark:text-gray-300">Rows per page:</span>
              <select
                className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Page {currentPage} of {Math.ceil(openPositions.length / rowsPerPage)}
              </span>
              <button
                className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(openPositions.length / rowsPerPage)))}
                disabled={currentPage === Math.ceil(openPositions.length / rowsPerPage)}
              >
                Next
              </button>
            </div>
          </div>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-primary/10 dark:bg-primary/5">
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Closed Positions
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Entry
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Exit
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Profit
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Qty
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Profit
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                  ROI
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Entry Date<br/>Time
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Exit Date<br/>Time
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Trader
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Analyst
                </th>
              </tr>
            </thead>
            <tbody>
              
              {
                openPositions
                  .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
                  .map((position , key) => (
                  <tr className="border-b border-gray-200 text-center hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800" key={key}>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {position.symbol + " " + (position.childType=="call" ? "C" : "P") + " $" + position.strikePrice}<br/>
                      {new Date(position.exitDate).toLocaleString('en-US', {
                        month: '2-digit',
                        day: '2-digit',
                        year: 'numeric'
                      })} &nbsp;&nbsp;
                      {new Date(position.exitDate).toLocaleString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {position.entryPrice}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {position.closePrice}
                    </td>
                    <td className={`px-4 py-3 text-sm ${(position.closePrice - position.entryPrice) >= 0 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'}`}>
                      {(position.closePrice - position.entryPrice).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {position.soldAmount}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {((position.closePrice - position.entryPrice)*position.soldAmount * 100).toFixed(2)}
                    </td>
                    <td className={`px-4 py-3 text-sm ${(position.closePrice - position.entryPrice) >= 0 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'}`}>
                      {(((position.closePrice - position.entryPrice) / position.entryPrice) * 100).toFixed(2)}%
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {new Date(position.created_at).toLocaleString('en-US', {
                      month: '2-digit',
                      day: '2-digit',
                      year: 'numeric'
                    })}
                    <br/>
                    {new Date(position.created_at).toLocaleString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {new Date(position.exitDate).toLocaleString('en-US', {
                      month: '2-digit',
                      day: '2-digit',
                      year: 'numeric'
                    })}
                    <br/>
                    {new Date(position.exitDate).toLocaleString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {traders.map((trader, key) => 
                        trader._id === position.userID ? trader.name : null
                        
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{position.analyst}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
    )
}

export default ClosedTrades;