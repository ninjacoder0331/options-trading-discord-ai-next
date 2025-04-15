'use client'
import { ShowcaseSection } from "../Layouts/showcase-section";
import InputGroup from "../FormElements/InputGroup";
import { useState, useEffect, useRef } from "react";
import OptionsChainModal from "./OptionsChainModal";
import { toast } from "react-toastify";
import apiClient from "@/lib/axios";
import { stockTickers } from "./data";
import Cookies from "js-cookie";

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
  const [currentPrice, setCurrentPrice] = useState(0);
  const [bidPrice, setBidPrice] = useState(0);
  const [optionsData, setOptionsData] = useState(null);
  const [contractData, setContractData] = useState(null);
  const [orderSymbol, setOrderSymbol] = useState("");
  const [entryPrice , setEntryPrice] = useState("");
  const [midPrice, setMidPrice] = useState(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSymbolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setSymbol(value);
    
    if (value) {
      const filtered = stockTickers.filter(ticker => 
        ticker.startsWith(value)
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

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
      const quote_baseUrl = `https://data.alpaca.markets/v2/stocks/${symbol}/quotes/latest`

      const response = await fetch(chain_baseUrl, { headers });
      const data = await response.json();
      // console.log("Fetched data:", data);

      const response2 = await fetch(contract_baseUrl, { headers });
      const data2 = await response2.json();
      // console.log("Contract data:", data2);
      setContractData(data2);

      const response3 = await fetch(quote_baseUrl, { headers });
      const data3 = await response3.json();
      // console.log("Quote data:", data3);
      const currentPrice = (data3.quote.ap + data3.quote.bp) / 2;
      const bidPrice = data3.quote.bp;
      setBidPrice(bidPrice);
      setCurrentPrice(currentPrice);
      console.log("Current price:", currentPrice);
      console.log("data3", data3.quote.ap);

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
    

    const userID = Cookies.get('user_id');
    console.log("userID", userID);

    const payload = {
      orderSymbol : orderSymbol,
      symbol : symbol,
      quantity : 1,
      analyst : analyst.name,
      side : optionType,
      orderType : "market",
      timeInForce : "day",
      date : selectedDate,
      entryPrice : entryPrice,
      // amount : amount,
      childType : childType,
      userID : userID, 
      strikePrice : strikePrice

    }
    // console.log("payload", payload);

    const result = apiClient.post("/api/trader/addPosition", payload).then(res => {
      setSymbol("");
      setStrikePrice("");
      getOpenPositions();
      if(res.data == 200)
        toast.success("Order placed successfully");
      else if(res.data == 422) {
        toast.info("Please check the order details or market time");
      }
      else if(res.data == 429){
        toast.info("Please check the account api and secret key");
      }
      if(res.data == 201) {
        toast.info("Market data is change, please check again the bid price");
      }
      // console.log("result", res.data);
    }).catch(err => {
      toast.error("Error placing order");
      console.error("error", err);
    })

  }

  return (
    <div className="space-y-3">
    {/* Ticker Input */}
    <div className="flex flex-col gap-2">
      <label className="text-base font-medium text-gray-700 dark:text-gray-300">
        Analyst Name : <span className="font-bold text-blue-600 dark:text-blue-400">{analyst.name}</span>
      </label>
      <div className="relative">
        <input 
          type="text"
          value={symbol}
          onChange={handleSymbolChange}
          onFocus={() => symbol && setShowSuggestions(true)}
          placeholder="Enter ticker"
          className="w-full px-3 py-1.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white uppercase"
        />
        
        {showSuggestions && suggestions.length > 0 && (
          <div 
            ref={suggestionsRef}
            className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg max-h-48 overflow-auto"
          >
            {suggestions.map((suggestion) => (
              <div
                key={suggestion}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  setSymbol(suggestion);
                  setShowSuggestions(false);
                }}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

    {/* Call/Put Selection */}
    <div className="flex flex-row gap-2">
      
        <button 
          onClick={() => {setOptionType("call"); setChildType("call")}}
          className={`flex-1 px-3 py-1.5 rounded-lg transition-colors ${
            optionType === "call"
              ? "bg-primary text-white hover:bg-primary/90"
              : "border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          }`}>
          CALL
        </button>
        <button
          onClick={() => {setOptionType("put"); setChildType("put")}}
          className={`flex-1 px-3 py-1.5 rounded-lg transition-colors ${
            optionType === "put"
              ? "bg-primary text-white hover:bg-primary/90"
              : "border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          }`}>
          PUT
      </button>
    </div>

    {/* Date Selection */}
    <div className="flex flex-row items-center justify-between gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Date
      </label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => {setDate(e.target.value); setSelectedDate(e.target.value);}}
        className="w-full px-3 py-1.5 max-w-[250px] text-left rounded-lg border border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 dark:bg-gray-900 dark:text-white transition-colors focus:outline-none focus:border-primary"
      />
    </div>

    {/* Price Selection */}
    <div className="flex flex-row justify-between gap-2 items-center">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Strike Price
      </label>
      <input
        placeholder={`${strikePrice} @ $${midPrice.toFixed(2)}`}
        readOnly
        className="w-full 
          max-w-[250px]
          px-3 
          py-1.5
          text-sm
          text-left 
          rounded-lg 
          border border-gray-300 
          bg-gray-50/80 
          backdrop-blur-sm
          cursor-not-allowed 
          text-green-700
          placeholder-green-600/70
          font-medium
          shadow-sm
          hover:bg-gray-100/80
          dark:bg-gray-700/80 
          dark:border-gray-600 
          dark:text-green-300
          dark:placeholder-green-400/70
          dark:hover:bg-gray-600/80
          focus:outline-none
          focus:ring-2
          focus:ring-primary/50
          focus:border-transparent
          dark:focus:ring-primary/30
          transition-all duration-200
          disabled:opacity-75
          disabled:cursor-not-allowed"
      />
    </div>



    <div className="flex flex-row gap-2">
      <button
        onClick={optionsChainForm}
        className="rounded-lg bg-primary px-3 py-1.5 text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        View Options Chain
      </button>
      <button
        onClick={buyOrder}
        className="rounded-lg bg-green-600 px-3 py-1.5 text-white hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
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
      currentPrice={currentPrice}
      setMidPrice={setMidPrice}
    />
    </div>
  )
}

export default Analyst;
