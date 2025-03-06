import { ShowcaseSection } from "../Layouts/showcase-section";
import InputGroup from "../FormElements/InputGroup";
import { useState } from "react";

const Analyst = ({analyst, setSymbol, setDate, setStrikePrice, setOptionType, optionType, handleSymbol}) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [childType , setChildType] = useState("CALL");  

  return (
    <div className="space-y-4">
    {/* Ticker Input */}
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Analyst Name : {analyst.name}
      </label>
      <input 
        type="text"
        onChange={(e) => setSymbol(e.target.value)}
        placeholder="Enter ticker"
        className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
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
          onClick={() => {setOptionType("CALL"); setChildType("CALL")}}
          className="flex-1 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
          CALL
        </button>
        <button
          onClick={() => {setOptionType("PUT"); setChildType("PUT")}}
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
        onChange={(e) => {setDate(e.target.value); setSelectedDate(e.target.value)}}
        className="w-full px-4 py-2 text-left rounded-lg border border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 dark:bg-gray-900 dark:text-white transition-colors focus:outline-none focus:border-primary"
      />
    </div>

    {/* Price Selection */}
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Strike Price
      </label>
      <button className="w-full px-4 py-2 text-left rounded-lg border border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors">
        Select price
      </button>
    </div>

    <div>
      <button
        onClick={handleSymbol} 
        className="w-full  px-4 py-2 text-left rounded-lg border border-gray-300 hover:bg-red-500 hover:text-white dark:border-gray-700 dark:hover:bg-red-500 transition-colors">
        Submit
      </button>
    </div>
  </div>
  )
}

export default Analyst;
