'use client'

import Analyst from "@/components/Analyst";
import { useEffect , useState } from "react";
import apiClient from "@/lib/axios";
import OpenPosition from "@/components/Analyst/openPosition";
import ClosePosition from "@/components/Analyst/closePosition";
import Anlystics from "@/components/Analyst/anlystics";
const TraderDashboard = () => {

  const [analysts, setAnalysts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // Method 1: Using .then()
  useEffect(() => {
    setIsLoading(true);
    apiClient.get('/api/trader/getAnalysts')
    .then(response => {
      // Handle success
      setAnalysts(response.data);
      setIsLoading(false);
      // console.log(response.data);
      
    })
    .catch(error => {
      // Handle error
      setIsLoading(false);
      console.error('Error:', error);
    });
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4 justify-between" key={1}>
          {analysts.map((analyst) => (
            <div key={analyst.id}  className="p-6 rounded-xl bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
              <Analyst analyst={analyst} />
            </div>
          ))}
      </div>

      
      <div className="rounded-lg bg-white p-6 shadow-1 dark:bg-gray-dark" key={2}>
        <OpenPosition/>
      </div>

      <div className="flex flex-row justify-between gap-5" key={3}>
        <ClosePosition/>
        <Anlystics/>
      </div>

    </div>
  )
}

export default TraderDashboard;
