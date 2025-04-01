'use client'

import Analyst from "@/components/Analyst";
import { useEffect , useState } from "react";
import apiClient from "@/lib/axios";
import OpenPosition from "@/components/Analyst/openPosition";
import ClosePosition from "@/components/Analyst/closePosition";
import Anlystics from "@/components/Analyst/anlystics";
import Cookies from "js-cookie";
import request from 'request';
import { TradeStationClient } from "tradestation-api-ts";
import { toast } from "react-toastify";


const TraderDashboard = () => {

  const [analysts, setAnalysts] = useState([]);
  const [openPositions, setOpenPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [closePositions, setClosePositions] = useState([]);
  const [traderAnalysts, setTraderAnalysts] = useState([]);


  const getOpenPositions = async () => {
    const response = await apiClient.post('/api/trader/getTraderOpenPositions' , {
      traderId : Cookies.get('user_id')
    });
    setOpenPositions(response.data.positions);
    return response;
  }

  const getAnalysts = async () => {
    const response = await apiClient.get('/api/trader/getAnalysts');
    setAnalysts(response.data);
    console.log("analysts", response.data);
    return response;
  }

  const getTraderAnalysts = async () => {
    console.log("traderId", Cookies.get('user_id'));
    const response = await apiClient.post('/api/trader/getTraderAnalysts' , 
      { traderId : Cookies.get('user_id')}
    )
      setTraderAnalysts(response.data);
      console.log("traderAnalysts", response.data);
 
    return response;
  }

  const getClosePositions = async () => {
    const response = await apiClient.post('/api/trader/getTraderClosePositions' , {
      traderId : Cookies.get('user_id')
    });
    setClosePositions(response.data.positions);
    return response;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [analystResponse, optionsPositionResponse , closePositionResponse , traderAnalystsResponse] = await Promise.all([
          getAnalysts(),
          getOpenPositions(),
          getClosePositions(),
          getTraderAnalysts()
          // getTickers()
        ]);
        
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (

    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4 justify-center" key={1}>

        {analysts.map((analyst, index) => {
          for(let i = 0; i < 4; i++) {
            if(analyst.status === "start" && traderAnalysts[`analyst${i + 1}`] === analyst["_id"]) {
              return (
                <div key={analyst._id} className="p-6 rounded-xl bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
                  <Analyst analyst={analyst} getOpenPositions={getOpenPositions} />
                </div>
              );
            }
          }
          return null; // Return null for analysts that don't match the condition
        })}

      </div>
      
      <div className="rounded-lg bg-white p-6 shadow-1 dark:bg-gray-dark" key={2}>
        <OpenPosition openPositions={openPositions} getOpenPositions={getOpenPositions} getClosePositions={getClosePositions} />
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-5" key={3}>
        <ClosePosition closePositions={closePositions} />
        <Anlystics closePositions={closePositions} />
      </div>
    </div>
  )
}

export default TraderDashboard;
