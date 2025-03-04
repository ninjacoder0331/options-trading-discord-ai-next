
import { ShowcaseSection } from "../Layouts/showcase-section";
import InputGroup from "../FormElements/InputGroup";

const Analyst = ({analyst}) => {
  return (
    <div className="space-y-4">
    {/* Ticker Input */}
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Analyst Name : {analyst.name}
      </label>
      <input 
        type="text" 
        placeholder="Enter ticker" 
        className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      />
    </div>

    {/* Call/Put Selection */}
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Option Type
      </label>
      <div className="flex gap-3">
        <button className="flex-1 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
          CALL
        </button>
        <button className="flex-1 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors">
          PUT
        </button>
      </div>
    </div>

    {/* Date Selection */}
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Expiry Date
      </label>
      <button className="w-full px-4 py-2 text-left rounded-lg border border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors">
        Select date
      </button>
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
  </div>
  )
}

export default Analyst;
