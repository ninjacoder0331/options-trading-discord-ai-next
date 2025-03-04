'use client'
import { useEffect } from "react";
import apiClient from "@/lib/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Add this interface if you don't have it
interface Brokerage {
  brokerageName: string;
  _id: string;
}

const TraderTable = () => {

  const [brokerage, setBrokerage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBrokerage, setSelectedBrokerage] = useState('');

  const [traders, setTraders] = useState([]);
  // Method 1: Using .then()
  useEffect(() => {
    setIsLoading(true);
    getBrokerages();
    apiClient.get('/api/trader/getTraders')
    .then(response => {
      // Handle success
      setTraders(response.data);
      setIsLoading(false);
      console.log(response.data);
      
    })
    .catch(error => {
      // Handle error
      setIsLoading(false);
      console.error('Error:', error);
    });
  }, []);


  const getBrokerages = () => {
    return apiClient.get('/api/brokerage/getBrokerages')
      .then(response => {
        setBrokerage(response.data);
        setIsLoading(false);
        console.log(response.data);
      })
      .catch(error => {
        setIsLoading(false);
        console.error('Error:', error);
      });
  };

  const handleBrokerageChange = (traderId: string, brokerageName: string) => {
    setSelectedBrokerage(brokerageName);
    console.log(traderId, brokerageName);
    apiClient.post("/api/trader/updateBrokerage", {
      traderId: traderId,
      brokerageName: brokerageName
    })
    .then(response => {
      toast.success("Brokerage updated successfully");
      console.log(response.data);
    })
    .catch(error => {
      toast.error("Error updating brokerage");
      console.error('Error:', error);
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container ">
      <div className="relative  shadow-md sm:rounded-lg">
      <table className=" table-auto border-collapse bg-white shadow-1 dark:bg-gray-dark dark:shadow-card  ">
        <thead>
          <tr className="bg-primary/10 dark:bg-primary/5">
            <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
              User
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
              Login
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
              PW
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
              Trade Amt$
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
              Analyst 1
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
              Analyst 2
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
              Analyst 3
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
              Analyst 4
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
              Stop Loss %
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
              Profit Taking %
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
              Brokerage Account
            </th>
          </tr>
        </thead>
        <tbody>
          {traders.map((trader, i) => (
            <tr key={i} className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
              <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{trader.name}</td>
              <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{trader.email}</td>
              <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{trader.password}</td>
              <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">${trader.tradeAmt}</td>
              <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{trader.analyst1}</td>
              <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{trader.analyst2}</td>
              <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{trader.analyst3}</td>
              <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{trader.analyst4}</td>
              <td className="px-4 py-3 text-sm text-red-500">{trader.stopLoss}%</td>
              <td className="px-4 py-3 text-sm text-green-500">{trader.profitTaking}%</td>
              <td className="px-4 py-3 text-sm">
                <select
                  value={trader.brokerageName || ''}
                  onChange={(e) => handleBrokerageChange(trader._id, e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-blue-500 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
                >
                  <option value="">Select Brokerage</option>
                  {brokerage?.map((item, index) => (
                    <option 
                      key={index} 
                      value={item._id}
                    >
                      {item.brokerageName}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default TraderTable;
