'use client'
import apiClient from "@/lib/axios";
import { useEffect , useState } from "react";
import { toast } from "react-toastify";

const TraderStatistics = ({analysts , traders , closePositions , getTraders}) => {
  const [traderStatistics , setTraderStatistics] = useState([]);
  const [showConfirm , setShowConfirm] = useState(false);
  const [isLoading , setIsLoading] = useState(false);
  const [selectedTrader , setSelectedTrader] = useState(null);

  useEffect(()=>{
    console.log("traders", traders);
    console.log("closePositions", closePositions);
    setIsLoading(true);
    setTraderStatistics([]);
    for(let i=0; i<traders.length; i++){
      let totalTrades = 0;
      let wins = 0;
      let losses = 0;
      let totalProfit = 0;
      let startDate = null;
      
      for(let j = 0; j<closePositions.length; j++){
        if(traders[i]._id === closePositions[j].userID && closePositions[j].status === "closed"){
          totalTrades += 1;
          if(closePositions[j].entryPrice < closePositions[j].closePrice){
            wins += 1;
          }else{
            losses += 1;
          }
          totalProfit += (closePositions[j].closePrice - closePositions[j].entryPrice) *100 * closePositions[j].amount;
          // startDate = traders[i].created_at;
        }
      }
      const traderStatistics = {
        name: traders[i].name,
        totalTrades: totalTrades,
        wins: wins,
        losses: losses,
        totalProfit: totalProfit,
        startDate: traders[i].created_at, 
        status: traders[i].status,
        _id: traders[i]._id,
      }
      // console.log("traderStatistics", traders[i]);
      setTraderStatistics(prev => [...prev, traderStatistics]);
    }
    console.log("traderStatistics", traderStatistics);
    setIsLoading(false);
    },[traders]);
  
  const startStopTrader = () => {
    console.log("selectedTrader", selectedTrader);
    if(selectedTrader === null){
      toast.error("Please select a trader");
      return;
    }

    const payload = {
      id: selectedTrader,
    }
    
    setSelectedTrader(null);
    const response = apiClient.post('/api/trader/startStopTrader', payload).then(res => {
      toast.success("Trader started/stopped");
      getTraders();
    }).catch(err => {
      toast.error("Error starting/stopping trader");
    })
  }

  if(isLoading){
    return <div>Loading...</div>
  }

    return (
      <div className="overflow-x-auto  text-base rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-dark">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-primary/10 dark:bg-primary/5">
            <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
              Trader
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
              Total
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
              Wins
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
              Losses
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
              % Wins
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
              Total Profit
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
              Profit Per Trade
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
              Start Date
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
              Start/Stop
            </th>
          </tr>
        </thead>
        <tbody>
          {
            traderStatistics.map((trader , key) => (

              <tr className="border-b border-gray-200 text-center hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800" key={key}>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{trader.name}</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{trader.totalTrades}</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{trader.wins}</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{trader.losses}</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{(trader.wins / trader.totalTrades * 100).toFixed(2)}%</td>
                <td className={`px-4 py-3 text-sm ${trader.totalProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {trader.totalProfit >= 0 ? `$${trader.totalProfit.toFixed(2)}` : `-$${Math.abs(trader.totalProfit).toFixed(2)}`}
                </td>
                <td className={`px-4 py-3 text-sm ${(trader.totalProfit / trader.totalTrades) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {(trader.totalProfit / trader.totalTrades) >= 0 ? `$${(trader.totalProfit / trader.totalTrades).toFixed(2)}` : `-$${Math.abs(trader.totalProfit / trader.totalTrades).toFixed(2)}`}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  {new Date(trader.startDate).toLocaleString('en-US', {
                      month: '2-digit',
                      day: '2-digit',
                      year: 'numeric'
                    })}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  <button className={" text-white " + (trader.status === "start" ? " bg-red-500 " : " bg-blue-500 ") + " px-4 py-2 rounded-md"} onClick={() => {setShowConfirm(true); setSelectedTrader(trader._id);}}>
                    {trader.status === "start" ? "Stop" : "Start"}
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
        </table>
        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <p className="text-gray-700 dark:text-gray-300 mb-4">Are you sure you want to change the status?</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    startStopTrader();
                    setShowConfirm(false);
                    
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  OK
                </button>
                <button
                  onClick={() => {
                    setShowConfirm(false);
                    setSelectedTrader(null);
                  }}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
    )
}

export default TraderStatistics;
