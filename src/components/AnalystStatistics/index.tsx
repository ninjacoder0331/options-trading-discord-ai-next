'use client'
import apiClient from "@/lib/axios";
import { useEffect , useState } from "react";
import { toast } from "react-toastify";

 const AnalystStatistics = ({analysts , traders , closePositions , getAnalysts}) => {
  const [analystStatistics , setAnalystStatistics] = useState([]);
  const [showConfirm , setShowConfirm] = useState(false);
  const [isLoading , setIsLoading] = useState(false);
  const [selectedAnalyst , setSelectedAnalyst] = useState(null);

  useEffect(()=>{
    // console.log("traders", traders);
    // console.log("closePositions", closePositions);
    setIsLoading(true);
    setAnalystStatistics([]);
    for(let i=0; i<analysts.length; i++){
      let totalTrades = 0;
      let wins = 0;
      let losses = 0;
      let totalProfit = 0;
      let startDate = null;
      
      for(let j = 0; j<closePositions.length; j++){
        if(analysts[i].name === closePositions[j].analyst && closePositions[j].status === "closed"){
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
      const analystStatistics = {
        name: analysts[i].name,
        totalTrades: totalTrades,
        wins: wins,
        losses: losses,
        totalProfit: totalProfit,
        status: analysts[i]?.status,
        startDate: startDate,
        _id: analysts[i]._id,
      }
      // console.log("traderStatistics", traders[i]);
      setAnalystStatistics(prev => [...prev, analystStatistics]);
    }
    console.log("analystStatistics", analystStatistics);
    setIsLoading(false);
    },[analysts]);
  
  const startStopTrader = () => {
    console.log("selectedAnalyst", selectedAnalyst);
    if(selectedAnalyst === null){
      toast.error("Please select a analyst");
      return;
    }

    const payload = {
      id: selectedAnalyst,
    }
    
    setSelectedAnalyst(null);
    const response = apiClient.post('/api/trader/startStopAnalyst', payload).then(res => {
      toast.success("Analyst started/stopped");
      getAnalysts();
    }).catch(err => {
      toast.error("Error starting/stopping analyst");
    })
  }

  if(isLoading){
    return <div>Loading...</div>
  }

    return (
      <div className="overflow-x-auto  text-base rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-dark">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-primary/10 dark:bg-primary/5 text-center">
            <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
              Analyst
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
            {/* <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
              Start Date
            </th> */}
            <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
              Start/Stop
            </th>
          </tr>
        </thead>
        <tbody>
          {
              analystStatistics.map((analyst , key) => (
              <tr className="border-b border-gray-200 text-center hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800" key={key}>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{analyst.name}</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{analyst.totalTrades}</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{analyst.wins}</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{analyst.losses}</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{(analyst.wins / analyst.totalTrades * 100).toFixed(2)}%</td>
                <td className={`px-4 py-3 text-sm ${analyst.totalTrades > 0 ? (analyst.totalProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400') : 'text-gray-700 dark:text-gray-300'}`}>
                  {analyst.totalTrades > 0 ? (analyst.totalProfit >= 0 ? `$${analyst.totalProfit.toFixed(2)}` : `-$${Math.abs(analyst.totalProfit).toFixed(2)}`) : '$0.00'}
                </td>
                <td className={`px-4 py-3 text-sm ${analyst.totalTrades > 0 ? ((analyst.totalProfit / analyst.totalTrades) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400') : 'text-gray-700 dark:text-gray-300'}`}>
                  {analyst.totalTrades > 0 ? ((analyst.totalProfit / analyst.totalTrades) >= 0 ? `$${(analyst.totalProfit / analyst.totalTrades).toFixed(2)}` : `-$${Math.abs(analyst.totalProfit / analyst.totalTrades).toFixed(2)}`) : '$0.00'}
                </td>
                {/* <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  {analyst.startDate}
                </td> */}
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  <button className={" text-white " + (analyst.status === "start" ? " bg-red-500 " : " bg-blue-500 ") + " px-4 py-2 rounded-md"} onClick={() => {setShowConfirm(true); setSelectedAnalyst(analyst._id);}}>
                    {analyst.status === "start" ? "Stop" : "Start"}
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
                    setSelectedAnalyst(null);
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

export default AnalystStatistics;
