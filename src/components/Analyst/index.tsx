'use client'
import { ShowcaseSection } from "../Layouts/showcase-section";
import InputGroup from "../FormElements/InputGroup";
import { useState } from "react";
import OptionsChainModal from "./OptionsChainModal";
import { toast } from "react-toastify";
import apiClient from "@/lib/axios";

const apiKey = process.env.NEXT_PUBLIC_ALPACA_API_KEY;
const secretKey = process.env.NEXT_PUBLIC_ALPACA_SECRET_KEY;

const headers = {
  "accept": "application/json",
  'APCA-API-KEY-ID': apiKey,
  'APCA-API-SECRET-KEY': secretKey
}

const Analyst = ({analyst , getOpenPositions}) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [childType , setChildType] = useState("call");
  const [symbol, setSymbol] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [strikePrice, setStrikePrice] = useState("");
  const [optionType, setOptionType] = useState("call");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [optionsData, setOptionsData] = useState(null);
  const [contractData, setContractData] = useState(null);
  const [orderSymbol, setOrderSymbol] = useState("");
  const [entryPrice , setEntryPrice] = useState("");

  const mergeOptionsData = (optionsData: any, contractData: any) => {
    const mergedArray = [];


    // Check if both data structures exist
    if (optionsData?.snapshots && contractData?.option_contracts) {
      Object.entries(optionsData.snapshots).forEach(([key, snapshot]: [string, any]) => {
        // Find matching contract in contractData.option_contracts array
        const matchingContract = contractData.option_contracts.find((contract: any) => 
          contract.symbol === key
        );

        if (matchingContract) {
          mergedArray.push({
            symbol: key,
            bidPrice: snapshot.latestQuote?.bp,
            askPrice: snapshot.latestQuote?.ap,
            lastPrice: snapshot.greek?.last_price,
            volume: snapshot.latestQuote?.volume,
            delta : snapshot.greeks?.delta,
            gamma : snapshot.greeks?.gamma,
            theta : snapshot.greeks?.theta,
            vega : snapshot.greeks?.vega,
            
            // Add contract data
            ...matchingContract,
          });
        }
      });
    }

    // Debug logs
    // console.log("Options Data Snapshots:", Object.keys(optionsData?.snapshots || {}));
    // console.log("Contract Data Sample:", contractData?.option_contracts?.slice(0, 3));
    // console.log("Merged Array:", mergedArray);

    return mergedArray;
  };

  const optionsChainForm = async() => {
    try {

      console.log("symbol", symbol);
      console.log("date", date);
      console.log("optionType", optionType);

      if(symbol === ""){
        toast.error("Please enter a symbol");
        return;
      }
      if(date === ""){
        toast.error("Please enter a date");
        return;
      }
      if(optionType === ""){
        toast.error("Please enter an option type");
        return;
      }
      

      const chain_baseUrl = `https://data.alpaca.markets/v1beta1/options/snapshots/${symbol}?feed=indicative&limit=1000&type=${optionType}&expiration_date=${date}`
      const contract_baseUrl = `https://paper-api.alpaca.markets/v2/options/contracts?underlying_symbols=${symbol}&status=active&expiration_date=${date}&type=${optionType}&limit=10000`
      
      const response = await fetch(chain_baseUrl, { headers });
      const data = await response.json();
      console.log("Fetched data:", data);

      const response2 = await fetch(contract_baseUrl, { headers });
      const data2 = await response2.json();
      console.log("Contract data:", data2);
      setContractData(data2);

      const mergedData = mergeOptionsData(data, data2);
      console.log("Merged data:", mergedData);

      setOptionsData({ snapshots: mergedData });
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching options data:', error);
    }
  }

  const buyOrder = async () => {
    if(strikePrice === ""){
      toast.error("Please select a strike price");
      return;
    }
    if(entryPrice === ""){
      toast.error("Please check again the bid price");
      return;
    }

    const payload = {
      orderSymbol : orderSymbol,
      symbol : symbol,
      quantity : 1,
      analyst : analyst.name,
      side : optionType === "call" ? "buy" : "sell",
      orderType : "market",
      timeInForce : "day",
      date : selectedDate,
      entryPrice : entryPrice
    }

    console.log("payload", payload);


    const result = apiClient.post("/api/trader/addPosition", payload).then(res => {
      toast.success("Order placed successfully");
      getOpenPositions();
      console.log("result", res);
    }).catch(err => {
      toast.error("Error placing order");
      console.error("error", err);
    })

  }

  return (
    <div className="space-y-4">
    {/* Ticker Input */}
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Analyst Name : {analyst.name}
      </label>
      <input 
        type="text"
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        placeholder="Enter ticker"
        className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white uppercase"
      />
    </div>

    {/* Call/Put Selection */}
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2 align-middle items-center">
        <label className="text-sm font-medium w-full text-gray-700 dark:text-gray-300">
          Option Type:
        </label>
        <input 
          type="text"
          value={childType}
          className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 bg-white 
            outline-none
            placeholder:text-gray-500
            hover:border-gray-400 
            dark:border-gray-700 dark:bg-gray-800 dark:text-white 
            dark:placeholder:text-gray-400 dark:hover:border-gray-600
            transition-all duration-200"
            readOnly
        />
      </div>
      <div className="flex gap-3">
        <button 
          onClick={() => {setOptionType("call"); setChildType("call")}}
          className="flex-1 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
          CALL
        </button>
        <button
          onClick={() => {setOptionType("put"); setChildType("put")}}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors">
          PUT
        </button>
      </div>
    </div>

    {/* Date Selection */}
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Date
      </label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => {setDate(e.target.value); setSelectedDate(e.target.value);}}
        className="w-full px-4 py-2 text-left rounded-lg border border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 dark:bg-gray-900 dark:text-white transition-colors focus:outline-none focus:border-primary"
      />
    </div>

    {/* Price Selection */}
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Strike Price
      </label>
      <input
        value={strikePrice}
        readOnly
        className="w-full px-4 py-2 text-left rounded-lg 
          border border-gray-300 
          bg-gray-50 
          cursor-not-allowed 
          text-gray-700
          dark:bg-gray-700 
          dark:border-gray-600 
          dark:text-gray-300
          focus:outline-none
          focus:ring-2
          focus:ring-primary/50
          dark:focus:ring-primary/30
          transition-all duration-200"
      />
    </div>

    {/* <div>
      <button
        onClick={optionsChainForm} 
        className="w-full  px-4 py-2 text-left rounded-lg border border-gray-300 hover:bg-red-500 hover:text-white dark:border-gray-700 dark:hover:bg-red-500 transition-colors">
        Submit
      </button>
    </div> */}

    <div className="flex flex-col gap-2">
      <button
        onClick={optionsChainForm}
        className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        View Options Chain
      </button>
      <button
        onClick={buyOrder}
        className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        Buy Order
      </button>
    </div>

    <OptionsChainModal 
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      data={optionsData}
      contractData={contractData}
      symbol={symbol}
      date={date}
      optionType={optionType}
      setStrikePrice={setStrikePrice}
      setOrderSymbol={setOrderSymbol}
      setEntryPrice = {setEntryPrice}
    />
  </div>
  )
}

export default Analyst;
