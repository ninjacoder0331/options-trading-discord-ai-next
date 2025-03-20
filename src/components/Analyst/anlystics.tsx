'use client'
import React, { useEffect, useState } from "react"

const Anlystics = ({closePositions}) => {

  const [newClosePositions, setNewClosePositions] = useState([]);

  useEffect(() => {
    let newClosePositions = [];
    let analyst = [];
    const analystList = closePositions.map((position) => position.analyst);
    const uniqueAnalysts = [...new Set(analystList)];
    // console.log("uniqueAnalysts", uniqueAnalysts);
    console.log("closePositions", closePositions);

    for(let i = 0; i < uniqueAnalysts.length; i++){
      let totalWins = 0;
      let totalLosses = 0;
      let Profit = 0;
      for(let j = 0; j < closePositions.length; j++){
        if(closePositions[j].analyst === uniqueAnalysts[i]){
          
          Profit = closePositions[j].closePrice - closePositions[j].entryPrice;
          if(Profit > 0){
            totalWins += 1;
          }else{
            totalLosses += 1;
          }
        }
      }
      

      newClosePositions.push({
        analyst: uniqueAnalysts[i],
        wins: totalWins,
        losses: totalLosses,
        percentage: (totalWins / (totalLosses + totalWins)) * 100
      })

      setNewClosePositions(newClosePositions);
    }
    console.log("newClosePositions", newClosePositions);
  }, [closePositions]);
    return (
        <div className="overflow-x-auto rounded-lg bg-white p-6 shadow-1 dark:bg-gray-dark w-full" >
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-primary/10 dark:bg-primary/5">
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Analyst
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Wins
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Loses
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
                  % Wins
                </th>
              </tr>
            </thead>
            <tbody>
              {/* <tr className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">TSLA</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$1.50</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$2.20</td>
                <td className="px-4 py-3 text-sm text-green-600 dark:text-green-400">$0.70</td>
              </tr> */}
              {
                newClosePositions.map((position , index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{position.analyst}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{position.wins}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{(position.losses).toFixed(0)}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{(position.percentage).toFixed(0)}%</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
    )
}

export default Anlystics;