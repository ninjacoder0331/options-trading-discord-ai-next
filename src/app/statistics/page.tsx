'use client'

import TraderStatistics from "@/components/TraderStatistics";
import AnalystStatistics from "@/components/AnalystStatistics";
import { toast } from "react-toastify";
import apiClient from "@/lib/axios";
import { useEffect , useState } from "react";

const Statistics = () => {

  const [closePositions , setClosePositions] = useState([]);
  const [isLoading , setIsLoading] = useState(false);
  const [analysts , setAnalysts] = useState([]);
  const [traders , setTraders] = useState([]);

  const [traderStatistics , setTraderStatistics] = useState([]);
  const [analystStatistics , setAnalystStatistics] = useState([]);

  const getclosePositions = async () => {
    const response = await apiClient.get('/api/trader/getClosePositions');
    setClosePositions(response.data.positions);
    return response;
  }

  const getTraders = () => {
    return apiClient.get('/api/trader/getTraders')
      .then(response => {
        setTraders(response.data);
        setIsLoading(false);
        // console.log(response.data);
      })
      .catch(error => {
        setIsLoading(false);
        console.error('Error:', error);
      });
  }

  const getAnalysts = async () => {
    const response = await apiClient.get('/api/trader/getAnalysts');
    setAnalysts(response.data);
    return response;
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [analystResponse, optionsPositionResponse, tradersResponse] = await Promise.all([
          getAnalysts(),
          getclosePositions(),
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
        <div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div className="col-span-1">
              <h2 className="text-2xl font-bold mb-4">Trader Statistics</h2>
              <TraderStatistics analysts={analysts} traders={traders} closePositions={closePositions} getTraders={getTraders} />
            </div>
            <div className="col-span-1">
              <h2 className="text-2xl font-bold mb-4">Analyst Statistics</h2>
              <AnalystStatistics analysts={analysts} traders={traders} closePositions={closePositions} getAnalysts={getAnalysts} />
            </div>
          </div>
        </div>
    )
}

export default Statistics;
