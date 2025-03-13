'use client'
import apiClient from "@/lib/axios";
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
  const [pendingSellId, setPendingSellId] = useState(null);

  const sellAll = (id) => {
    const payload = {
      id : id
    }
    const result = apiClient.post("/api/trader/sellAll", payload).then(res => {
      getOpenPositions();
      getClosePositions();
      toast.success("All positions sold successfully");
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
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Open Positions
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Call/Put
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Analyst
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Entry
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Current Price
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Time in
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Profit per Contract
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
                  ROI
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
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
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{position.symbol}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{position.date}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{position.analyst}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{position.entryPrice}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{position.currentPrice}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {getMinutesDifference(position.created_at)}
                    </td>
                    <td className={`px-4 py-3 text-sm ${(position.currentPrice - position.entryPrice) >= 0 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'}`}>
                      {(position.currentPrice - position.entryPrice).toFixed(2)}
                    </td>
                    <td className={`px-4 py-3 text-sm ${(position.currentPrice - position.entryPrice) >= 0 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'}`}>
                      {(((position.currentPrice - position.entryPrice) / position.entryPrice) * 100).toFixed(2)}%
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{position.positionsOpen}</td>
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
                      <>
                        <button 
                          onClick={() => {
                            setShowConfirm(true);
                            setPendingSellId(position._id);
                          }}
                          className="rounded-lg bg-red-600 px-3 py-1 text-xs text-white hover:bg-red-700">
                          Sell All
                        </button>

                        {showConfirm && (
                          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                              <p className="text-gray-700 dark:text-gray-300 mb-4">Are you sure you want to sell all positions?</p>
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => {
                                    sellAll(pendingSellId);
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