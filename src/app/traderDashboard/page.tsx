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
  const [tickers, setTickers] = useState([]);
  const [closePositions, setClosePositions] = useState([]);
  // function

  // const getOptionsChain = async () => {
  //   const apiKey = process.env.NEXT_PUBLIC_ALPACA_API_KEY;
  //   const secretKey = process.env.NEXT_PUBLIC_ALPACA_SECRET_KEY;

  //   const headers = {
  //     "accept": "application/json",
  //     'APCA-API-KEY-ID': apiKey,
  //     'APCA-API-SECRET-KEY': secretKey
  //   }

  //   const baseUrl = 'https://data.alpaca.markets/v1beta1/options/snapshots/SPY?limit=100&type=call&expiration_date=2025-03-12'

  //   const response = await fetch(`${baseUrl}`, {
  //     headers: headers
  //   }).then(response => response.json()).then(data => {
  //     console.log("response snapshot");
  //     console.log(data);
  //   })
  // }


  // Method 1: Using .then()

  const getOpenPositions = async () => {
    const response = await apiClient.get('/api/trader/getOpenPositions');
    setOpenPositions(response.data.positions);
    return response;
  }

  const getAnalysts = async () => {
    const response = await apiClient.get('/api/trader/getAnalysts');
    setAnalysts(response.data);
    return response;
  }

  const getTickers = async () => {
    const response = await apiClient.get('/api/trader/getAllTickers');
    setTickers(response.data);
    return response;
  }

  const getClosePositions = async () => {
    const response = await apiClient.get('/api/trader/getClosePositions');
    setClosePositions(response.data.positions);
    return response;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [analystResponse, optionsPositionResponse , closePositionResponse] = await Promise.all([
          getAnalysts(),
          getOpenPositions(),
          getClosePositions()
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
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4 justify-between" key={1}>
        <div className="p-6 rounded-xl bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          <Analyst analyst={analysts[0]} getOpenPositions={getOpenPositions} />
        </div>
        <div className="p-6 rounded-xl bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          <Analyst analyst={analysts[1]} getOpenPositions={getOpenPositions} />
        </div>
        <div className="p-6 rounded-xl bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          <Analyst analyst={analysts[2]} getOpenPositions={getOpenPositions} />
        </div>
        <div className="p-6 rounded-xl bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          <Analyst analyst={analysts[3]} getOpenPositions={getOpenPositions} />
        </div>
      </div>
      
      <div className="rounded-lg bg-white p-6 shadow-1 dark:bg-gray-dark" key={2}>
        <OpenPosition openPositions={openPositions} getOpenPositions={getOpenPositions} getClosePositions={getClosePositions} />
      </div>

      <div className="flex flex-row justify-between gap-5" key={3}>
        <ClosePosition closePositions={closePositions} />
        <Anlystics closePositions={closePositions} />
      </div>
    </div>
  )
}

export default TraderDashboard;
