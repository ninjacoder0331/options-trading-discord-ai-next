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

const TraderDashboard = () => {

  const [analysts, setAnalysts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // symbols
  const [symbol1 , setSymbol1] = useState();
  const [symbol2 , setSymbol2] = useState();
  const [symbol3 , setSymbol3] = useState();
  const [symbol4 , setSymbol4] = useState();

  // date
  const [date1 , setDate1] = useState();
  const [date2 , setDate2] = useState();
  const [date3 , setDate3] = useState();
  const [date4 , setDate4] = useState();
  
  // strike price
  const [strikePrice1 , setStrikePrice1] = useState();
  const [strikePrice2 , setStrikePrice2] = useState();
  const [strikePrice3 , setStrikePrice3] = useState();
  const [strikePrice4 , setStrikePrice4] = useState();

  // option type
  const [optionType1 , setOptionType1] = useState();
  const [optionType2 , setOptionType2] = useState();
  const [optionType3 , setOptionType3] = useState();
  const [optionType4 , setOptionType4] = useState();

  // function

  const getOptionsChain = async () => {

    console.log("TradeStation Key: ", process.env.NEXT_PUBLIC_TRADESTATION_KEY);
    console.log("TradeStation Secret: ", process.env.NEXT_PUBLIC_TRADESTATION_SECRET);
    console.log("Login ID: ", process.env.NEXT_PUBLIC_LOGIN_ID);
    console.log("Login Password: ", process.env.NEXT_PUBLIC_LOGIN_PASSWORD);

    // Or with explicit configuration
    const client = new TradeStationClient({
        clientId: process.env.NEXT_PUBLIC_TRADESTATION_KEY,
        clientSecret: process.env.NEXT_PUBLIC_TRADESTATION_SECRET,
        username: process.env.NEXT_PUBLIC_LOGIN_ID,
        password: process.env.NEXT_PUBLIC_LOGIN_PASSWORD,
        scope: 'account',
        environment: 'Simulation'  // or 'Live'
    });

    // Get historical bars
    const bars = await client.marketData.getBarHistory('MSFT', {
      interval: '1',
      unit: 'Minute',
      barsback: 100
    });

    console.log(bars);
    
  }


  const handleSymbol1 = () =>{
    getOptionsChain();

    const email = Cookies.get("email");

    apiClient.post('/api/trader/addPosition', {
      email : email , 
      symbol: symbol1,
      date: date1,
      optionType: optionType1
    })
    .then(response => { 
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  const handleSymbol2 = () =>{
    console.log(symbol2);
  }
  const handleSymbol3 = () =>{
    console.log(symbol3);
  } 
  const handleSymbol4 = () =>{
    console.log(symbol4);
  }

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
        <div className="p-6 rounded-xl bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          <Analyst analyst={analysts[0]} setSymbol={setSymbol1} setDate={setDate1} setStrikePrice={setStrikePrice1} setOptionType={setOptionType1} optionType = {optionType1} handleSymbol={handleSymbol1} />
        </div>
        <div className="p-6 rounded-xl bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          <Analyst analyst={analysts[1]} setSymbol={setSymbol2} setDate={setDate2} setStrikePrice={setStrikePrice2} setOptionType={setOptionType2} optionType = {optionType2} handleSymbol={handleSymbol2} />
        </div>
        <div className="p-6 rounded-xl bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          <Analyst analyst={analysts[2]} setSymbol={setSymbol3} setDate={setDate3} setStrikePrice={setStrikePrice3} setOptionType={setOptionType3} optionType = {optionType3} handleSymbol={handleSymbol3} />
        </div>
        <div className="p-6 rounded-xl bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          <Analyst analyst={analysts[3]} setSymbol={setSymbol4} setDate={setDate4} setStrikePrice={setStrikePrice4} setOptionType={setOptionType4} optionType = {optionType4} handleSymbol={handleSymbol4} />
        </div>
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
